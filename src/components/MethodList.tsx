import React from 'react';
import { useAnalytics } from '../context/AnalyticsContext';
import { 
  Play, Activity, User, Users, RefreshCcw, 
  Layout, DollarSign, Tag, UserPlus, BarChart 
} from 'lucide-react';

const methods = [
  { id: 'make', name: 'make', icon: Play, description: 'Initialize the SDK' },
  { id: 'logEvent', name: 'logEvent', icon: Activity, description: 'Track custom events' },
  { id: 'setUserProperties', name: 'setUserProperties', icon: User, description: 'Set user properties' },
  { id: 'identify', name: 'identify', icon: Tag, description: 'Identify current user' },
  { id: 'unidentify', name: 'unidentify', icon: RefreshCcw, description: 'Reset user identity' },
  { id: 'logPage', name: 'logPage', icon: Layout, description: 'Track page views' },
  { id: 'revenue', name: 'revenue', icon: DollarSign, description: 'Track revenue' },
  { id: 'setGroupProperties', name: 'setGroupProperties', icon: Users, description: 'Set group properties' },
  { id: 'addCurrentUserToGroup', name: 'addCurrentUserToGroup', icon: UserPlus, description: 'Add user to group' },
  { id: 'logEventWithGroups', name: 'logEventWithGroups', icon: BarChart, description: 'Track events with groups' }
];

const MethodList: React.FC = () => {
  const { activeMethod, setActiveMethod } = useAnalytics();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Analytics Methods</h3>
      <div className="space-y-1 max-h-[500px] overflow-y-auto pr-2">
        {methods.map((method) => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              onClick={() => setActiveMethod(method.id === activeMethod ? null : method.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center transition-colors ${
                activeMethod === method.id
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
              <div>
                <div className="font-medium">{method.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{method.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MethodList;