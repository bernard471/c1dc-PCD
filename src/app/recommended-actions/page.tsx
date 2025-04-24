'use client';

import { useState, useEffect } from 'react';
import { Clock, AlertTriangle, ShieldAlert, ArrowUpDown, Calendar, Tag, ChevronRight } from 'lucide-react';
import { recommendedActionsData, RecommendedAction } from '@/data/recommendedActionsData';

export default function RecommendedActionsPage() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');
  const [actions, setActions] = useState<RecommendedAction[]>(recommendedActionsData);
  const [expandedAction, setExpandedAction] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Filter and sort actions
  useEffect(() => {
    let filteredActions = [...recommendedActionsData];
    
    // Apply status filter
    if (filter !== 'all') {
      filteredActions = filteredActions.filter(action => action.status === filter);
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filteredActions = filteredActions.filter(action => action.category === categoryFilter);
    }
    
    // Apply sorting
    filteredActions.sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortBy === 'dueDate') {
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        return dateA - dateB;
      }
      return 0;
    });
    
    setActions(filteredActions);
  }, [filter, sortBy, categoryFilter]);

  const getActionIcon = (icon: string) => {
    switch(icon) {
      case 'clock': 
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'alert': 
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'shield': 
        return <ShieldAlert className="h-5 w-5 text-green-600" />;
      default: 
        return <Clock className="h-5 w-5 text-blue-600" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high': 
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">High</span>;
      case 'medium': 
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Medium</span>;
      case 'low': 
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Low</span>;
      default:
        return null;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch(category) {
      case 'mobile': 
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">Mobile</span>;
      case 'network': 
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Network</span>;
      case 'account': 
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">Account</span>;
      case 'data': 
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-teal-100 text-teal-800">Data</span>;
      case 'privacy': 
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-800">Privacy</span>;
      default:
        return null;
    }
  };

  const toggleActionExpand = (id: number) => {
    setExpandedAction(expandedAction === id ? null : id);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No date set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Page header */}
      <div className="mb-6 ">
        <h1 className="text-2xl font-bold text-gray-900">Recommended Security Actions</h1>
        <p className="mt-2 text-gray-600">
          Complete these recommended actions to improve your security posture and protect your digital assets.
        </p>
      </div>
      
      {/* Filters and sorting */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:justify-between space-y-4">
          {/* Category filter */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center">
              <Tag className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setCategoryFilter('all')}
                className={`px-3 py-1 text-xs font-medium rounded-md ${
                  categoryFilter === 'all' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setCategoryFilter('mobile')}
                className={`px-3 py-1 text-xs font-medium rounded-md ${
                  categoryFilter === 'mobile' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Mobile
              </button>
              <button 
                onClick={() => setCategoryFilter('network')}
                className={`px-3 py-1 text-xs font-medium rounded-md ${
                  categoryFilter === 'network' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Network
              </button>
              <button 
                onClick={() => setCategoryFilter('account')}
                className={`px-3 py-1 text-xs font-medium rounded-md ${
                  categoryFilter === 'account' 
                    ? 'bg-indigo-100 text-indigo-800' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Account
              </button>
              <button 
                onClick={() => setCategoryFilter('data')}
                className={`px-3 py-1 text-xs font-medium rounded-md ${
                  categoryFilter === 'data' 
                    ? 'bg-teal-100 text-teal-800' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Data
              </button>
              <button 
                onClick={() => setCategoryFilter('privacy')}
                className={`px-3 py-1 text-xs font-medium rounded-md ${
                  categoryFilter === 'privacy' 
                    ? 'bg-pink-100 text-pink-800' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Privacy
              </button>
            </div>
          </div>
          
          {/* Sort by */}
          <div className="flex items-center">
            <ArrowUpDown className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700 mr-2">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="priority">Priority</option>
              <option value="dueDate">Date Posted</option>
            </select>
          </div>
        </div>
      </div>

          {/* Actions list */}
          <div className="space-y-4">
            {actions.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-500">No actions match your current filters.</p>
                <button 
                  onClick={() => {
                    setFilter('all');
                    setCategoryFilter('all');
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              actions.map(action => (
                <div key={action.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleActionExpand(action.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5">
                          {getActionIcon(action.icon)}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{action.title}</h3>
                          <p className="mt-1 text-sm text-gray-600">{action.description}</p>
                          
                          <div className="mt-2 flex flex-wrap gap-2">
                            {getPriorityBadge(action.priority)}
                            {getCategoryBadge(action.category)}
                            {action.dueDate && (
                              <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(action.dueDate)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${expandedAction === action.id ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                  
                  {/* Expanded content */}
                  {expandedAction === action.id && action.steps && (
                    <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Steps to complete:</h4>
                      <ol className="space-y-2 pl-5 list-decimal">
                        {action.steps.map((step, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
    </div>
  );
}
