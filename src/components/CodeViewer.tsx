import React from 'react';
import { useAnalytics } from '../context/AnalyticsContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AlertCircle } from 'lucide-react';

const CodeViewer: React.FC = () => {
  const { activeMethod, activePlatform } = useAnalytics();
  
  // Define the full code for the customDestination object
  const fullCode = `// Custom destination adapter for analytics tracking
let customDestination = {
  make: function (env: AvoEnv, apiKey: string) {
    // TODO: Replace with a call to your destination
    mixpanel.getInstance().init(apiKey);
  },

  logEvent: function (eventName: string, eventProperties: object) {
    // TODO: Replace with a call to your destination
    mixpanel.getInstance().track(eventName, eventProperties);
  },

  setUserProperties: function (userId: string, userProperties: object) {
    // TODO: Replace with a call to your destination
    mixpanel.getInstance().people.set(userProperties);
  },

  identify: function (userId: string) {
    // TODO: Replace with a call to your destination
    mixpanel.getInstance().identify(userId);
  },

  unidentify: function () {
    // TODO: Replace with a call to your destination
    mixpanel.getInstance().reset();
  },

  logPage: function (pageName: string, eventProperties: object) {
    // TODO: Replace with a call to your destination
    mixpanel.track("Page Viewed", { ...eventProperties, pageName });
  },

  revenue: function (amount: number, eventProperties: object) {
    // TODO: Replace with a call to your destination
    mixpanel.getInstance().people.track_charge(amount, eventProperties);
  },

  // The following methods are used for group analytics
  setGroupProperties(
    groupType: string,
    groupId: string,
    groupProperties: object,
  ) {
    // TODO: Replace with a call to your destination
    // Mixpanel example
    mixpanel.get_group(groupType, groupId).set(groupProperties);
    // Amplitude example
    // var identify = new amplitude.Identify().set(groupProperties);
    // amplitude.groupIdentify(groupType, groupId, identify);
  },

  addCurrentUserToGroup: function (
    groupType: string,
    groupId: string,
    groupProperties: object,
  ) {
    // TODO: Replace with a call to your destination
    // Mixpanel example
    mixpanel.set_group(groupType, groupId);
    mixpanel.get_group(groupType, groupId).set(groupProperties);
    // Amplitude example
    // amplitude.getInstance().setGroup(groupType, groupId);
    // var identify = new amplitude.Identify().set(groupProperties);
    // amplitude.groupIdentify(groupType, groupId, identify);
    // Segment example
    // analytics.group(groupId, {
    //   name: groupType,
    //   ...groupProperties,
    // });
  },

  logEventWithGroups: function (
    eventName: string,
    eventProperties: object,
    groupTypesToGroupIds: object,
  ) {
    // TODO: Replace with a call to your destination
    // Mixpanel example
    mixpanel.track_with_groups(eventName, eventProperties, groupTypesToGroupIds);
    // Amplitude example
    // amplitude
    //   .getInstance()
    //   .logEventWithGroups(eventName, eventProperties, groupTypesToGroupIds);
  },
};`;

  // Function to get platform-specific implementation for a method
  const getPlatformImplementation = (methodName: string, platform: string) => {
    const implementations: Record<string, Record<string, string>> = {
      mixpanel: {
        make: 'mixpanel.getInstance().init(apiKey);',
        logEvent: 'mixpanel.getInstance().track(eventName, eventProperties);',
        setUserProperties: 'mixpanel.getInstance().people.set(userProperties);',
        identify: 'mixpanel.getInstance().identify(userId);',
        unidentify: 'mixpanel.getInstance().reset();',
        logPage: 'mixpanel.track("Page Viewed", { ...eventProperties, pageName });',
        revenue: 'mixpanel.getInstance().people.track_charge(amount, eventProperties);',
        setGroupProperties: 'mixpanel.get_group(groupType, groupId).set(groupProperties);',
        addCurrentUserToGroup: `mixpanel.set_group(groupType, groupId);
mixpanel.get_group(groupType, groupId).set(groupProperties);`,
        logEventWithGroups: 'mixpanel.track_with_groups(eventName, eventProperties, groupTypesToGroupIds);'
      },
      amplitude: {
        make: 'amplitude.getInstance().init(apiKey);',
        logEvent: 'amplitude.getInstance().logEvent(eventName, eventProperties);',
        setUserProperties: 'amplitude.getInstance().setUserProperties(userProperties);',
        identify: 'amplitude.getInstance().setUserId(userId);',
        unidentify: 'amplitude.getInstance().setUserId(null);',
        logPage: 'amplitude.getInstance().logEvent("Page Viewed", { ...eventProperties, pageName });',
        revenue: `const revenue = new amplitude.Revenue()
  .setProductId("product_id")
  .setPrice(amount)
  .setQuantity(1);
amplitude.getInstance().logRevenueV2(revenue);`,
        setGroupProperties: `var identify = new amplitude.Identify().set(groupProperties);
amplitude.groupIdentify(groupType, groupId, identify);`,
        addCurrentUserToGroup: `amplitude.getInstance().setGroup(groupType, groupId);
var identify = new amplitude.Identify().set(groupProperties);
amplitude.groupIdentify(groupType, groupId, identify);`,
        logEventWithGroups: 'amplitude.getInstance().logEventWithGroups(eventName, eventProperties, groupTypesToGroupIds);'
      },
      segment: {
        make: 'analytics.load(apiKey);',
        logEvent: 'analytics.track(eventName, eventProperties);',
        setUserProperties: 'analytics.identify(userId, userProperties);',
        identify: 'analytics.identify(userId);',
        unidentify: 'analytics.reset();',
        logPage: 'analytics.page(pageName, eventProperties);',
        revenue: 'analytics.track("Order Completed", { revenue: amount, ...eventProperties });',
        setGroupProperties: '// Segment does not have a direct group properties API',
        addCurrentUserToGroup: `analytics.group(groupId, {
  name: groupType,
  ...groupProperties,
});`,
        logEventWithGroups: `analytics.track(eventName, {
  ...eventProperties,
  groups: groupTypesToGroupIds
});`
      },
      custom: {
        make: '// Initialize your custom analytics SDK here',
        logEvent: '// Track events with your custom analytics SDK',
        setUserProperties: '// Set user properties with your custom analytics SDK',
        identify: '// Identify users with your custom analytics SDK',
        unidentify: '// Reset user identity with your custom analytics SDK',
        logPage: '// Track page views with your custom analytics SDK',
        revenue: '// Track revenue with your custom analytics SDK',
        setGroupProperties: '// Set group properties with your custom analytics SDK',
        addCurrentUserToGroup: '// Add users to groups with your custom analytics SDK',
        logEventWithGroups: '// Track events with group context in your custom analytics SDK'
      }
    };

    return implementations[platform][methodName] || '// Implementation not available';
  };

  // Get the implementation for the selected method and platform
  const getActiveImplementation = () => {
    if (!activeMethod) return null;

    return getPlatformImplementation(activeMethod, activePlatform);
  };

  // Extract the specific method from the full code
  const extractMethodCode = (methodName: string) => {
    if (!methodName) return fullCode;

    const lines = fullCode.split('\n');
    const methodStart = lines.findIndex(line => line.includes(`${methodName}: function`));
    
    if (methodStart === -1) return fullCode;
    
    let methodEnd = methodStart;
    let braceCount = 0;
    let foundOpeningBrace = false;
    
    for (let i = methodStart; i < lines.length; i++) {
      const line = lines[i];
      
      if (!foundOpeningBrace && line.includes('{')) {
        foundOpeningBrace = true;
      }
      
      if (foundOpeningBrace) {
        braceCount += (line.match(/{/g) || []).length;
        braceCount -= (line.match(/}/g) || []).length;
        
        if (braceCount === 0) {
          methodEnd = i;
          break;
        }
      }
    }
    
    return lines.slice(methodStart, methodEnd + 1).join('\n');
  };

  // The code to display
  const codeToDisplay = activeMethod ? extractMethodCode(activeMethod) : fullCode;

  return (
    <div className="rounded-lg overflow-hidden">
      {activeMethod && (
        <div className="bg-slate-100 dark:bg-slate-700 p-4 border-b border-slate-200 dark:border-slate-600">
          <h4 className="font-bold text-md mb-2">{activeMethod}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {getMethodDescription(activeMethod)}
          </p>
          {activePlatform !== 'mixpanel' && (
            <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded p-3 flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800 dark:text-amber-300">
                <strong>Platform-specific implementation:</strong>
                <div className="mt-2 p-2 bg-amber-100 dark:bg-amber-900/30 rounded font-mono text-xs">
                  {getActiveImplementation()}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="relative">
        <SyntaxHighlighter
          language="typescript"
          style={document.documentElement.classList.contains('dark') ? vscDarkPlus : materialLight}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            fontSize: '14px',
            lineHeight: '1.5',
          }}
          showLineNumbers={true}
        >
          {codeToDisplay}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

// Helper function to get method descriptions
function getMethodDescription(methodName: string): string {
  const descriptions: Record<string, string> = {
    make: 'Initializes the analytics SDK with the provided environment and API key.',
    logEvent: 'Tracks a custom event with optional properties.',
    setUserProperties: 'Sets or updates properties associated with the current user.',
    identify: 'Identifies the current user with a unique ID.',
    unidentify: 'Resets the current user identity (logs the user out).',
    logPage: 'Tracks a page view event with associated properties.',
    revenue: 'Tracks a revenue event with the specified amount and properties.',
    setGroupProperties: 'Sets properties for a specific group identified by type and ID.',
    addCurrentUserToGroup: 'Associates the current user with a specific group.',
    logEventWithGroups: 'Tracks an event in the context of specific groups.'
  };

  return descriptions[methodName] || 'No description available';
}

export default CodeViewer;