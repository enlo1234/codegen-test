import React from 'react';
import EventLogger from './components/EventLogger';
import EventTrigger from './components/EventTrigger';
import { AnalyticsProvider } from './context/AnalyticsContext';

const App = () => {
  return (
    <AnalyticsProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-8 space-y-8">
          <EventTrigger />
          <EventLogger />
        </main>
      </div>
    </AnalyticsProvider>
  );
}

export default App;