import React from 'react';
import * as Avo from '../../Avo';

const EventTrigger: React.FC = () => {
  // Get all exported functions from Avo except initAvo, AvoEnv, default, avoInspectorApiKey, WebDebuggerPosition, and setAvoLogger
  const avoEvents = Object.entries(Avo).filter(([key]) => 
    !['initAvo', 'AvoEnv', 'default', 'avoInspectorApiKey', 'WebDebuggerPosition', 'setAvoLogger'].includes(key)
  );

  const triggerEvent = (eventName: string, eventFunction: Function) => {
    // Example properties - in a real app, you might want to make these configurable
    const defaultProps = {
      gaEventType: "event_triggered",
      hotjarEventType: "event_triggered"
    };
    
    eventFunction(defaultProps);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Available Avo Events</h2>
      
      <div className="space-y-4">
        {avoEvents.map(([eventName, eventFunction]) => (
          <div key={eventName} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <h3 className="font-semibold mb-2">{eventName}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Track analytics event: {eventName}
            </p>
            <button
              onClick={() => triggerEvent(eventName, eventFunction)}
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 text-base"
            >
              Trigger Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventTrigger;