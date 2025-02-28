'use client';

import { memo } from 'react';

function LoadingState() {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-500 animate-spin"></div>
        <p className="mt-4 text-slate-500 dark:text-slate-400">Loading your notes...</p>
      </div>
    </div>
  );
}

export default memo(LoadingState); 