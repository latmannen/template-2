'use client';

import { memo } from 'react';

interface RecordButtonProps {
  isRecording: boolean;
  isSaving: boolean;
  onToggle: () => Promise<void>;
}

function RecordButton({ isRecording, isSaving, onToggle }: RecordButtonProps) {
  return (
    <div className="flex justify-center mb-8">
      <button
        onClick={onToggle}
        disabled={isSaving}
        className={`relative group w-20 h-20 flex items-center justify-center rounded-full transition-all duration-300 ${
          isRecording 
            ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/30' 
            : 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30'
        } ${isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
      >
        {isRecording ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="6" y="6" width="12" height="12" strokeWidth="2" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        )}
        
        {isRecording && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
          </span>
        )}
      </button>
    </div>
  );
}

export default memo(RecordButton); 