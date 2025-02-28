'use client';

import { memo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { VoiceNote } from '@/types/voiceNote';

interface NoteItemProps {
  note: VoiceNote;
  onDelete: (id: string) => Promise<boolean | void>;
}

function NoteItem({ note, onDelete }: NoteItemProps) {
  const date = new Date(note.createdAt.seconds * 1000);
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });
  
  const handleDelete = async () => {
    await onDelete(note.id);
  };
  
  return (
    <div 
      className="group bg-white dark:bg-gray-800/50 p-5 rounded-xl border border-slate-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{timeAgo}</p>
        </div>
        <button 
          onClick={handleDelete}
          className="text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
          aria-label="Delete note"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      <div className="mt-3 pl-11">
        <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{note.text}</p>
      </div>
    </div>
  );
}

export default memo(NoteItem); 