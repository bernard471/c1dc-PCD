import { useState, useEffect } from 'react';
import { Shield, Lock, Key, Bell, History, UserCheck, Users, MessageCircle, Star, ClipboardList, Mail } from 'lucide-react';

type Activity = {
  id: string;
  icon: string;
  iconColor: string;
  iconBgColor: string;
  title: string;
  timestamp: string;
};

//change default activities to no activities recorded currently
const defaultActivities: Activity[] = [];

export function RecentActivities() {
  const [activities, setActivities] = useState<Activity[]>(defaultActivities);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/user/activities');
        if (response.ok) {
          const data = await response.json();
          if (data.activities && data.activities.length > 0) {
            setActivities(data.activities);
          }
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return <Shield className="w-4 h-4 text-blue-600" />;
      case 'lock':
        return <Lock className="w-4 h-4 text-green-600" />;
      case 'key':
        return <Key className="w-4 h-4 text-purple-600" />;
      case 'bell':
        return <Bell className="w-4 h-4 text-yellow-600" />;
      case 'history':
        return <History className="w-4 h-4 text-indigo-600" />;
      case 'user-check':
        return <UserCheck className="w-4 h-4 text-teal-600" />;
      case 'users':
        return <Users className="w-4 h-4 text-purple-600" />;
      case 'message-circle':
        return <MessageCircle className="w-4 h-4 text-indigo-600" />;
      case 'star':
        return <Star className="w-4 h-4 text-amber-600" />;
      case 'clipboard-list':
        return <ClipboardList className="w-4 h-4 text-red-600" />;
      case 'mail':
        return <Mail className="w-4 h-4 text-yellow-600" />;
      default:
        return <Shield className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <h3 className="font-medium text-gray-800 mb-3">Recent Activity</h3>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-sm text-gray-500">Loading your recent activities...</p>
        </div>
      ) : activities.length > 0 ? (
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full ${activity.iconBgColor} flex items-center justify-center`}>
                {getIconComponent(activity.icon)}
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-800">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <History className="h-10 w-10 text-gray-300 mb-2" />
          <p className="text-gray-500">No activities recorded yet</p>
          <p className="text-xs text-gray-400 mt-1">
            Complete security assessments to see your activity here
          </p>
        </div>
      )}
    </div>
  );
}
