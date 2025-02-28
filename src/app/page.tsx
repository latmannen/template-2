"use client";

import { DeepgramContextProvider } from "@/lib/contexts/DeepgramContext";
import VoiceRecorder from "@/components/VoiceRecorder";
import VoiceNotesList from "@/components/VoiceNotesList";

export default function Home() {
  return (
    <DeepgramContextProvider>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 dark:from-gray-900 dark:via-indigo-950/20 dark:to-gray-800 bg-gradient-animate">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-3">
              Voice Notes
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
              Capture your thoughts effortlessly with voice-to-text
            </p>
          </header>

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
