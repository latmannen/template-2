'use client';

import { useState, useEffect } from 'react';
import { useDeepgram, SOCKET_STATES } from '@/lib/contexts/DeepgramContext';
import { addDocument } from '@/lib/firebase/firebaseUtils';

export default function VoiceRecorder() {
  const { 
    connectToDeepgram, 
    disconnectFromDeepgram, 
    connectionState, 
    realtimeTranscript, 
    error 
  } = useDeepgram();
  const [isRecording, setIsRecording] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Handle recording state based on connection state
  useEffect(() => {
    if (connectionState === SOCKET_STATES.open) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
    }
  }, [connectionState]);

  const toggleRecording = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  const startRecording = async () => {
    try {
      await connectToDeepgram();
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  const stopRecording = async () => {
    try {
      disconnectFromDeepgram();
      
      // Only save if there's actual content
      if (realtimeTranscript.trim()) {
        setIsSaving(true);
        await saveNote(realtimeTranscript);
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const saveNote = async (text: string) => {
    try {
      await addDocument("voiceNotes", {
        text: text.trim(),
        createdAt: new Date()
      });
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <div className="flex justify-center mb-8">
          <button
            onClick={toggleRecording}
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
            <p className="text-sm text-red-500 mt-2 bg-red-50 dark:bg-red-900/20 p-2 rounded-md">
              {error}
            </p>
          )}
        </div>
        
        {isRecording && (
          <div className="mt-4">
            <div className="flex justify-center space-x-1 mb-4 h-12">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-indigo-500 to-purple-600 rounded-full"
                  style={{
                    height: `${Math.max(20, Math.random() * 48)}px`,
                    animationDuration: `${0.8 + Math.random() * 0.5}s`,
                    animationDelay: `${i * 0.1}s`,
                    animationIterationCount: 'infinite',
                    animationName: 'pulse',
                    animationDirection: 'alternate',
                    animationTimingFunction: 'ease-in-out'
                  }}
                ></div>
              ))}
            </div>
            
            <div className="bg-slate-50 dark:bg-gray-900 p-4 rounded-xl border border-slate-200 dark:border-gray-700 max-h-48 overflow-y-auto shadow-inner">
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                {realtimeTranscript || 
                  <span className="text-slate-400 dark:text-slate-500 italic">
                    Listening to your voice...
                  </span>
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}