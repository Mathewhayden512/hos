import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm animate-pulse space-y-4">
      <div className="w-full h-48 bg-slate-200 rounded-xl"></div>
      <div className="h-5 bg-slate-200 rounded w-3/4"></div>
      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
      <div className="space-y-2 pt-2">
        <div className="h-3 bg-slate-200 rounded w-full"></div>
        <div className="h-3 bg-slate-200 rounded w-5/6"></div>
      </div>
      <div className="flex gap-3 pt-3">
        <div className="h-10 bg-slate-200 rounded-xl w-1/2"></div>
        <div className="h-10 bg-slate-200 rounded-xl w-1/2"></div>
      </div>
    </div>
  );
};
