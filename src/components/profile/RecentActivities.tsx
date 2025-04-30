import { useState } from 'react';
import { Shield, Lock, Key, Bell, History, UserCheck } from 'lucide-react';

type Activity = {
  id: string;
  icon: string;
  iconColor: string;
  iconBgColor: string;
  title: string;
  timestamp: string;
};

const defaultActivities: Activity[] = [
  {
    id: '1',
    icon: 'shield',
    iconColor: 'text-blue-600',
    iconBgColor: 'bg-blue-100',
    title: 'Completed Mobile Security Assessment',
    timestamp: '2 days ago'
  },
  {
    id: '2',
    icon: 'lock',
    iconColor: 'text-green-600',
    iconBgColor: 'bg-green-100',
    title: 'Updated Wi-Fi Security Settings',
    timestamp: '5 days ago'
  },
  {
    id: '3',
    icon: 'key',
    iconColor: 'text-purple-600',
    iconBgColor: 'bg-purple-100',
    title: 'Enabled Two-Factor Authentication',
    timestamp: '1 week ago'
  }
];

export function RecentActivities() {
  const [activities] = useState<Activity[]>(defaultActivities);
  const [isLoading] = useState(false);

  // You can uncomment this to fetch real activities from an API endpoint
  // useEffect(() => {
  //   const fetchActivities = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch('/api/user/activities');
  //       if (response.ok) {
  //         const data = await response.json();
  //         setActivities(data.activities);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching activities:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //
  //   fetchActivities();
  // }, []);

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
      default:
        return <Shield className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <h3 className="font-medium text-gray-800 mb-3">Recent Activity</h3>
      {isLoading ? (
        <div className="flex justify-center py-4">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 h-10 w-10"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
