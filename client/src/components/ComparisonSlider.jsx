import React, { useState, useRef, useCallback } from 'react';

export default function ComparisonSlider({
  beforeImage,
  afterImage,
  aspectRatio = 'aspect-square',
  beforeLabel = 'Before',
  afterLabel = 'After'
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden select-none cursor-ew-resize group bg-[#F5F3EC] shadow-sm`}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
    >
      {/* After image (base) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Before image (clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
        />
      </div>

      {/* Vertical divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Circular drag handle matching Figma */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#153323] shadow-md border border-gray-200 flex items-center justify-center font-bold text-xs select-none">
          <span className="text-[10px] tracking-tighter">‹ ›</span>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded pointer-events-none z-10">
        {beforeLabel}
      </span>
      <span className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded pointer-events-none z-10">
        {afterLabel}
      </span>
    </div>
  );
}
