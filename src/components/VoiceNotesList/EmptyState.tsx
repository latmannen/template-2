'use client';

import { memo } from 'react';

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
      <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">No voice notes yet</h3>
      <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm">
        Start recording to create your first voice note. Your notes will appear here.
      </p>
    </div>
  );
}

export default memo(EmptyState); 