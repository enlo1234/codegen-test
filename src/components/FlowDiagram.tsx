import React, { useState } from 'react';
import { useAnalytics } from '../context/AnalyticsContext';
import { ArrowRight, Database, PieChart } from 'lucide-react';

const FlowDiagram: React.FC = () => {
  const { activeMethod } = useAnalytics();
  const [animateFlow, setAnimateFlow] = useState(false);

  const startAnimation = () => {
    setAnimateFlow(true);
    setTimeout(() => setAnimateFlow(false), 2000);
  };

  const getMethodDescription = () => {
    if (!activeMethod) return 'Select a method to see how data flows';
    
    const descriptions: Record<string, string> = {
      make: 'Initialize the analytics SDK with your API key',
      logEvent: 'Track a custom event with properties',
      setUserProperties: 'Update properties for the current user',
      identify: 'Associate analytics data with a user ID',
      unidentify: 'Reset the current user identity',
      logPage: 'Track a page view event',
      revenue: 'Record a revenue transaction',
      setGroupProperties: 'Update properties for a specific group',
      addCurrentUserToGroup: 'Associate current user with a group',
      logEventWithGroups: 'Track an event in the context of groups'
    };
    
    return descriptions[activeMethod] || 'Flow visualization';
  };

  return (
    <div className="py-4">
      <div className="flex flex-col items-center mb-8">
        <h3 className="text-xl font-bold mb-4">{getMethodDescription()}</h3>
        <button 
          onClick={startAnimation}
          className="btn btn-primary mt-2"
          disabled={!activeMethod}
        >
          Simulate Data Flow
        </button>
      </div>
      
      <div className="relative mx-auto max-w-2xl h-80 flex items-center justify-center">
        {/* App */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-slate-800 border-2 border-blue-500 rounded-lg p-4 shadow-md w-48">
          <div className="text-center">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-bold">Your App</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Data Source</p>
          </div>
        </div>
        
        {/* Adapter */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 border-2 border-purple-500 rounded-lg p-4 shadow-md w-48 z-10">
          <div className="text-center">
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h4 className="font-bold">Destination Adapter</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Transforms Data</p>
            {activeMethod && (
              <div className="mt-2 py-1 px-2 bg-purple-100 dark:bg-purple-900/30 rounded-md text-xs font-mono">
                {activeMethod}()
              </div>
            )}
          </div>
        </div>
        
        {/* Analytics Platform */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-slate-800 border-2 border-teal-500 rounded-lg p-4 shadow-md w-48">
          <div className="text-center">
            <div className="h-12 w-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-2">
              <PieChart className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h4 className="font-bold">Analytics Platform</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Data Destination</p>
          </div>
        </div>
        
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          {/* Line from App to Adapter */}
          <path
            d="M120,140 C180,140 180,140 240,140"
            fill="none"
            stroke="#9333ea"
            strokeWidth="2"
            strokeDasharray={animateFlow ? "10" : "0"}
            strokeDashoffset={animateFlow ? "10" : "0"}
            className={animateFlow ? "flow-animation" : ""}
          />
          
          {/* Line from Adapter to Analytics */}
          <path
            d="M290,140 C350,140 350,140 410,140"
            fill="none"
            stroke="#0d9488"
            strokeWidth="2"
            strokeDasharray={animateFlow ? "10" : "0"}
            strokeDashoffset={animateFlow ? "10" : "0"}
            className={animateFlow ? "flow-animation" : ""}
            style={{ animationDelay: "0.5s" }}
          />
          
          {/* Data symbols */}
          <circle
            cx="180"
            cy="140"
            r="6"
            fill="#9333ea"
            className={animateFlow ? "fade-in" : "opacity-0"}
          />
          
          <circle
            cx="350"
            cy="140"
            r="6"
            fill="#0d9488"
            className={animateFlow ? "fade-in" : "opacity-0"}
            style={{ animationDelay: "0.5s" }}
          />
        </svg>
      </div>
      
      <div className="mt-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
        <h4 className="font-bold mb-4">How the Adapter Works</h4>
        <ol className="space-y-4">
          <li className="flex">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</span>
            <div>
              <p className="text-slate-700 dark:text-slate-300">Your app calls the adapter's standardized methods</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Example: <code className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">customDestination.logEvent("Button Clicked", &#123;buttonId: "submit"&#125;)</code></p>
            </div>
          </li>
          <li className="flex">
            <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</span>
            <div>
              <p className="text-slate-700 dark:text-slate-300">The adapter transforms the call to match your analytics platform's SDK</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">This provides a consistent API across different platforms</p>
            </div>
          </li>
          <li className="flex">
            <span className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</span>
            <div>
              <p className="text-slate-700 dark:text-slate-300">The analytics platform processes the data</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Your analytics dashboard now shows the tracked event</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default FlowDiagram;