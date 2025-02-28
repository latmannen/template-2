"use client";

import { useState, useEffect } from "react";
import { getDocuments, deleteDocument } from "@/lib/firebase/firebaseUtils";
import { formatDistanceToNow } from "date-fns";

interface VoiceNote {
  id: string;
  text: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export default function VoiceNotesList() {
  const [notes, setNotes] = useState<VoiceNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const fetchedNotes = await getDocuments("voiceNotes");
        // Sort notes by creation date (newest first)
        const sortedNotes = fetchedNotes.sort((a: any, b: any) => 
          b.createdAt.seconds - a.createdAt.seconds
        );
        setNotes(sortedNotes as VoiceNote[]);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDocument("voiceNotes", id);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-500 animate-spin"></div>
          <p className="mt-4 text-slate-500 dark:text-slate-400">Loading your notes...</p>
        </div>
      </div>
    );
  }

  if (notes.length === 0) {
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

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Your Notes
        <span className="ml-2 text-sm font-normal text-slate-500 dark:text-slate-400">({notes.length})</span>
      </h2>
      
      <div className="space-y-4">
        {notes.map((note: VoiceNote) => {
          const date = new Date(note.createdAt.seconds * 1000);
          const timeAgo = formatDistanceToNow(date, { addSuffix: true });
          
          return (
            <div 
              key={note.id} 
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
                  onClick={() => handleDelete(note.id)}
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
        })}
      </div>
    </div>
  );
} 