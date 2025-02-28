'use client';

import { memo } from 'react';

interface NotesHeaderProps {
  count: number;
}

function NotesHeader({ count }: NotesHeaderProps) {
  return (
    <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      Your Notes
      <span className="ml-2 text-sm font-normal text-slate-500 dark:text-slate-400">({count})</span>
    </h2>
  );
}

export default memo(NotesHeader); 