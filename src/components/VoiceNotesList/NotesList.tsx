'use client';

import { memo } from 'react';
import NoteItem from './NoteItem';
import { VoiceNote } from '@/types/voiceNote';

interface NotesListProps {
  notes: VoiceNote[];
  onDelete: (id: string) => Promise<boolean | void>;
}

function NotesList({ notes, onDelete }: NotesListProps) {
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteItem 
          key={note.id} 
          note={note} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}

export default memo(NotesList); 