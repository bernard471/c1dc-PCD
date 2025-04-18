import React, { useState } from 'react';
import { Clock, AlertTriangle, ShieldAlert } from 'lucide-react';

interface RecommendedAction {
  id: number;
  title: string;
  description: string;
  icon: 'clock' | 'alert' | 'shield';
}

const RecommendedActions: React.FC = () => {
  // Move the actions data into the component
  const [actions] = useState<RecommendedAction[]>([
    { 
      id: 1, 
      title: 'Update mobile device passwords', 
      description: 'Recommended to change every 90 days',
      icon: 'clock'
    },
    { 
      id: 2, 
      title: 'Enable two-factor auth for email', 
      description: 'Increases account security by 99%',
      icon: 'alert'
    },
    { 
      id: 3, 
      title: 'Update router firmware', 
      description: 'Current version is 3 months old',
      icon: 'shield'
    }
  ]);

  const getActionIcon = (icon: string) => {
    switch(icon) {
      case 'clock': 
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'alert': 
        return <AlertTriangle className="h-5 w-5 text-blue-600" />;
      case 'shield': 
        return <ShieldAlert className="h-5 w-5 text-blue-600" />;
      default: 
        return <Clock className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Recommended Actions</h2>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
          {actions.length} actions
        </span>
      </div>
      
      <ul className="space-y-3">
        {actions.map(action => (
          <li key={action.id} className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5">
              {getActionIcon(action.icon)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{action.title}</p>
              <p className="mt-1 text-xs text-gray-500">{action.description}</p>
            </div>
          </li>
        ))}
      </ul>
      
      <button className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Review All Actions
      </button>
    </div>
  );
};

export default RecommendedActions;
