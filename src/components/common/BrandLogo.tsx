import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  clickable?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = true,
  clickable = true,
  className = '',
}) => {
  const iconDimensions = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-16 h-16' : 'w-11 h-11';
  const scriptTextSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-xl';
  const titleTextSize = size === 'sm' ? 'text-sm font-semibold' : size === 'lg' ? 'text-2xl font-bold' : 'text-lg font-bold';
  const taglineTextSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[10px]';

  const logoContent = (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon SVG: Yarn Ball, Hooks, Leaves, Heart */}
      <div className={`relative flex-shrink-0 ${iconDimensions} rounded-full bg-[#FAF7EF] border border-[#D8CBB9] p-1 flex items-center justify-center shadow-stitch-sm`}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#3B2418] fill-current">
          {/* Leaves Background */}
          <path d="M 25 35 C 15 20, 35 15, 30 30 Z" fill="#879477" opacity="0.85" />
          <path d="M 75 35 C 85 20, 65 15, 70 30 Z" fill="#879477" opacity="0.85" />
          
          {/* Yarn Ball Circle */}
          <circle cx="50" cy="52" r="28" fill="#E8B5B8" stroke="#3B2418" strokeWidth="2.5" />
          
          {/* Yarn Texture Swirls */}
          <path d="M 30 45 C 40 32, 60 32, 70 45" fill="none" stroke="#C97882" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 26 55 C 38 68, 62 68, 74 55" fill="none" stroke="#FAF7EF" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 35 62 C 45 42, 55 42, 65 62" fill="none" stroke="#3B2418" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

          {/* Crossed Wooden Crochet Hooks */}
          <line x1="18" y1="82" x2="82" y2="18" stroke="#3B2418" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="82" y1="82" x2="18" y2="18" stroke="#3B2418" strokeWidth="3.5" strokeLinecap="round" />
          
          {/* Hook tips */}
          <circle cx="82" cy="18" r="3" fill="#C97882" />
          <circle cx="18" cy="18" r="3" fill="#C97882" />

          {/* Small Heart Accent */}
          <path d="M 50 22 C 47 17, 40 19, 44 25 L 50 30 L 56 25 C 60 19, 53 17, 50 22 Z" fill="#C97882" />
        </svg>
      </div>

      {/* Typography Stack */}
      <div className="flex flex-col">
        <div className="flex flex-col leading-none">
          <span className={`font-script text-[#C97882] ${scriptTextSize} tracking-wide transform -rotate-2 origin-left`}>
            A Millennial’s
          </span>
          <span className={`font-serif tracking-[0.18em] text-[#3B2418] uppercase ${titleTextSize}`}>
            STITCH
          </span>
        </div>

        {showTagline && (
          <span className={`font-serif italic text-[#879477] ${taglineTextSize} tracking-wider mt-0.5 whitespace-nowrap`}>
            Handmade with Love, Rooted in Faith.
          </span>
        )}
      </div>
    </div>
  );

  if (clickable) {
    return <Link to="/" className="inline-block hover:opacity-95 transition-opacity">{logoContent}</Link>;
  }

  return logoContent;
};
