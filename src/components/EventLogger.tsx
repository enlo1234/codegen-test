import React, { useState, useEffect } from 'react';
import { Activity, Info } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface EventLog {
  timestamp: string;
  eventName: string;
  properties: Record<string, any>;
}

const EventLogger: React.FC = () => {
  const [logs, setLogs] = useState<EventLog[]>([]);

  useEffect(() => {
    const initAvo = async () => {
      try {
        window.avoCallback = {
          logEvent: (eventName: string, eventProperties: Record<string, any>) => {
            const newLog = {
              timestamp: new Date().toISOString(),
              eventName,
              properties: eventProperties
            };
            setLogs(prev => [newLog, ...prev]);
          }
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
          Receiving and logging events from Avo tracking plan
        </p>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Event Types in Console</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">You'll notice two types of event logs in the console:</p>
            </div>
            <div className="space-y-2">
              <div className="bg-white dark:bg-slate-800 p-3 rounded-md border border-slate-200 dark:border-slate-700">
                <p className="font-mono text-sm text-purple-600 dark:text-purple-400">[avo] Event Sent</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  From Avo's internal logging system, indicating an event has been processed and sent to the analytics destination.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-3 rounded-md border border-slate-200 dark:border-slate-700">
                <p className="font-mono text-sm text-teal-600 dark:text-teal-400">[Custom Analytics] Event Logged</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  From our custom destination implementation, showing the event was received and processed by our analytics adapter.
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
                  <span className="font-medium text-purple-600 dark:text-purple-400">
                    {log.eventName}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
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