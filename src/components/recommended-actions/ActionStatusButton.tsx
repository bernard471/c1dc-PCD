import React from 'react';
import { CheckCircle, Play } from 'lucide-react';

interface ActionStatusButtonProps {
  status: 'pending' | 'in-progress' | 'completed';
  onStatusChange: (newStatus: 'pending' | 'in-progress' | 'completed') => void;
}

const ActionStatusButton: React.FC<ActionStatusButtonProps> = ({ status, onStatusChange }) => {
  if (status === 'completed') {
    return (
      <button 
        className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md cursor-not-allowed flex items-center"
        disabled
      >
        <CheckCircle className="h-4 w-4 mr-2" />
        Completed
      </button>
    );
  }
  
  if (status === 'in-progress') {
    return (
      <button 
        onClick={() => onStatusChange('completed')}
        className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors flex items-center"
      >
        <CheckCircle className="h-4 w-4 mr-2" />
        Mark as Completed
      </button>
    );
  }
  
  return (
    <button 
      onClick={() => onStatusChange('in-progress')}
      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center"
    >
      <Play className="h-4 w-4 mr-2" />
      Start Action
    </button>
  );
};

export default ActionStatusButton;