import React, { useState, useEffect, useCallback } from 'react';
import ConfessionCard from './ConfessionCard';
import ConfessionForm from './ConfessionForm';
import useScrollReveal from '../../hooks/useScrollReveal';
import seedConfessions from '../../data/seedConfessions';
import './Confessional.css';

/**
 * Main Confessional component - Anonymous comfort object sharing
 */
export default function Confessional() {
  const [confessions, setConfessions] = useState([]);
  const [sortBy, setSortBy] = useState('trending'); // trending, newest, popular
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [meTooInteractions, setMeTooInteractions] = useState(new Set());

  // Load initial confessions
  useEffect(() => {
    const loadConfessions = () => {
      try {
        const saved = localStorage.getItem('confessions');
        if (saved) {
          const parsed = JSON.parse(saved);
          setConfessions(parsed);
        } else {
          // Load seed confessions
          setConfessions([...seedConfessions]);
          localStorage.setItem('confessions', JSON.stringify(seedConfessions));
        }

        // Load me too interactions
        const savedInteractions = localStorage.getItem('confessions-metoo');
        if (savedInteractions) {
          setMeTooInteractions(new Set(JSON.parse(savedInteractions)));
        }
      } catch (error) {
        console.error('Error loading confessions:', error);
        setConfessions([...seedConfessions]);
      }
      setLoading(false);
    };

    loadConfessions();
  }, []);

  // Sort confessions based on current sort option
  const sortedConfessions = React.useMemo(() => {
    const sorted = [...confessions];
    
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => b.createdAt - a.createdAt);
      case 'popular':
        return sorted.sort((a, b) => {
          if (b.meTooCount !== a.meTooCount) {
            return b.meTooCount - a.meTooCount;
          }
          return b.createdAt - a.createdAt;
        });
      case 'trending':
      default:
        return sorted.sort((a, b) => {
          // Trending score: me_too_count * 1.0 + recency_bonus
          const now = Date.now();
          const hoursSinceA = (now - a.createdAt) / (1000 * 60 * 60);
          const hoursSinceB = (now - b.createdAt) / (1000 * 60 * 60);
          
          // Recency bonus decays over 48 hours
          const recencyBonusA = Math.max(0, (48 - hoursSinceA) / 48);
          const recencyBonusB = Math.max(0, (48 - hoursSinceB) / 48);
          
          const scoreA = a.meTooCount + recencyBonusA;
          const scoreB = b.meTooCount + recencyBonusB;
          
          return scoreB - scoreA;
        });
    }
  }, [confessions, sortBy]);

  // Add new confession
  const handleNewConfession = useCallback((confessionData) => {
    const newConfession = {
      id: Date.now().toString(),
      ...confessionData,
      meTooCount: 0,
      createdAt: Date.now(),
      isNew: true // Flag for highlighting
    };

    const updatedConfessions = [newConfession, ...confessions];
    setConfessions(updatedConfessions);
    localStorage.setItem('confessions', JSON.stringify(updatedConfessions));

    // Remove new flag after 3 seconds
    setTimeout(() => {
      setConfessions(prev => 
        prev.map(c => c.id === newConfession.id ? { ...c, isNew: false } : c)
      );
    }, 3000);
  }, [confessions]);

  // Handle me too interaction
  const handleMeToo = useCallback((confessionId) => {
    if (meTooInteractions.has(confessionId)) return; // Already clicked

    setMeTooInteractions(prev => {
      const newSet = new Set(prev);
      newSet.add(confessionId);
      localStorage.setItem('confessions-metoo', JSON.stringify([...newSet]));
      return newSet;
    });

    setConfessions(prev => 
      prev.map(confession => 
        confession.id === confessionId 
          ? { ...confession, meTooCount: confession.meTooCount + 1 }
          : confession
      )
    );

    // Update localStorage
    setTimeout(() => {
      const current = JSON.parse(localStorage.getItem('confessions') || '[]');
      const updated = current.map(confession => 
        confession.id === confessionId 
          ? { ...confession, meTooCount: confession.meTooCount + 1 }
          : confession
      );
      localStorage.setItem('confessions', JSON.stringify(updated));
    }, 0);
  }, [meTooInteractions]);

  // Infinite scroll (mock implementation)
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    // In a real implementation, this would fetch from API
    setTimeout(() => {
      setLoadingMore(false);
      // For now, just mark as no more items after first load
      setHasMore(false);
    }, 1000);
  }, [loadingMore, hasMore]);

  // Intersection observer for infinite scroll
  const [loadMoreRef, loadMoreVisible] = useScrollReveal({
    threshold: 0,
    rootMargin: '200px'
  });

  useEffect(() => {
    if (loadMoreVisible && !loading) {
      loadMore();
    }
  }, [loadMoreVisible, loading, loadMore]);

  if (loading) {
    return (
      <div className="confessional-loading">
        <div className="loading-monkey">🐒</div>
        <p>Loading confessions...</p>
      </div>
    );
  }

  return (
    <div className="confessional">
      {/* Header */}
      <div className="confessional__header">
        <h1 className="confessional__title">
          <span className="confessional__title-line">Punch has his Djungelskog.</span>
          <span className="confessional__title-line confessional__title-line--gold">What's yours?</span>
        </h1>
        <div className="confessional__subtitle-emoji">🐒</div>
      </div>

      {/* Submission Form */}
      <ConfessionForm onSubmit={handleNewConfession} />

      {/* Sort Toggle */}
      <div className="confessional__sort">
        <div className="sort-toggle">
          <button
            className={`sort-toggle__option ${sortBy === 'trending' ? 'sort-toggle__option--active' : ''}`}
            onClick={() => setSortBy('trending')}
          >
            Trending
          </button>
          <button
            className={`sort-toggle__option ${sortBy === 'newest' ? 'sort-toggle__option--active' : ''}`}
            onClick={() => setSortBy('newest')}
          >
            Newest
          </button>
          <button
            className={`sort-toggle__option ${sortBy === 'popular' ? 'sort-toggle__option--active' : ''}`}
            onClick={() => setSortBy('popular')}
          >
            Most ❤️
          </button>
        </div>
      </div>

      {/* Confessions Wall */}
      <div className="confessional__wall confession-wall">
        {sortedConfessions.map((confession, index) => (
          <ConfessionCard
            key={confession.id}
            confession={confession}
            onMeToo={handleMeToo}
            hasInteracted={meTooInteractions.has(confession.id)}
            style={{
              animationDelay: `${Math.min(index * 80, 800)}ms`
            }}
          />
        ))}

        {/* Loading more indicator */}
        {loadingMore && (
          <div className="confession-loading-more">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="confession-card--skeleton" />
            ))}
          </div>
        )}

        {/* Load more sentinel */}
        <div ref={loadMoreRef} className="confession-load-sentinel" />
      </div>

      {/* Empty state (shouldn't show with seed data) */}
      {sortedConfessions.length === 0 && !loading && (
        <div className="confessional__empty">
          <div className="confessional__empty-emoji">🧸</div>
          <p>No confessions yet. Be the first to share!</p>
        </div>
      )}
    </div>
  );
}