'use client';

import { memo } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="text-center mb-12">
      <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-3">
        {title}
      </h1>
      {subtitle && (
        <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </header>
  );
}

export default memo(PageHeader); 