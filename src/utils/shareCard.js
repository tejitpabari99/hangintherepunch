/**
 * Generates a shareable PNG image from a DOM element using html2canvas.
 * Lazy-loads html2canvas to keep the initial bundle small.
 *
 * @param {HTMLElement} element - the DOM node to capture
 * @param {string} filename - download filename (without extension)
 * @returns {Promise<void>}
 */
export async function downloadShareCard(element, filename = 'punch-moment') {
  if (!element) {
    console.warn('shareCard: no element provided');
    return;
  }

  try {
    // Dynamic import keeps html2canvas out of the main chunk
    const html2canvas = (await import('html2canvas')).default;

    const canvas = await html2canvas(element, {
      scale: 2, // retina-quality output
      backgroundColor: null,
      useCORS: true,
    });

    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    console.error('Failed to generate share card:', err);
  }
}
