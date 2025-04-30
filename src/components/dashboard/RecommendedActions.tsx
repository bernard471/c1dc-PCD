import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { recommendedActionsData } from '@/data/recommendedActionsData';

interface RecommendedAction {
  id: number;
  title: string;
  description: string;
  icon: 'clock' | 'alert' | 'shield';
}

interface ActionWithCompletionStatus extends RecommendedAction {
  isCompleted?: boolean;
}

const RecommendedActions: React.FC = () => {
  // State for all actions with completion status
  const [, setAllActions] = useState<ActionWithCompletionStatus[]>([]);
  // State for dashboard actions (first 3)
  const [dashboardActions, setDashboardActions] = useState<ActionWithCompletionStatus[]>([]);
  // State for incomplete action count
  const [incompleteCount, setIncompleteCount] = useState<number>(recommendedActionsData.length);
  
  // Fetch actions with completion status
  useEffect(() => {
    const fetchCompletionStatus = async () => {
      try {
        const response = await fetch('/api/recommended-actions');
        if (response.ok) {
          const { data } = await response.json();
          setAllActions(data);
          
          // Get only the first 3 actions for the dashboard widget
          setDashboardActions(data.slice(0, 3));
          
          // Count incomplete actions
            const incomplete: number = data.filter((action: ActionWithCompletionStatus) => !action.isCompleted).length;
          setIncompleteCount(incomplete);
        } else {
          // If API fails, use the original data
          setDashboardActions(recommendedActionsData.slice(0, 3).map(({ id, title, description, icon }) => ({
            id, title, description, icon
          })));
          setIncompleteCount(recommendedActionsData.length);
        }
      } catch (error) {
        console.error('Error fetching completion status:', error);
        setDashboardActions(recommendedActionsData.slice(0, 3).map(({ id, title, description, icon }) => ({
          id, title, description, icon
        })));
        setIncompleteCount(recommendedActionsData.length);
      }
    };
    
    fetchCompletionStatus();
  }, []);

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
          {incompleteCount} {incompleteCount === 1 ? 'action' : 'actions'}
        </span>
      </div>
      
      <ul className="space-y-3">
        {dashboardActions.map(action => (
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
      
      <Link href="/recommended-actions" className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 inline-block text-center">
        Review All Actions
      </Link>
    </div>
  );
};

export default RecommendedActions;
