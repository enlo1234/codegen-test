import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Avo, { AvoEnv } from '../Avo';

const customDestination = {
  make: function (env: string, apiKey: string) {
    console.log("[Custom Analytics] Initialized destination", { env, apiKey });
  },

  logEvent: function (eventName: string, eventProperties: object) {
    console.log("[Custom Analytics] Sending event to analytics platform:", eventName, eventProperties);
    // Send to EventLogger component through window callback
    window.avoCallback?.logEvent(eventName, eventProperties);
  },

  setUserProperties: function (userId: string, userProperties: object) {
    console.log("[Custom Analytics] Setting user properties:", userId, userProperties);
  },

  identify: function (userId: string) {
    console.log("[Custom Analytics] Identifying user:", userId);
  },

  unidentify: function () {
    console.log("[Custom Analytics] Resetting user identity");
  },

  logPage: function (pageName: string, eventProperties: object) {
    console.log("[Custom Analytics] Tracking page view:", pageName, eventProperties);
  },

  revenue: function (amount: number, eventProperties: object) {
    console.log("[Custom Analytics] Recording revenue:", amount, eventProperties);
  },

  setGroupProperties: function (
    groupType: string,
    groupId: string,
    groupProperties: object
  ) {
    console.log("[Custom Analytics] Setting group properties:", groupType, groupId, groupProperties);
  },

  addCurrentUserToGroup: function (
    groupType: string,
    groupId: string,
    groupProperties: object
  ) {
    console.log("[Custom Analytics] Adding user to group:", groupType, groupId, groupProperties);
  },

  logEventWithGroups: function (
    eventName: string,
    eventProperties: object,
    groupTypesToGroupIds: object
  ) {
    console.log("[Custom Analytics] Tracking event with groups:", eventName, eventProperties, groupTypesToGroupIds);
  },
};

// Initialize Avo with the custom destination
Avo.initAvo({ 
  env: AvoEnv.Dev,
  webDebugger: true 
}, {}, customDestination);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);