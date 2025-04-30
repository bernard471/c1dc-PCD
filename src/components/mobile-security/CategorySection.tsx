import React, { JSX, useState } from 'react';
import { 
  CheckCircle, ChevronDown, ChevronUp, ChevronRight} from 'lucide-react';
import { SecurityCategory, SecurityItem } from '@/data/mobileSecurityData';
import { toast } from "sonner";
import Image from 'next/image';

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
  // State for image gallery and zoom modal
  const [selectedImageItem, setSelectedImageItem] = useState<{itemId: string, imageIndex: number} | null>(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [expandedImageGallery, setExpandedImageGallery] = useState<string | null>(null);

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

  // Function to handle image click for zooming
  const handleImageClick = (itemId: string, imageIndex: number) => {
    setSelectedImageItem({ itemId, imageIndex });
    setIsImageZoomed(true);
  };
  
  // Function to close the zoomed image modal
  const handleCloseZoom = () => {
    setIsImageZoomed(false);
    // Reset selected image after animation completes
    setTimeout(() => setSelectedImageItem(null), 300);
  };

  // Handle section toggle with exclusive behavior
  const handleSectionToggle = (sectionId: string) => {
    // This will close all other sections when opening a new one
    toggleSection(sectionId);
  };

  // Handle item toggle with exclusive behavior
  const handleItemToggle = (itemId: string) => {
    // This will close all other items when opening a new one
    toggleItem(itemId);
  };

  // Toggle image gallery visibility
  const toggleImageGallery = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent item toggle from firing
    setExpandedImageGallery(expandedImageGallery === itemId ? null : itemId);
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
              <ChevronUp className="text-blue-500 h-5 w-5" />
            ) : (
              <ChevronDown className="text-blue-500 h-5 w-5" />
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
                    onClick={() => handleSectionToggle(section.id)}
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
                              onClick={() => handleItemToggle(item.id)}
                            >
                              <h4 className="font-medium text-gray-700 flex items-center">
                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2">
                                  {itemIndex + 1}
                                </span>
                                {item.title}
                              </h4>
                              {expandedItems[item.id] ? (
                                <ChevronUp className="text-blue-500 text-sm h-4 w-4" />
                              ) : (
                                <ChevronDown className="text-gray-400 text-sm h-4 w-4" />
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
                                
                                {/* Image gallery - only show if item has images */}
                                {item.images && item.images.length > 0 && (
                                  <div className="mt-4 mb-6">
                                    <div 
                                      className="flex items-center cursor-pointer hover:text-blue-600 transition-colors"
                                      onClick={(e) => toggleImageGallery(item.id, e)}
                                    >
                                      <ChevronRight className={`text-blue-500 mr-2 transition-transform ${
                                        expandedImageGallery === item.id ? 'transform rotate-90' : ''
                                      }`} />
                                      <h4 className="text-sm font-medium text-gray-700">
                                        Reference Images ({item.images.length})
                                      </h4>
                                    </div>
                                    
                                    {/* Stacked Image Gallery - Only shown when expanded for this specific item */}
                                    {expandedImageGallery === item.id && (
                                      <div className="relative h-64 mt-3 mb-4">
                                        <div className="absolute inset-0 overflow-x-auto pb-4 hide-scrollbar">
                                          <div className="flex space-x-4 px-2 py-2">
                                            {item.images.map((image, imageIndex) => (
                                              <div 
                                                key={imageIndex} 
                                                className={`
                                                  relative flex-shrink-0 w-56 h-56 rounded-lg overflow-hidden 
                                                  border-2 cursor-pointer transform transition-all duration-300
                                                  ${selectedImageItem?.itemId === item.id && selectedImageItem?.imageIndex === imageIndex 
                                                    ? 'border-blue-500 scale-105' 
                                                    : 'border-gray-200 hover:border-blue-300'}
                                                  ${imageIndex === 0 ? 'shadow-md' : 'shadow-sm'}
                                                `}
                                                style={{
                                                  transform: `translateY(${imageIndex * 8}px) rotate(${imageIndex % 2 === 0 ? -2 : 2}deg)`,
                                                  zIndex: item.images ? item.images.length - imageIndex : 0
                                                }}
                                                onClick={() => handleImageClick(item.id, imageIndex)}
                                              >
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 hover:opacity-100 transition-opacity">
                                                  <ChevronRight className="text-white text-2xl transform scale-150" />
                                                </div>
                                                <Image
                                                  src={image}
                                                  alt={`${item.title} reference image ${imageIndex + 1}`}
                                                  width={300}
                                                  height={300}
                                                  className="object-cover w-full h-full"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                                  <span className="text-white text-xs font-medium">Image {imageIndex + 1}</span>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                        
                                        {/* Improved scroll hint animation with chevron */}
                                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-white to-transparent w-12 h-12 flex items-center justify-center rounded-full animate-pulse">
                                          <ChevronRight className="h-6 w-6 text-blue-500" />
                                        </div>
                                      </div>
                                    )}
                                  </div>
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

      {/* Zoomed Image Modal */}
      {selectedImageItem !== null && (
        <div 
          className={`fixed inset-0 bg-black/80 z-50 flex items-center justify-center transition-opacity duration-300 ${isImageZoomed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={handleCloseZoom}
        >
          {(() => {
            // Find the current item
            let currentItem: SecurityItem | null = null;
            
            // Search through all sections to find the item
            for (const section of category.sections) {
              const foundItem = section.items.find(item => item.id === selectedImageItem.itemId);
              if (foundItem) {
                currentItem = foundItem;
                break;
              }
            }
            
            if (!currentItem?.images) return null;
            
            const currentImage = currentItem.images[selectedImageItem.imageIndex];
            
            return (
              <div 
                className={`relative max-w-4xl max-h-[90vh] transition-transform duration-300 ${isImageZoomed ? 'scale-100' : 'scale-90'}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={currentImage}
                  alt={`${currentItem.title} reference image ${selectedImageItem.imageIndex + 1}`}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[90vh] rounded-lg"
                />
                
                {/* Navigation controls */}
                <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4">
                  <button 
                    className="bg-white/20 hover:bg-white/40 rounded-full p-2 backdrop-blur-sm transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newIndex = selectedImageItem.imageIndex === 0 
                        ? (currentItem?.images?.length ?? 1) - 1 
                        : selectedImageItem.imageIndex - 1;
                      setSelectedImageItem({...selectedImageItem, imageIndex: newIndex});
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    className="bg-white/20 hover:bg-white/40 rounded-full p-2 backdrop-blur-sm transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newIndex = selectedImageItem.imageIndex === (currentItem?.images?.length ?? 1) - 1 
                        ? 0 
                        : selectedImageItem.imageIndex + 1;
                      setSelectedImageItem({...selectedImageItem, imageIndex: newIndex});
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Close button */}
                <button 
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2 backdrop-blur-sm transition-colors"
                  onClick={handleCloseZoom}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Image counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  {selectedImageItem.imageIndex + 1} / {currentItem.images.length}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* CSS for hiding scrollbars */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CategorySection;

