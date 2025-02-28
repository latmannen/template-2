'use client';

import { memo, useMemo } from 'react';

function VoiceVisualizer() {
  // Generate random heights for visualization bars
  // Using useMemo to prevent re-rendering on each render
  const barHeights = useMemo(() => {
    return Array.from({ length: 6 }, () => Math.max(20, Math.random() * 48));
  }, []);

  const barDelays = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => i * 0.1);
  }, []);

  const barDurations = useMemo(() => {
    return Array.from({ length: 6 }, () => 0.8 + Math.random() * 0.5);
  }, []);

  return (
    <div className="flex justify-center space-x-1 mb-4 h-12">
      {barHeights.map((height, i) => (
        <div 
          key={i}
          className="w-1.5 bg-gradient-to-t from-indigo-500 to-purple-600 rounded-full"
          style={{
            height: `${height}px`,
            animationDuration: `${barDurations[i]}s`,
            animationDelay: `${barDelays[i]}s`,
            animationIterationCount: 'infinite',
            animationName: 'pulse',
            animationDirection: 'alternate',
            animationTimingFunction: 'ease-in-out'
          }}
        />
      ))}
    </div>
  );
}

export default memo(VoiceVisualizer); 