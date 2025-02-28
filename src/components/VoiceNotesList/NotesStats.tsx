'use client';

import { memo, useMemo } from 'react';
import { VoiceNote } from '@/types/voiceNote';

interface NotesStatsProps {
  notes: VoiceNote[];
  isVisible: boolean;
}

function NotesStats({ notes, isVisible }: NotesStatsProps) {
  const stats = useMemo(() => {
    if (notes.length === 0) {
      return {
        totalNotes: 0,
        totalWords: 0,
        avgWordsPerNote: 0,
        longestNote: 0,
        shortestNote: 0,
        oldestNote: null as Date | null,
        newestNote: null as Date | null,
      };
    }

    const totalNotes = notes.length;
    
    // Calculate word counts
    const wordCounts = notes.map(note => {
      const words = note.text.trim().split(/\s+/);
      return words.length;
    });
    
    const totalWords = wordCounts.reduce((sum, count) => sum + count, 0);
    const avgWordsPerNote = Math.round(totalWords / totalNotes);
    const longestNote = Math.max(...wordCounts);
    const shortestNote = Math.min(...wordCounts);
    
    // Find dates
    const dates = notes.map(note => new Date(note.createdAt.seconds * 1000));
    const oldestNote = new Date(Math.min(...dates.map(d => d.getTime())));
    const newestNote = new Date(Math.max(...dates.map(d => d.getTime())));
    
    return {
      totalNotes,
      totalWords,
      avgWordsPerNote,
      longestNote,
      shortestNote,
      oldestNote,
      newestNote,
    };
  }, [notes]);

  if (!isVisible) return null;

  return (
    <div className="bg-slate-50 dark:bg-gray-800/50 rounded-xl border border-slate-200 dark:border-gray-700 p-5 mb-6">
      <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Notes Statistics
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatItem label="Total Notes" value={stats.totalNotes.toString()} />
        <StatItem label="Total Words" value={stats.totalWords.toString()} />
        <StatItem label="Avg Words/Note" value={stats.avgWordsPerNote.toString()} />
        <StatItem label="Longest Note" value={`${stats.longestNote} words`} />
      </div>
    </div>
  );
}

interface StatItemProps {
  label: string;
  value: string;
}

function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="bg-white dark:bg-gray-900/30 rounded-lg p-3 border border-slate-100 dark:border-gray-800">
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{label}</p>
      <p className="text-lg font-semibold text-slate-800 dark:text-white">{value}</p>
    </div>
  );
}

export default memo(NotesStats); 