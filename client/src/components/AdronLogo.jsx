import React from 'react';

export default function AdronLogo({ className = "h-8 sm:h-9", light = false, showTagline = false }) {
  const logoSrc = light
    ? "/figma_landing/adron_logo_white.png"
    : "/figma_landing/adron_logo_transparent.png";

  return (
    <div className="flex flex-col items-start select-none">
      <img
        src={logoSrc}
        alt="Adron"
        className={`${className} w-auto object-contain transition-transform hover:opacity-90`}
      />
      {showTagline && (
        <span className={`text-[9px] tracking-[0.25em] uppercase font-sans font-semibold pt-1 ${light ? 'text-[#A3C79B]' : 'text-[#628A5B]'}`}>
          Okra + Science
        </span>
      )}
    </div>
  );
}
