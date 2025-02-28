'use client';

import { memo } from 'react';

export type SortOption = 'newest' | 'oldest' | 'longest' | 'shortest';

interface SortOptionsProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

function SortOptions({ currentSort, onSortChange }: SortOptionsProps) {
  return (
    <div className="flex items-center mb-6 space-x-2">
      <span className="text-sm text-slate-500 dark:text-slate-400">Sort by:</span>
      <div className="flex space-x-1 bg-slate-100 dark:bg-gray-800 rounded-lg p-1">
        <SortButton 
          active={currentSort === 'newest'} 
          onClick={() => onSortChange('newest')}
          label="Newest"
        />
        <SortButton 
          active={currentSort === 'oldest'} 
          onClick={() => onSortChange('oldest')}
          label="Oldest"
        />
        <SortButton 
          active={currentSort === 'longest'} 
          onClick={() => onSortChange('longest')}
          label="Longest"
        />
        <SortButton 
          active={currentSort === 'shortest'} 
          onClick={() => onSortChange('shortest')}
          label="Shortest"
        />
      </div>
    </div>
  );
}

interface SortButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

function SortButton({ active, onClick, label }: SortButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
        active 
          ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
      }`}
    >
      {label}
    </button>
  );
}

export default memo(SortOptions); 