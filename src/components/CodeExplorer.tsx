import React, { useState } from 'react';
import { useAnalytics } from '../context/AnalyticsContext';
import CodeViewer from './CodeViewer';
import FlowDiagram from './FlowDiagram';
import PlatformTabs from './PlatformTabs';
import MethodList from './MethodList';
import { Info, ExternalLink } from 'lucide-react';

const CodeExplorer: React.FC = () => {
  const { showComparison, setShowComparison } = useAnalytics();
  const [activeTab, setActiveTab] = useState<'code' | 'visual'>('code');

  return (
    <div className="space-y-8">
      <section className="card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Analytics Destination Adapter</h2>
            <p className="text-slate-600 dark:text-slate-300">
              This code defines a custom integration between your application and analytics platforms.
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="btn btn-outline text-sm"
            >
              {showComparison ? 'Hide Comparison' : 'Show Platform Comparison'}
            </button>
          </div>
        </div>

        <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg mb-6 flex items-start">
          <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              This adapter translates generic analytics operations into platform-specific implementation. 
              It serves as a bridge between your app's tracking needs and various analytics SDKs.
            </p>
            <a 
              href="#" 
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline mt-2 inline-flex items-center"
            >
              Learn more about analytics integrations
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>

        <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
          <div className="flex">
            <button
              className={`tab ${activeTab === 'code' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('code')}
            >
              Code Explorer
            </button>
            <button
              className={`tab ${activeTab === 'visual' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('visual')}
            >
              Visual Flow
            </button>
          </div>
        </div>

        {activeTab === 'code' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <MethodList />
            </div>
            <div className="lg:col-span-3">
              <PlatformTabs />
              <CodeViewer />
            </div>
          </div>
        ) : (
          <FlowDiagram />
        )}
      </section>

      <section className="card">
        <h3 className="text-xl font-bold mb-4">How It Works</h3>
        <p className="mb-4">
          This code defines a custom destination adapter for analytics tracking. It creates a standardized 
          interface that maps common analytics operations to specific implementations in analytics platforms 
          like Mixpanel, Amplitude, or Segment.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
            <h4 className="font-semibold mb-2">1. Initialization</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              The adapter initializes your analytics SDK with the proper credentials and configuration.
            </p>
          </div>
          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
            <h4 className="font-semibold mb-2">2. Event Tracking</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Standardized methods capture user actions and map them to the appropriate SDK method calls.
            </p>
          </div>
          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
            <h4 className="font-semibold mb-2">3. User & Group Management</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Methods for identifying users and managing group associations across different platforms.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CodeExplorer;