"use client";

import { useVoiceNotes } from "@/hooks/useVoiceNotes";
import { useNotification } from "@/lib/contexts/NotificationContext";
import { useCallback, useState, useMemo } from "react";
import NotesHeader from "./NotesHeader";
import NotesList from "./NotesList";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorDisplay from "./ErrorDisplay";
import SearchBar from "./SearchBar";
import SortOptions, { SortOption } from "./SortOptions";
import NotesStats from "./NotesStats";

export default function VoiceNotesList() {
  const { notes, loading, error, deleteNote } = useVoiceNotes();
  const { showNotification } = useNotification();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [showStats, setShowStats] = useState(false);

  const handleDeleteNote = useCallback(async (id: string) => {
    try {
      const success = await deleteNote(id);
      if (success) {
        showNotification('success', 'Note deleted successfully');
      }
      return success;
    } catch (error) {
      showNotification('error', 'Failed to delete note');
      return false;
    }
  }, [deleteNote, showNotification]);

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) {
      return notes;
    }
    
    const query = searchQuery.toLowerCase();
    return notes.filter(note => 
      note.text.toLowerCase().includes(query)
    );
  }, [notes, searchQuery]);

  const sortedNotes = useMemo(() => {
    const notesToSort = [...filteredNotes];
    
    switch (sortOption) {
      case 'newest':
        return notesToSort.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
      case 'oldest':
        return notesToSort.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
      case 'longest':
        return notesToSort.sort((a, b) => b.text.length - a.text.length);
      case 'shortest':
        return notesToSort.sort((a, b) => a.text.length - b.text.length);
      default:
        return notesToSort;
    }
  }, [filteredNotes, sortOption]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSortChange = useCallback((option: SortOption) => {
    setSortOption(option);
  }, []);

  const toggleStats = useCallback(() => {
    setShowStats(prev => !prev);
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (notes.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <NotesHeader count={notes.length} />
        <button
          onClick={toggleStats}
          className="text-sm text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {showStats ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            )}
          </svg>
          {showStats ? 'Hide Stats' : 'Show Stats'}
        </button>
      </div>

      <NotesStats notes={notes} isVisible={showStats} />
      <SearchBar onSearch={handleSearch} />
      <SortOptions currentSort={sortOption} onSortChange={handleSortChange} />
      
      {sortedNotes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-500 dark:text-slate-400">No notes match your search</p>
          <button 
            onClick={() => setSearchQuery('')}
            className="mt-2 text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 text-sm font-medium"
          >
            Clear search
          </button>
        </div>
      ) : (
        <NotesList notes={sortedNotes} onDelete={handleDeleteNote} />
      )}
    </div>
  );
} 