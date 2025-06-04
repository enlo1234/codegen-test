/// <reference types="vite/client" />

interface Window {
  avoCallback?: {
    logEvent: (eventName: string, eventProperties: Record<string, any>) => void;
  };
}