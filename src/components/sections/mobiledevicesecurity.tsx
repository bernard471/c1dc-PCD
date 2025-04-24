'use client';

import { useState, useEffect } from 'react';
import { 
  Smartphone, Clock, 
  Fingerprint, Shield, Lock, Key, Locate, Download, Folder, Settings,
  Wifi, Database, RefreshCw, Layers, Eye, FileText, Server, HardDrive,
  Mail, AtSign,
  Info
} from 'lucide-react';
import { androidSecurityData, iosSecurityData } from '@/data/mobileSecurityData';
import CategorySection from '@/components/mobile-security/CategorySection';
import { useSession } from 'next-auth/react';
import { BubbleLoader } from '@/components/ui/loaders';
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function MobileDeviceSecurity() {
  const [activeTab, setActiveTab] = useState('android');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [completedCategories, setCompletedCategories] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [categoryToComplete, setCategoryToComplete] = useState<string | null>(null);
  
  const { data: session } = useSession();
  
  // Fetch user's completed categories on component mount
  useEffect(() => {
    const fetchUserSecurityData = async () => {
      // Initialize expanded states
      const initialCategoryState: Record<string, boolean> = {};
      androidSecurityData.categories.forEach((category, index) => {
        initialCategoryState[category.id] = index === 0; // Only first category expanded
      });
      setExpandedCategories(initialCategoryState);
      
      const initialSectionState: Record<string, boolean> = {};
      androidSecurityData.categories.forEach((category, catIndex) => {
        category.sections.forEach((section, secIndex) => {
          initialSectionState[section.id] = catIndex === 0 && secIndex === 0;
        });
      });
      setExpandedSections(initialSectionState);
      
      const initialItemState: Record<string, boolean> = {};
      androidSecurityData.categories.forEach((category, catIndex) => {
        if (catIndex === 0) {
          category.sections.forEach((section, secIndex) => {
            if (secIndex === 0) {
              section.items.forEach((item, itemIndex) => {
                initialItemState[item.id] = itemIndex === 0;
              });
            }
          });
        }
      });
      setExpandedItems(initialItemState);
      
      if (!session?.user) {
        // If not logged in, try to get from localStorage
        const savedCompletedCategories = localStorage.getItem('completedSecurityCategories');
        if (savedCompletedCategories) {
          setCompletedCategories(JSON.parse(savedCompletedCategories));
        }
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch('/api/mobile-security');
        if (response.ok) {
          const data = await response.json();
          setCompletedCategories(data.completedCategories || {});
        } else {
          console.error('Failed to fetch mobile security data');
          // Fall back to localStorage if API fails
          const savedCompletedCategories = localStorage.getItem('completedSecurityCategories');
          if (savedCompletedCategories) {
            setCompletedCategories(JSON.parse(savedCompletedCategories));
          }
        }
      } catch (error) {
        console.error('Error fetching mobile security data:', error);
        // Fall back to localStorage if API fails
        const savedCompletedCategories = localStorage.getItem('completedSecurityCategories');
        if (savedCompletedCategories) {
          setCompletedCategories(JSON.parse(savedCompletedCategories));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserSecurityData();
  }, [session]);
  
  // Save completed categories to localStorage when they change
  useEffect(() => {
    localStorage.setItem('completedSecurityCategories', JSON.stringify(completedCategories));
  }, [completedCategories]);

  // Tab switching event handler
  useEffect(() => {
    const handleTabSwitch = (event: CustomEvent<{tab: string}>) => {
      const { tab } = event.detail;
      if (tab === 'android' || tab === 'ios') {
        setActiveTab(tab);
      }
    };

    window.addEventListener('switchMobileSecurityTab', handleTabSwitch as EventListener);
    return () => {
      window.removeEventListener('switchMobileSecurityTab', handleTabSwitch as EventListener);
    };
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      // Create a new object with all sections set to false
      const newState: Record<string, boolean> = {};
      Object.keys(prev).forEach(key => {
        newState[key] = false;
      });
      // Set the clicked section to the opposite of its current state
      newState[section] = !prev[section];
      return newState;
    });
  };
  
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      // Create a new object with all categories set to false
      const newState: Record<string, boolean> = {};
      Object.keys(prev).forEach(key => {
        newState[key] = false;
      });
      // Set the clicked category to the opposite of its current state
      newState[category] = !prev[category];
      return newState;
    });
  };
  
  const toggleItem = (item: string) => {
    setExpandedItems(prev => {
      // Create a new object with all items set to false
      const newState: Record<string, boolean> = {};
      Object.keys(prev).forEach(key => {
        newState[key] = false;
      });
      // Set the clicked item to the opposite of its current state
      newState[item] = !prev[item];
      return newState;
    });
  };
  
  const toggleCategoryCompletion = (categoryId: string, event: React.MouseEvent) => {
    // Prevent the category from expanding/collapsing when clicking the button
    event.stopPropagation();
    
    // If already completed, don't allow unmarking
    if (completedCategories[categoryId]) {
      toast("Already Completed", {
        description: "This category has already been marked as complete and cannot be changed.",
      });
      return;
    }
    
    if (!session?.user) {
      toast.error("Authentication Required", {
        description: "Please sign in to track your progress.",
      });
      return;
    }
    
    // Set the category to complete and open the confirmation dialog
    setCategoryToComplete(categoryId);
    setConfirmDialogOpen(true);
  };

  // Function to confirm category completion
  const confirmCategoryCompletion = async () => {
    if (categoryToComplete === null) return;
    
    // Add the category to completed list
    const newCompletedCategories = {
      ...completedCategories,
      [categoryToComplete]: true
    };
    
    // Update local state immediately for better UX
    setCompletedCategories(newCompletedCategories);
    
    // Close the dialog
    setConfirmDialogOpen(false);
    
    // Send update to the server if user is logged in
    if (session?.user) {
      try {
        const response = await fetch('/api/mobile-security', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completedCategories: newCompletedCategories }),
        });
        
        if (!response.ok) {
          // If server update fails, revert to previous state
          setCompletedCategories(completedCategories);
          toast.error("Update Failed", {
            description: "Failed to update your progress. Please try again.",
          });
        } else {
          toast.success("Category Completed", {
            description: "You've successfully completed this security category!",
          });
        }
      } catch (error) {
        console.error('Error updating security progress:', error);
        // Revert to previous state on error
        setCompletedCategories(completedCategories);
        toast.error("Update Failed", {
          description: "Failed to update your progress. Please try again.",
        });
      }
    } else {
      toast.success("Category Completed", {
        description: "You've successfully completed this security category! Sign in to sync across devices.",
      });
    }
  };

  // Get icon for category
  const getCategoryIcon = (categoryId: string) => {
    switch(categoryId) {
      case 'basic-security':
        return <Lock className="h-5 w-5 text-blue-600" />;
      case 'advanced-security':
        return <Shield className="h-5 w-5 text-purple-600" />;
      case 'app-security':
        return <Layers className="h-5 w-5 text-green-600" />;
      case 'data-protection':
        return <Database className="h-5 w-5 text-amber-600" />;
      case 'anti-theft':
        return <Locate className="h-5 w-5 text-red-600" />;
      case 'basic-security-ios':
        return <Lock className="h-5 w-5 text-blue-600" />;
      case 'advanced-security-ios':
        return <Shield className="h-5 w-5 text-purple-600" />;
      case 'data-protection-ios':
        return <Database className="h-5 w-5 text-amber-600" />;
      case 'communication-security':
        return <Smartphone className="h-5 w-5 text-green-600" />;
      case 'specialized-features':
        return <Key className="h-5 w-5 text-red-600" />;
      case 'mobile-security-overview':
        return <Smartphone className="h-8 w-8 text-blue-600" />;
      default:
        return <Settings className="h-5 w-5 text-gray-600" />;
    }
  };
  
  // Get icon for section
  const getSectionIcon = (sectionId: string) => {
    switch(sectionId) {
      case 'screen-lock':
        return <Lock className="h-5 w-5 text-blue-500" />;
      case 'biometric-security':
        return <Fingerprint className="h-5 w-5 text-blue-500" />;
      case 'google-account':
        return <Key className="h-5 w-5 text-blue-500" />;
      case 'find-device':
        return <Locate className="h-5 w-5 text-blue-500" />;
      case 'encryption':
        return <Key className="h-5 w-5 text-purple-500" />;
      case 'app-permissions':
        return <Eye className="h-5 w-5 text-purple-500" />;
      case 'developer-options':
        return <Settings className="h-5 w-5 text-purple-500" />;
      case 'network-security':
        return <Wifi className="h-5 w-5 text-purple-500" />;
      case 'system-updates':
        return <RefreshCw className="h-5 w-5 text-purple-500" />;
      case 'play-protect':
        return <Shield className="h-5 w-5 text-green-500" />;
      case 'app-installation':
        return <Download className="h-5 w-5 text-green-500" />;
      case 'app-updates':
        return <RefreshCw className="h-5 w-5 text-green-500" />;
      case 'app-vetting':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'google-backup':
        return <Server className="h-5 w-5 text-amber-500" />;
      case 'local-backup':
        return <HardDrive className="h-5 w-5 text-amber-500" />;
      case 'secure-folders':
        return <Folder className="h-5 w-5 text-amber-500" />;
      case 'lock-screen-info':
        return <Smartphone className="h-5 w-5 text-red-500" />;
      case 'anti-theft-apps':
        return <Shield className="h-5 w-5 text-red-500" />;
      case 'passcode-touchid':
        return <Fingerprint className="h-5 w-5 text-blue-500" />;
      case 'auto-lock-restrictions':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'icloud-security':
        return <Key className="h-5 w-5 text-blue-500" />;
      case 'find-my-iphone':
        return <Locate className="h-5 w-5 text-blue-500" />;
      case 'system-updates-ios':
        return <RefreshCw className="h-5 w-5 text-purple-500" />;
      case 'privacy-controls':
        return <Eye className="h-5 w-5 text-purple-500" />;
      case 'safari-security':
        return <Shield className="h-5 w-5 text-purple-500" />;
      case 'network-security-ios':
        return <Wifi className="h-5 w-5 text-purple-500" />;
      case 'app-security-ios':
        return <Layers className="h-5 w-5 text-purple-500" />;
      case 'icloud-backup':
        return <Server className="h-5 w-5 text-amber-500" />;
      case 'local-backup-ios':
        return <HardDrive className="h-5 w-5 text-amber-500" />;
      case 'secure-notes':
        return <FileText className="h-5 w-5 text-amber-500" />;
      case 'imessage-facetime':
        return <Smartphone className="h-5 w-5 text-green-500" />;
      case 'mail-settings':
        return <Mail className="h-5 w-5 text-green-500" />;
      case 'lockdown-mode':
        return <Shield className="h-5 w-5 text-red-500" />;
      case 'hide-email':
        return <AtSign className="h-5 w-5 text-red-500" />;
      case 'app-tracking':
        return <Eye className="h-5 w-5 text-red-500" />;
      default:
        return <Settings className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Calculate completion percentage based on completed categories
  const calculateAndroidPercentage = () => {
    const totalCategories = androidSecurityData.categories.length;
    const completedCount = androidSecurityData.categories
      .filter(category => completedCategories[category.id])
      .length;
    return Math.round((completedCount / totalCategories) * 100);
  };

  const calculateIOSPercentage = () => {
    const totalCategories = iosSecurityData.categories.length;
    const completedCount = iosSecurityData.categories
      .filter(category => completedCategories[category.id])
      .length;
    return Math.round((completedCount / totalCategories) * 100);
  };

  const androidPercentage = calculateAndroidPercentage();
  const iosPercentage = calculateIOSPercentage();
  
  if (isLoading) {
    return <BubbleLoader message="Loading security data..." size="medium" />;
  }
  
  return (
    <div className="space-y-6">
      <Toaster />
      
      {/* Header section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <Smartphone className="h-8 w-8 text-blue-600" />
          <h1 className="ml-3 text-2xl font-bold text-gray-900">Mobile Device Security</h1>
        </div>
        <p className="mt-2 text-gray-600">
            Comprehensive guidance to secure your mobile devices. 
            Protect your digital life with these best practices and recommendations.
          </p>
      </div>
      
      {/* Tabs for Android/iOS */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('android')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'android'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Android Security
            </button>
            <button
              onClick={() => setActiveTab('ios')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'ios'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              iOS Security
            </button>
          </nav>
        </div>
        
        {/* Android Security Content */}
        {activeTab === 'android' && (
          <div className="p-6">
            
            {/* Android security categories - using the extracted component */}
            <div className="space-y-4">
              {androidSecurityData.categories.map((category) => (
                <CategorySection
                  key={category.id}
                  category={category}
                  expandedCategories={expandedCategories}
                  expandedSections={expandedSections}
                  expandedItems={expandedItems}
                  completedCategories={completedCategories}
                  toggleCategory={toggleCategory}
                  toggleSection={toggleSection}
                  toggleItem={toggleItem}
                  toggleCategoryCompletion={toggleCategoryCompletion}
                  getCategoryIcon={getCategoryIcon}
                  getSectionIcon={getSectionIcon}
                  securityScore={androidPercentage}
                  isAuthenticated={!!session?.user}
                  onConfirmCompletion={confirmCategoryCompletion}
                  setConfirmDialogOpen={setConfirmDialogOpen}
                  setCategoryToComplete={setCategoryToComplete}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* iOS Security Content */}
        {activeTab === 'ios' && (
          <div className="p-6">
            
            {/* iOS security categories - using the extracted component */}
            <div className="space-y-4">
              {iosSecurityData.categories.map((category) => (
                <CategorySection
                  key={category.id}
                  category={category}
                  expandedCategories={expandedCategories}
                  expandedSections={expandedSections}
                  expandedItems={expandedItems}
                  completedCategories={completedCategories}
                  toggleCategory={toggleCategory}
                  toggleSection={toggleSection}
                  toggleItem={toggleItem}
                  toggleCategoryCompletion={toggleCategoryCompletion}
                  getCategoryIcon={getCategoryIcon}
                  getSectionIcon={getSectionIcon}
                  securityScore={iosPercentage}
                  isAuthenticated={!!session?.user}
                  onConfirmCompletion={confirmCategoryCompletion}
                  setConfirmDialogOpen={setConfirmDialogOpen}
                  setCategoryToComplete={setCategoryToComplete}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Recent activity feed */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start">
          <Info className="text-blue-500 mt-1 mr-3 h-5 w-5" />
          <div>
            <h3 className="font-medium text-gray-800 mb-1">Mobile Security Best Practices</h3>
            <p className="text-gray-600 text-sm">
              Remember to regularly review and update your mobile security measures. Mobile threats evolve rapidly, 
              and new vulnerabilities are discovered frequently. Stay informed about security news 
              related to your devices and implement updates promptly.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        title="Confirm Security Category Completion"
        description="Before marking this category as complete, please ensure you have:"
        items={[
          { text: "Read through all items in this category" },
          { text: "Understood the security recommendations" },
          { text: "Implemented the necessary security measures" },
          { text: "Tested that your implementation works correctly" }
        ]}
        warningText="Once marked as complete, this action cannot be undone."
        cancelText="Cancel"
        confirmText="I Have Completed This Category"
        onConfirm={confirmCategoryCompletion}
      />
    </div>
  );
}

