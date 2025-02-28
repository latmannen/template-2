"use client";

import { DeepgramContextProvider } from "@/lib/contexts/DeepgramContext";
import dynamic from 'next/dynamic';
import PageHeader from "@/components/PageHeader";
import ThemeToggle from "@/components/ThemeToggle";

// Dynamic imports to improve initial load performance
const VoiceRecorder = dynamic(() => import('@/components/VoiceRecorder'), {
  ssr: false,
  loading: () => (
    <div className="h-40 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
    </div>
  )
});

const VoiceNotesList = dynamic(() => import('@/components/VoiceNotesList'), {
  ssr: false,
  loading: () => (
    <div className="h-40 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
    </div>
  )
});

export default function Home() {
  return (
    <DeepgramContextProvider>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 dark:from-gray-900 dark:via-indigo-950/20 dark:to-gray-800 bg-gradient-animate">
        <ThemeToggle />
        
        <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <PageHeader 
            title="Voice Notes"
            subtitle="Capture your thoughts effortlessly with voice-to-text"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <div className="sticky top-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-slate-200 dark:border-gray-700 overflow-hidden backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Record a Note</h2>
                    <VoiceRecorder />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-slate-200 dark:border-gray-700 overflow-hidden backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
                <div className="p-6">
                  <VoiceNotesList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DeepgramContextProvider>
  );
}
