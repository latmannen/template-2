'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDeepgram, SOCKET_STATES } from '@/lib/contexts/DeepgramContext';
import { useVoiceNotes } from '@/hooks/useVoiceNotes';
import { useNotification } from '@/lib/contexts/NotificationContext';
import RecordButton from './RecordButton';
import VoiceVisualizer from './VoiceVisualizer';
import TranscriptDisplay from './TranscriptDisplay';
import StatusIndicator from './StatusIndicator';

export default function VoiceRecorder() {
  const { 
    connectToDeepgram, 
    disconnectFromDeepgram, 
    connectionState, 
    realtimeTranscript, 
    error: deepgramError 
  } = useDeepgram();
  
  const { addNote, error: notesError } = useVoiceNotes();
  const { showNotification } = useNotification();
  
  const [isRecording, setIsRecording] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Combine errors from different sources
  useEffect(() => {
    setError(deepgramError || notesError);
    
    if (deepgramError) {
      showNotification('error', `Recording error: ${deepgramError}`);
    }
    
    if (notesError) {
      showNotification('error', notesError);
    }
  }, [deepgramError, notesError, showNotification]);

  // Handle recording state based on connection state
  useEffect(() => {
    setIsRecording(connectionState === SOCKET_STATES.open);
    
    if (connectionState === SOCKET_STATES.open) {
      showNotification('info', 'Recording started');
    }
  }, [connectionState, showNotification]);

  const startRecording = useCallback(async () => {
    try {
      await connectToDeepgram();
    } catch (error) {
      console.error("Failed to start recording:", error);
      showNotification('error', 'Failed to start recording');
    }
  }, [connectToDeepgram, showNotification]);

  const stopRecording = useCallback(async () => {
    try {
      disconnectFromDeepgram();
      
      // Only save if there's actual content
      if (realtimeTranscript.trim()) {
        setIsSaving(true);
        const success = await addNote(realtimeTranscript);
        
        if (success) {
          showNotification('success', 'Note saved successfully');
        }
      } else {
        showNotification('info', 'No content to save');
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
      showNotification('error', 'Error saving note');
    } finally {
      setIsSaving(false);
    }
  }, [disconnectFromDeepgram, realtimeTranscript, addNote, showNotification]);

  const toggleRecording = useCallback(async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <RecordButton 
          isRecording={isRecording} 
          isSaving={isSaving} 
          onToggle={toggleRecording} 
        />
        
        <StatusIndicator 
          isRecording={isRecording} 
          isSaving={isSaving} 
          error={error} 
        />
        
        {isRecording && (
          <div className="mt-4">
            <VoiceVisualizer />
            <TranscriptDisplay text={realtimeTranscript} />
          </div>
        )}
      </div>
    </div>
  );
} 