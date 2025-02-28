import { useState, useEffect, useCallback } from 'react';
import { getDocuments, deleteDocument, addDocument } from '@/lib/firebase/firebaseUtils';
import { VoiceNote } from '@/types/voiceNote';

export function useVoiceNotes() {
  const [notes, setNotes] = useState<VoiceNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedNotes = await getDocuments("voiceNotes");
      // Sort notes by creation date (newest first)
      const sortedNotes = fetchedNotes.sort((a: any, b: any) => 
        b.createdAt.seconds - a.createdAt.seconds
      );
      setNotes(sortedNotes as VoiceNote[]);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to load notes. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const addNote = useCallback(async (text: string) => {
    try {
      setError(null);
      await addDocument("voiceNotes", {
        text: text.trim(),
        createdAt: new Date()
      });
      // Refresh the notes list
      await fetchNotes();
      return true;
    } catch (err) {
      console.error("Error adding note:", err);
      setError("Failed to save note. Please try again.");
      return false;
    }
  }, [fetchNotes]);

  const deleteNote = useCallback(async (id: string) => {
    try {
      setError(null);
      await deleteDocument("voiceNotes", id);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      return true;
    } catch (err) {
      console.error("Error deleting note:", err);
      setError("Failed to delete note. Please try again.");
      return false;
    }
  }, []);

  return {
    notes,
    loading,
    error,
    fetchNotes,
    addNote,
    deleteNote
  };
} 