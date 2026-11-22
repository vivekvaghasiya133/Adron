import React from 'react';

export default function AdronLogo({ className = "h-8", light = false, showTagline = false }) {
  const textColor = light ? "#FAF8F5" : "#122519";
  const leafColor = light ? "#A3C79B" : "#4A7A44";

  return (
    <div className="flex flex-col items-start select-none">
      <div className={`flex items-center gap-2 ${className}`}>
        {/* Botanical Okra/Lotus Bud Emblem */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${light ? 'bg-white/10 text-[#A3C79B]' : 'bg-[#153323] text-white'} shadow-sm transition-transform hover:scale-105`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            {/* Center Okra pod / flower bud */}
            <path
              d="M12 3C10.5 6 9.5 9 10 13C10.5 16 12 18 12 21C12 18 13.5 16 14 13C14.5 9 13.5 6 12 3Z"
              fill={light ? "#C2E2BC" : "#799A70"}
            />
            {/* Left petal/leaf */}
            <path
              d="M10 13C8 10 5 9 3 11C4.5 13 7 15 9.5 15.5C9.8 14.5 10 13.8 10 13Z"
              fill={light ? "#8EB885" : "#557E4E"}
            />
            {/* Right petal/leaf */}
            <path
              d="M14 13C16 10 19 9 21 11C19.5 13 17 15 14.5 15.5C14.2 14.5 14 13.8 14 13Z"
              fill={light ? "#8EB885" : "#557E4E"}
            />
            {/* Stem base */}
            <circle cx="12" cy="21" r="1.5" fill={light ? "#FAF8F5" : "#FAF8F5"} />
          </svg>
        </div>

        {/* Wordmark with botanical sprout on 'o' */}
        <div className="flex items-center relative font-serif text-2xl font-bold tracking-tight" style={{ color: textColor }}>
          <span className="text-[26px] tracking-normal">Ad</span>
          <span className="text-[26px]">r</span>
          
          {/* Letter 'o' with the sprouting leaf bud directly on top matching Figma */}
          <span className="relative inline-flex items-center justify-center">
            <span className="text-[26px]">o</span>
            <svg
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 pointer-events-none"
              viewBox="0 0 16 16"
              fill="none"
            >
              {/* Central bud */}
              <path d="M8 1C7 4 7 6 8 8C9 6 9 4 8 1Z" fill={leafColor} />
              {/* Left sprout */}
              <path d="M7 5C5 4 4 5 4 6.5C5.5 6.5 6.5 6 7 5Z" fill={leafColor} />
              {/* Right sprout */}
              <path d="M9 5C11 4 12 5 12 6.5C10.5 6.5 9.5 6 9 5Z" fill={leafColor} />
            </svg>
          </span>

          <span className="text-[26px]">n</span>
        </div>
      </div>

      {showTagline && (
        <span className={`text-[9px] tracking-[0.25em] uppercase font-sans font-semibold pl-10 -mt-1 ${light ? 'text-[#A3C79B]' : 'text-[#628A5B]'}`}>
          Okra + Science
        </span>
      )}
    </div>
  );
}
