'use client';

import { memo } from 'react';

interface TranscriptDisplayProps {
  text: string;
}

function TranscriptDisplay({ text }: TranscriptDisplayProps) {
  return (
    <div className="bg-slate-50 dark:bg-gray-900 p-4 rounded-xl border border-slate-200 dark:border-gray-700 max-h-48 overflow-y-auto shadow-inner">
      <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
        {text || 
          <span className="text-slate-400 dark:text-slate-500 italic">
            Listening to your voice...
          </span>
        }
      </p>
    </div>
  );
}

export default memo(TranscriptDisplay); 