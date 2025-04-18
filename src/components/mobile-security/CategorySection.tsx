import React, { JSX } from 'react';
import { 
  CheckCircle, ChevronDown, ChevronUp} from 'lucide-react';
import { SecurityCategory } from '@/data/mobileSecurityData';
import { toast } from "sonner";

interface CategorySectionProps {
  category: SecurityCategory;
  expandedCategories: Record<string, boolean>;
  expandedSections: Record<string, boolean>;
  expandedItems: Record<string, boolean>;
  completedCategories: Record<string, boolean>;
  toggleCategory: (category: string) => void;
  toggleSection: (section: string) => void;
  toggleItem: (item: string) => void;
  toggleCategoryCompletion: (categoryId: string, event: React.MouseEvent) => void;
  getCategoryIcon: (categoryId: string) => JSX.Element;
  getSectionIcon: (sectionId: string) => JSX.Element;
  securityScore: number;
  isAuthenticated: boolean;
  onConfirmCompletion: (categoryId: string) => void;
  setConfirmDialogOpen: (open: boolean) => void;
  setCategoryToComplete: (categoryId: string | null) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  expandedCategories,
  expandedSections,
  expandedItems,
  completedCategories,
  toggleCategory,
  toggleSection,
  toggleItem,
  getCategoryIcon,
  getSectionIcon,
  securityScore,
  isAuthenticated,
  setConfirmDialogOpen,
  setCategoryToComplete
}) => {
  // Function to handle initiating the completion process
  const handleCategoryCompletion = (categoryId: string, e: React.MouseEvent) => {
    // Prevent the category from expanding/collapsing when clicking the button
    e.stopPropagation();
    
    // If already completed, don't allow unmarking
    if (completedCategories[categoryId]) {
      toast("Already Completed", {
        description: "This category has already been marked as complete and cannot be changed.",
      });
      return;
    }
    
    if (!isAuthenticated) {
      toast.error("Authentication Required", {
        description: "Please sign in to track your progress.",
      });
      return;
    }
    
    // Set the category to complete and open the confirmation dialog
    setCategoryToComplete(categoryId);
    setConfirmDialogOpen(true);
  };

  return (
    <div className="">
      {/* Security Score Card */}
      {(category.id === 'basic-security' || category.id === 'basic-security-ios') && (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">

          {/* Security score card */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-blue-800">Overall Security Score</h3>
              <span className="text-lg font-bold text-blue-700">{securityScore}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  securityScore >= 80 ? 'bg-green-500' : 
                  securityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${securityScore}%` }}
              ></div>
            </div>
            <p className="mt-2 text-xs text-blue-700">
              {securityScore >= 80 ? 'Your mobile device is well secured. Keep up the good work!' : 
              securityScore >= 60 ? 'Your mobile security is adequate but could be improved.' : 
              'Your mobile security needs attention. Address the security issues below.'}
            </p>
          </div>
        </div>
      )}

      <div 
        key={category.id} 
        id={`mobile-category-${category.id}`}
        className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mb-2"
      >
        {/* Category Header */}
        <div 
          className={`flex items-center justify-between p-4 cursor-pointer ${
            expandedCategories[category.id] ? 'bg-blue-50' : 'bg-gray-50'
          }`}
          onClick={() => toggleCategory(category.id)}
        >
          <div className="flex items-center space-x-3">
            {getCategoryIcon(category.id)}
            <h2 className="md:text-xl text-sm font-semibold text-gray-800">{category.title}</h2>
            {completedCategories[category.id] && (
              <CheckCircle className="text-green-500 h-5 w-5" />
            )}
          </div>
          <div className="flex items-center">
            {expandedCategories[category.id] ? (
              <ChevronDown className="text-blue-500 h-5 w-5" />
            ) : (
              <ChevronUp className="text-blue-500 h-5 w-5" />
            )}
            {/* Mark Complete Button */}
            <button 
              className={`ml-4 px-3 py-1 text-xs font-medium rounded-md ${
                completedCategories[category.id] 
                  ? 'bg-green-100 text-green-800 cursor-default' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={(e) => handleCategoryCompletion(category.id, e)}
            >
              {completedCategories[category.id] ? 'Completed' : 'Mark Complete'}
            </button>
          </div>
        </div>
        
        {/* Category Content */}
        {expandedCategories[category.id] && (
          <div className="p-4 bg-white">
            <div className="space-y-4">
              {category.sections.map((section) => (
                <div 
                  key={section.id}
                  className="border border-gray-200 rounded-md overflow-hidden"
                >
                  {/* Section Header */}
                  <div 
                    className={`flex items-center justify-between p-3 cursor-pointer ${
                      expandedSections[section.id] ? 'bg-blue-100' : 'bg-gray-50'
                    }`}
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="flex items-center space-x-3">
                      {getSectionIcon(section.id)}
                      <h3 className="font-medium text-gray-800">{section.title}</h3>
                    </div>
                    <div className="flex items-center">
                      {expandedSections[section.id] ? (
                        <ChevronUp className="text-blue-500 h-4 w-4" />
                      ) : (
                        <ChevronDown className="text-blue-500 h-4 w-4" />
                      )}
                    </div>
                  </div>

                  {/* Section Content */}
                  {expandedSections[section.id] && (
                    <div className="p-3 bg-white">
                      <div className="space-y-3 pl-2">
                        {section.items.map((item, itemIndex) => (
                          <div key={item.id} className="border-l-2 border-blue-200 pl-4 py-1">
                            <div 
                              className="flex items-center justify-between cursor-pointer"
                              onClick={() => toggleItem(item.id)}
                            >
                              <h4 className="font-medium text-gray-700 flex items-center">
                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2">
                                  {itemIndex + 1}
                                </span>
                                {item.title}
                              </h4>
                              {expandedItems[item.id] ? (
                                <ChevronDown className="text-blue-500 text-sm h-4 w-4" />
                              ) : (
                                <ChevronUp className="text-gray-400 text-sm h-4 w-4" />
                              )}
                            </div>
                            
                            {expandedItems[item.id] && (
                              <div className="mt-2 space-y-2">
                                <p className="text-gray-600">{item.description}</p>
                                
                                {item.steps && item.steps.length > 0 && (
                                  <ul className="mt-2 space-y-1 text-gray-600">
                                    {item.steps.map((step, stepIndex) => (
                                      <li key={stepIndex} className="flex items-start">
                                        <span className="text-blue-500 mr-2 mt-1">•</span>
                                        <span>{step}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
