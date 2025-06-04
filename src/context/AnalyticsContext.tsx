import React, { createContext, useContext, useState, ReactNode } from 'react';

type PlatformType = 'mixpanel' | 'amplitude' | 'segment' | 'custom';

interface AnalyticsContextType {
  activePlatform: PlatformType;
  setActivePlatform: (platform: PlatformType) => void;
  activeMethod: string | null;
  setActiveMethod: (method: string | null) => void;
  showComparison: boolean;
  setShowComparison: (show: boolean) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const [activePlatform, setActivePlatform] = useState<PlatformType>('mixpanel');
  const [activeMethod, setActiveMethod] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <AnalyticsContext.Provider
      value={{
        activePlatform,
        setActivePlatform,
        activeMethod,
        setActiveMethod,
        showComparison,
        setShowComparison
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};