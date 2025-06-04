import React from 'react';
import { useAnalytics } from '../context/AnalyticsContext';

const PlatformTabs: React.FC = () => {
  const { activePlatform, setActivePlatform, showComparison } = useAnalytics();

  if (!showComparison) {
    return null;
  }

  return (
    <div className="mb-4 border-b border-slate-200 dark:border-slate-700">
      <div className="flex overflow-x-auto">
        <button
          onClick={() => setActivePlatform('mixpanel')}
          className={`tab ${activePlatform === 'mixpanel' ? 'tab-active' : ''}`}
        >
          Mixpanel
        </button>
        <button
          onClick={() => setActivePlatform('amplitude')}
          className={`tab ${activePlatform === 'amplitude' ? 'tab-active' : ''}`}
        >
          Amplitude
        </button>
        <button
          onClick={() => setActivePlatform('segment')}
          className={`tab ${activePlatform === 'segment' ? 'tab-active' : ''}`}
        >
          Segment
        </button>
        <button
          onClick={() => setActivePlatform('custom')}
          className={`tab ${activePlatform === 'custom' ? 'tab-active' : ''}`}
        >
          Your Custom SDK
        </button>
      </div>
    </div>
  );
};

export default PlatformTabs;