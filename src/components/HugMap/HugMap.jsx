import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import HugCounter from './HugCounter';
import HugShareCard from './HugShareCard';
import './HugMap.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNiIgZmlsbD0iI0Q0QTA1MiIvPgo8L3N2Zz4K',
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNiIgZmlsbD0iI0Q0QTA1MiIvPgo8L3N2Zz4K',
  shadowUrl: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

// Custom hook for managing hug data
function useHugData() {
  const [hugs, setHugs] = useState([]);
  const [stats, setStats] = useState({ totalHugs: 0, totalCountries: 0 });
  const [loading, setLoading] = useState(true);

  // Load initial hug data from localStorage (mock data for now)
  useEffect(() => {
    const loadHugs = () => {
      try {
        const savedHugs = localStorage.getItem('punch-hugs');
        const savedStats = localStorage.getItem('punch-hug-stats');
        
        if (savedHugs) {
          const parsedHugs = JSON.parse(savedHugs);
          setHugs(parsedHugs);
          
          if (savedStats) {
            setStats(JSON.parse(savedStats));
          } else {
            // Calculate stats from hugs
            const countries = new Set(parsedHugs.map(h => h.country));
            setStats({
              totalHugs: parsedHugs.length,
              totalCountries: countries.size
            });
          }
        } else {
          // Initialize with some seed data
          const seedHugs = [
            { id: '1', lat: 40.7128, lng: -74.0060, country: 'US', city: 'New York', note: 'Hang in there little guy!', timestamp: Date.now() - 86400000 },
            { id: '2', lat: 51.5074, lng: -0.1278, country: 'GB', city: 'London', note: 'You are so brave Punch ❤️', timestamp: Date.now() - 172800000 },
            { id: '3', lat: 35.6762, lng: 139.6503, country: 'JP', city: 'Tokyo', note: 'がんばって！🐒', timestamp: Date.now() - 259200000 },
            { id: '4', lat: 48.8566, lng: 2.3522, country: 'FR', city: 'Paris', note: 'Courage petit singe!', timestamp: Date.now() - 345600000 },
            { id: '5', lat: -33.8688, lng: 151.2093, country: 'AU', city: 'Sydney', note: 'Stay strong mate!', timestamp: Date.now() - 432000000 },
          ];
          setHugs(seedHugs);
          setStats({ totalHugs: 5, totalCountries: 5 });
          localStorage.setItem('punch-hugs', JSON.stringify(seedHugs));
          localStorage.setItem('punch-hug-stats', JSON.stringify({ totalHugs: 5, totalCountries: 5 }));
        }
      } catch (error) {
        console.error('Error loading hugs:', error);
      }
      setLoading(false);
    };

    loadHugs();
  }, []);

  const addHug = useCallback((hugData) => {
    const newHug = {
      id: Date.now().toString(),
      ...hugData,
      timestamp: Date.now()
    };

    const updatedHugs = [...hugs, newHug];
    const countries = new Set(updatedHugs.map(h => h.country));
    const newStats = {
      totalHugs: updatedHugs.length,
      totalCountries: countries.size
    };

    setHugs(updatedHugs);
    setStats(newStats);

    // Save to localStorage
    localStorage.setItem('punch-hugs', JSON.stringify(updatedHugs));
    localStorage.setItem('punch-hug-stats', JSON.stringify(newStats));

    return newStats.totalHugs; // Return hug number for share card
  }, [hugs]);

  return { hugs, stats, loading, addHug };
}

// Map bounds updater component
function MapBoundsUpdater({ hugs }) {
  const map = useMap();

  useEffect(() => {
    if (hugs.length > 0) {
      const bounds = hugs.map(hug => [hug.lat, hug.lng]);
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [hugs, map]);

  return null;
}

/**
 * Main HugMap component - Interactive world map for sending hugs to Punch
 */
export default function HugMap() {
  const { hugs, stats, loading, addHug } = useHugData();
  const [isHugging, setIsHugging] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);
  const [shareData, setShareData] = useState(null);
  const [hasHuggedToday, setHasHuggedToday] = useState(false);

  // Check if user has already hugged today
  useEffect(() => {
    const lastHugDate = localStorage.getItem('last-hug-date');
    const today = new Date().toDateString();
    setHasHuggedToday(lastHugDate === today);
  }, []);

  // Get user's location and send hug
  const handleSendHug = async () => {
    if (hasHuggedToday || isHugging) return;

    setIsHugging(true);

    try {
      // Try to get geolocation
      let userLocation;
      
      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 5000,
            maximumAge: 60000,
            enableHighAccuracy: false
          });
        });
        
        userLocation = {
          lat: Math.round(position.coords.latitude * 100) / 100, // Round to 2 decimals for privacy
          lng: Math.round(position.coords.longitude * 100) / 100,
        };
      } else {
        throw new Error('Geolocation not available');
      }

      // Get city/country info (mock for now)
      let locationInfo = { city: 'Unknown', country: 'Unknown' };
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
          const data = await response.json();
          locationInfo = {
            city: data.city || 'Unknown',
            country: data.country_code || 'Unknown'
          };
        }
      } catch (error) {
        console.log('Could not get location info:', error);
      }

      // Add the hug
      const hugNumber = addHug({
        ...userLocation,
        ...locationInfo,
        note: '' // We'll add note input later
      });

      // Set share data
      setShareData({
        hugNumber,
        city: locationInfo.city,
        country: locationInfo.country,
        location: userLocation
      });

      // Mark as hugged today
      localStorage.setItem('last-hug-date', new Date().toDateString());
      setHasHuggedToday(true);
      
      // Show share card after a short delay
      setTimeout(() => {
        setShowShareCard(true);
      }, 800);

    } catch (error) {
      console.error('Error sending hug:', error);
      // Fallback to IP-based location
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
          const data = await response.json();
          const hugNumber = addHug({
            lat: data.latitude || 0,
            lng: data.longitude || 0,
            city: data.city || 'Unknown',
            country: data.country_code || 'Unknown',
            note: ''
          });

          setShareData({
            hugNumber,
            city: data.city || 'Unknown',
            country: data.country_name || 'Unknown',
            location: { lat: data.latitude || 0, lng: data.longitude || 0 }
          });

          localStorage.setItem('last-hug-date', new Date().toDateString());
          setHasHuggedToday(true);
          
          setTimeout(() => {
            setShowShareCard(true);
          }, 800);
        }
      } catch (fallbackError) {
        console.error('Fallback location failed:', fallbackError);
      }
    }

    setIsHugging(false);
  };

  if (loading) {
    return (
      <div className="hug-map-container">
        <div className="hug-map-loading">
          <div className="loading-monkey">🐒</div>
          <p>Loading the hug map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hug-map-container">
      {/* Counter */}
      <HugCounter 
        totalHugs={stats.totalHugs} 
        totalCountries={stats.totalCountries} 
      />
      
      {/* Map */}
      <div className="hug-map-wrapper">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          className="hug-map"
          scrollWheelZoom={false}
          doubleClickZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="dark-tiles"
          />
          
          {/* Render hug markers */}
          {hugs.map((hug) => (
            <Marker 
              key={hug.id} 
              position={[hug.lat, hug.lng]}
              title={`Hug from ${hug.city}, ${hug.country}`}
            />
          ))}
          
          <MapBoundsUpdater hugs={hugs} />
        </MapContainer>
        
        {/* Send Hug Button */}
        <button 
          className={`hug-button ${hasHuggedToday ? 'hug-button--disabled' : ''} ${isHugging ? 'hug-button--loading' : ''}`}
          onClick={handleSendHug}
          disabled={hasHuggedToday || isHugging}
        >
          {isHugging ? 'Sending... 🤗' : hasHuggedToday ? 'Hugged! 🤗 Come back tomorrow' : 'Send Punch a Hug 🤗'}
        </button>
      </div>

      {/* Share Card Overlay */}
      {showShareCard && shareData && (
        <HugShareCard 
          {...shareData}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </div>
  );
}