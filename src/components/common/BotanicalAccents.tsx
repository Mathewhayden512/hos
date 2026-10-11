import React from 'react';

export const LeafDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-4 text-[#879477] ${className}`}>
    <div className="h-[1px] w-12 bg-[#D8CBB9]" />
    <svg className="w-5 h-5 text-[#879477]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C10 6 6 8 6 12c0 3.3 2.7 6 6 6s6-2.7 6-6c0-4-4-6-6-10z" opacity="0.6" />
      <path d="M12 22c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
    <svg className="w-4 h-4 text-[#C97882]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
    <svg className="w-5 h-5 text-[#879477] transform scale-x-[-1]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C10 6 6 8 6 12c0 3.3 2.7 6 6 6s6-2.7 6-6c0-4-4-6-6-10z" opacity="0.6" />
      <path d="M12 22c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
    <div className="h-[1px] w-12 bg-[#D8CBB9]" />
  </div>
);

export const BotanicalBranch: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={`w-8 h-8 text-[#879477] opacity-75 ${className}`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <path d="M10 90 Q 40 70 80 10" />
    <path d="M 30 75 C 20 65 20 55 35 60" fill="#879477" />
    <path d="M 50 55 C 60 40 70 45 55 45" fill="#879477" />
    <path d="M 65 30 C 60 15 75 15 70 25" fill="#C97882" />
  </svg>
);
