import React from 'react';
import { useBrand } from '../context/BrandContext';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'white';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  allowQuickUpload?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  variant = 'light',
  showTagline = false,
  size = 'md',
  allowQuickUpload = false
}) => {
  const { customLogoUrl, logoMode, originalLogoLight, originalLogoDark, openLogoModal } = useBrand();

  const isWhite = variant === 'white' || variant === 'dark';
  const textColor = isWhite ? '#ffffff' : '#0f2942';
  const subColor = isWhite ? '#94a3b8' : '#1e4344';

  const emblemSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const imgHeightClass = size === 'sm' ? 'h-8' : size === 'lg' ? 'h-12' : 'h-10';

  // 1. If user has uploaded a custom original logo file and selected it
  if (customLogoUrl && logoMode === 'custom') {
    return (
      <div className={`relative group flex items-center gap-2 select-none ${className}`}>
        <img 
          src={customLogoUrl} 
          alt="Newways Enterprise Logo" 
          className={`${imgHeightClass} w-auto object-contain max-w-[240px] drop-shadow-sm`}
        />
        {allowQuickUpload && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              openLogoModal();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
                openLogoModal();
              }
            }}
            className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity p-1 text-[10px] bg-sky-900/80 hover:bg-sky-800 text-white rounded-md shadow inline-flex items-center"
            title="Manage Original Logo"
          >
            Edit
          </span>
        )}
      </div>
    );
  }

  // 2. Official High-Resolution Graphic Logo (matches uploaded original files)
  if (logoMode === 'official-graphic') {
    const logoSrc = isWhite ? originalLogoDark : originalLogoLight;

    return (
      <div className={`relative group flex items-center gap-2 select-none ${className}`}>
        <div className="flex items-center">
          <img 
            src={logoSrc} 
            alt="Newways Enterprise Official Logo" 
            className={`${imgHeightClass} w-auto object-contain rounded-md drop-shadow-sm hover:scale-[1.02] transition-transform`}
          />
        </div>

        {allowQuickUpload && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              openLogoModal();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
                openLogoModal();
              }
            }}
            className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity p-1 text-[10px] bg-sky-900/80 hover:bg-sky-800 text-white rounded-md shadow inline-flex items-center"
            title="Upload or Change Logo"
          >
            Change
          </span>
        )}
      </div>
    );
  }

  // 3. Fallback: Ultra-High Precision Vector Emblem & Typography
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 
        Original 3D Folded Ribbon / Infinity-N Emblem 
        From: Create_logo_name_Newways_polymer_import_export_c_1_adobe_express - Copy.png
        Colors: Cyan/Teal -> Lush Green -> Crimson Red -> Golden Amber/Orange
      */}
      <div className={`relative ${emblemSize} flex-shrink-0 drop-shadow-md`}>
        <svg 
          viewBox="0 0 120 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="nw-teal" x1="15" y1="80" x2="48" y2="35" gradientUnits="userSpaceOnUse">
              <stop stopColor="#083344" />
              <stop offset="0.4" stopColor="#0e7490" />
              <stop offset="1" stopColor="#06b6d4" />
            </linearGradient>
            
            <linearGradient id="nw-green" x1="40" y1="50" x2="62" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#15803d" />
              <stop offset="0.6" stopColor="#22c55e" />
              <stop offset="1" stopColor="#86efac" />
            </linearGradient>

            <linearGradient id="nw-red" x1="50" y1="45" x2="65" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7f1d1d" />
              <stop offset="0.4" stopColor="#dc2626" />
              <stop offset="1" stopColor="#ef4444" />
            </linearGradient>

            <linearGradient id="nw-orange" x1="55" y1="35" x2="105" y2="85" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f59e0b" />
              <stop offset="0.4" stopColor="#ea580c" />
              <stop offset="1" stopColor="#9a3412" />
            </linearGradient>

            <filter id="nw-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* Ribbon Fold 1: Left Cyan Upward Loop */}
          <path 
            d="M20 78 C15 70 25 45 42 38 C49 35 55 42 46 54 C35 68 28 82 20 78 Z" 
            fill="url(#nw-teal)"
            filter="url(#nw-shadow)"
          />

          {/* Ribbon Fold 2: Top Green Connector Curve */}
          <path 
            d="M42 38 C48 30 62 30 66 38 C60 48 48 54 42 38 Z" 
            fill="url(#nw-green)"
          />

          {/* Ribbon Fold 3: Inner Red Dynamic Bend */}
          <path 
            d="M52 48 C58 40 70 54 62 76 C55 78 50 62 52 48 Z" 
            fill="url(#nw-red)"
            filter="url(#nw-shadow)"
          />

          {/* Ribbon Fold 4: Right Orange Downward Sweep */}
          <path 
            d="M62 36 C72 34 86 50 102 78 C96 82 82 72 72 58 C66 50 62 42 62 36 Z" 
            fill="url(#nw-orange)"
            filter="url(#nw-shadow)"
          />

          {/* High-gloss highlights */}
          <path 
            d="M28 65 C34 50 42 42 48 40" 
            stroke="rgba(255,255,255,0.45)" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />
          <path 
            d="M68 40 C76 46 88 62 94 72" 
            stroke="rgba(255,255,255,0.4)" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />
        </svg>
      </div>

      {/* 
        Original Wordmark from: newways logo.png 
        "Newways" in authentic high-contrast serif font with custom arrow bar emerging from 'w' over 'ways' pointing ↗ 
      */}
      <div className="flex flex-col">
        <div className="relative inline-flex items-baseline">
          <span 
            className="text-xl md:text-2xl font-serif font-bold tracking-tight relative pr-4"
            style={{ color: textColor, fontFamily: "'Lora', 'Playfair Display', Georgia, serif" }}
          >
            Newways
            {/* Arrow accent over 'ways' */}
            <svg 
              className="absolute right-0 -top-1 w-6 h-4 overflow-visible" 
              viewBox="0 0 24 16" 
              fill="none"
            >
              <path 
                d="M2 12 Q 10 6 18 3 L 22 2" 
                stroke={isWhite ? '#38bdf8' : '#0284c7'} 
                strokeWidth="2.2" 
                strokeLinecap="round" 
              />
              <path 
                d="M17 2 L 22 2 L 21 7" 
                stroke={isWhite ? '#38bdf8' : '#0284c7'} 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </span>
        </div>

        {/* Subtitle / Enterprise descriptor */}
        <div className="flex items-center gap-2 mt-0.5">
          <span 
            className="text-[9px] font-bold tracking-[0.28em] uppercase leading-none"
            style={{ color: subColor }}
          >
            ENTERPRISE
          </span>
          {showTagline && (
            <span className="text-[9px] font-semibold text-emerald-400 tracking-wider">
              • Polymer Network
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
