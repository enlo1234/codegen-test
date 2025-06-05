import React, { useState, useEffect } from 'react';
import { Activity, Info } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface EventLog {
  timestamp: string;
  source: 'avo' | 'custom';
  eventName: string;
  properties: Record<string, any>;
}

const EventLogger: React.FC = () => {
  const [logs, setLogs] = useState<EventLog[]>([]);

  useEffect(() => {
    const initAvo = async () => {
      try {
        // Listen for custom analytics events
        window.avoCallback = {
          logEvent: (eventName: string, eventProperties: Record<string, any>) => {
            const newLog = {
              timestamp: new Date().toISOString(),
              source: 'custom',
              eventName,
              properties: eventProperties
            };
            setLogs(prev => [newLog, ...prev]);
          }
        };

        // Listen for Avo internal events
        const originalConsoleLog = console.log;
        console.log = (...args) => {
          if (typeof args[0] === 'string' && args[0].startsWith('[avo] Event Sent:')) {
            const newLog = {
              timestamp: new Date().toISOString(),
              source: 'avo',
              eventName: args[1] || 'Unknown Event',
              properties: args[3] || {}
            };
            setLogs(prev => [newLog, ...prev]);
          }
          originalConsoleLog.apply(console, args);
        };
      } catch (error) {
        console.error('Failed to initialize Avo:', error);
      }
    };

    initAvo();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Event Logger</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Receiving and logging events from both Avo and the custom destination
        </p>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Event Flow</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Events are processed in two stages:</p>
            </div>
            <div className="space-y-2">
              <div className="bg-white dark:bg-slate-800 p-3 rounded-md border border-slate-200 dark:border-slate-700">
                <p className="font-mono text-sm text-purple-600 dark:text-purple-400">[avo] Event Sent</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Avo validates and processes the event before sending it to the destination
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-3 rounded-md border border-slate-200 dark:border-slate-700">
                <p className="font-mono text-sm text-teal-600 dark:text-teal-400">[Custom Analytics] Event Logged</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  The custom destination receives and processes the event
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold">Event Logs</h3>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-700 max-h-[600px] overflow-y-auto">
          {logs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              <Activity className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Waiting for events...</p>
            </div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${
                    log.source === 'avo' ? 'text-purple-600 dark:text-purple-400' : 'text-teal-600 dark:text-teal-400'
                  }`}>
                    {log.eventName}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      log.source === 'avo' 
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' 
                        : 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                    }`}>
                      {log.source === 'avo' ? 'Avo' : 'Custom'}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <SyntaxHighlighter
                    language="json"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: '0.75rem',
                      borderRadius: '0.375rem',
                      fontSize: '12px',
                    }}
                  >
                    {JSON.stringify(log.properties, null, 2)}
                  </SyntaxHighlighter>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EventLogger;