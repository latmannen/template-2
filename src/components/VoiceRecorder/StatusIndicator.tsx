'use client';

import { memo } from 'react';

interface StatusIndicatorProps {
  isRecording: boolean;
  isSaving: boolean;
  error: string | null;
}

function StatusIndicator({ isRecording, isSaving, error }: StatusIndicatorProps) {
  return (
    <div className="text-center mb-6">
      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {isRecording ? "Recording in progress..." : "Tap the microphone to start"}
      </p>
      
      {isSaving && (
        <p className="text-sm text-indigo-500 dark:text-indigo-400 mt-2 animate-pulse">
          Saving your note...
        </p>
      )}
      
      {error && (
        <div className="mt-2 bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800/30">
          <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </p>
        </div>
      )}
    </div>
  );
}

export default memo(StatusIndicator); 