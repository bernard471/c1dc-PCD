"use client";

import React, { useState, useEffect } from 'react';
import { emailSecurityData } from '../../data/emailSecurityData';
import { IconContext } from 'react-icons';
import { FaChevronDown, FaChevronRight, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { BubbleLoader } from '@/components/ui/loaders';
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import Image from 'next/image';

export function EmailSecurity() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [expandedItem, setExpandedItem] = useState<{category: number, item: number} | null>(null);
  const [expandedStep, setExpandedStep] = useState<{category: number, item: number, step: number} | null>(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [completedCategories, setCompletedCategories] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [categoryToComplete, setCategoryToComplete] = useState<number | null>(null);
  const [selectedImageItem, setSelectedImageItem] = useState<{itemIndex: number, stepIndex: number, imageIndex: number} | null>(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [expandedImageGallery, setExpandedImageGallery] = useState<{category: number, item: number, step: number} | null>(null);
  const { data: session } = useSession();

  // Fetch user's completed categories on component mount
  useEffect(() => {
    const fetchUserSecurityData = async () => {
      if (!session?.user) {
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch('/api/email-security');
        if (response.ok) {
          const data = await response.json();
          setCompletedCategories(data.completedCategories || []);
        } else {
          console.error('Failed to fetch email security data');
        }
      } catch (error) {
        console.error('Error fetching email security data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserSecurityData();
  }, [session]);

  // Calculate security score whenever completedCategories changes
  useEffect(() => {
    const totalCategories = emailSecurityData.length;
    const completedCount = completedCategories.length;
    const newScore = totalCategories > 0 ? Math.round((completedCount / totalCategories) * 100) : 0;
    setCurrentScore(newScore);
  }, [completedCategories]);

  // Listen for sidebar navigation events
  useEffect(() => {
    const handleExpandCategory = (event: CustomEvent) => {
      const { categoryIndex } = event.detail;
      setExpandedCategory(categoryIndex);
      setExpandedItem(null);
      setExpandedStep(null);
      
      // Scroll to the category
      const categoryElement = document.getElementById(`email-security-category-${categoryIndex}`);
      if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Add event listener
    window.addEventListener('expandEmailSecurityCategory', handleExpandCategory as EventListener);

    // Clean up
    return () => {
      window.removeEventListener('expandEmailSecurityCategory', handleExpandCategory as EventListener);
    };
  }, []);

  const toggleCategory = (index: number) => {
    setExpandedCategory(expandedCategory === index ? null : index);
    setExpandedItem(null);
    setExpandedStep(null);
  };

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    if (expandedItem?.category === categoryIndex && expandedItem?.item === itemIndex) {
      setExpandedItem(null);
      setExpandedStep(null);
    } else {
      setExpandedItem({ category: categoryIndex, item: itemIndex });
      setExpandedStep(null);
    }
  };

  const toggleStep = (categoryIndex: number, itemIndex: number, stepIndex: number) => {
    if (
      expandedStep?.category === categoryIndex && 
      expandedStep?.item === itemIndex && 
      expandedStep?.step === stepIndex
    ) {
      setExpandedStep(null);
    } else {
      setExpandedStep({ category: categoryIndex, item: itemIndex, step: stepIndex });
    }
  };

  // Function to handle initiating the completion process
  const handleCategoryCompletion = (categoryIndex: number, e: React.MouseEvent) => {
    // Prevent the category from expanding/collapsing when clicking the button
    e.stopPropagation();
    
    // If already completed, don't allow unmarking
    if (completedCategories.includes(categoryIndex)) {
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
    setCategoryToComplete(categoryIndex);
    setConfirmDialogOpen(true);
  };

  // Function to confirm category completion
  const confirmCategoryCompletion = async () => {
    if (categoryToComplete === null) return;
    
    // Add the category to completed list
    const newCompletedCategories = [...completedCategories, categoryToComplete];
    
    // Update local state immediately for better UX
    setCompletedCategories(newCompletedCategories);
    
    // Close the dialog
    setConfirmDialogOpen(false);
    
    // Send update to the server
    try {
      const response = await fetch('/api/email-security', {
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
  };

  // Check if a category is completed
  const isCategoryCompleted = (categoryIndex: number) => {
    return completedCategories.includes(categoryIndex);
  };

// Update the handler function
const handleImageClick = (itemIndex: number, stepIndex: number, imageIndex: number) => {
  setSelectedImageItem({ itemIndex, stepIndex, imageIndex });
  setIsImageZoomed(true);
};
  
  const handleCloseZoom = () => {
    setIsImageZoomed(false);
    // Reset selected image after animation completes
    setTimeout(() => setSelectedImageItem(null), 300);
  };

  if (isLoading) {
    return <BubbleLoader message="Loading Email security data..." size="medium" />;
  }

  return (
    <div className="lg:p-6">
      <Toaster />
      <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
        <div className="flex items-center">
          <Mail className="h-8 w-8 text-blue-600" />
          <h1 className="ml-3 text-2xl font-bold text-gray-900">Email Security</h1>
        </div>
        <p className="mt-2 text-gray-600">
          Comprehensive guidance to secure your email accounts and protect your communications.
          Follow these best practices to safeguard your email privacy and prevent unauthorized access.
        </p>
        
        {/* Security score card */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-blue-800">Overall Security Score</h3>
            <span className="text-lg font-bold text-blue-700">{currentScore}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                currentScore >= 80 ? 'bg-green-500' : 
                currentScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${currentScore}%` }}
            ></div>
          </div>
          <p className="mt-2 text-xs text-blue-700">
            {currentScore >= 80 ? 'Your email accounts are well secured. Keep up the good work!' : 
            currentScore >= 60 ? 'Your email security is adequate but could be improved.' : 
            'Your email security needs attention. Address the issues below.'}
          </p>
        </div>
      </div>
      <div className="space-y-6">
        {emailSecurityData.map((category, categoryIndex) => (
          <div 
            key={categoryIndex}
            id={`email-security-category-${categoryIndex}`}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div 
              className={`flex items-center justify-between p-4 cursor-pointer ${
                expandedCategory === categoryIndex ? 'bg-blue-50' : 'bg-gray-50'
              }`}
              onClick={() => toggleCategory(categoryIndex)}
            >
              <div className="flex items-center space-x-3">
                <IconContext.Provider value={{ className: "text-blue-600 text-xl" }}>
                  <category.icon />
                </IconContext.Provider>
                <h2 className="md:text-xl text-sm font-semibold text-gray-800">{category.title}</h2>
                {isCategoryCompleted(categoryIndex) && (
                  <FaCheckCircle className="text-green-500 ml-2" />
                )}
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-3 hidden md:inline">{category.description}</span>
                {expandedCategory === categoryIndex ? (
                  <FaChevronDown className="text-blue-500" />
                ) : (
                  <FaChevronRight className="text-gray-400" />
                )}
                {/* Mark Complete Button */}
                <button 
                  className={`ml-4 px-3 py-1 text-xs font-medium rounded-md ${
                    isCategoryCompleted(categoryIndex) 
                      ? 'bg-green-100 text-green-800 cursor-default' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={(e) => handleCategoryCompletion(categoryIndex, e)}
                >
                  {isCategoryCompleted(categoryIndex) ? 'Completed' : 'Mark Complete'}
                </button>
              </div>
            </div>

            {expandedCategory === categoryIndex && (
              <div className="p-4 bg-white">
                <p className="text-gray-600 mb-4 md:hidden">{category.description}</p>
                
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className="border border-gray-200 rounded-md overflow-hidden"
                    >
                      <div 
                        className={`flex items-center justify-between p-3 cursor-pointer ${
                          expandedItem?.category === categoryIndex && expandedItem?.item === itemIndex 
                            ? 'bg-blue-100' 
                            : 'bg-gray-50'
                        }`}
                        onClick={() => toggleItem(categoryIndex, itemIndex)}
                      >
                        <div className="flex items-center space-x-3">
                          <IconContext.Provider value={{ className: "text-blue-500" }}>
                            <item.icon />
                          </IconContext.Provider>
                          <h3 className="font-medium text-gray-800">{item.title}</h3>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-3 hidden md:inline">{item.description}</span>
                          {expandedItem?.category === categoryIndex && expandedItem?.item === itemIndex ? (
                            <FaChevronDown className="text-blue-500" />
                          ) : (
                            <FaChevronRight className="text-gray-400" />
                          )}
                        </div>
                      </div>

                      {expandedItem?.category === categoryIndex && expandedItem?.item === itemIndex && (
                        <div className="p-3 bg-white">
                          <p className="text-gray-600 mb-3 md:hidden">{item.description}</p>
                          
                          <div className="space-y-3 pl-2">
                            {item.steps.map((step, stepIndex) => (
                              <div key={stepIndex} className="border-l-2 border-blue-200 pl-4 py-1">
                                <div 
                                  className="flex items-center justify-between cursor-pointer"
                                  onClick={() => toggleStep(categoryIndex, itemIndex, stepIndex)}
                                >
                                  <h4 className="font-medium text-gray-700 flex items-center">
                                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2">
                                      {stepIndex + 1}
                                    </span>
                                    {step.name}
                                  </h4>
                                  {expandedStep?.category === categoryIndex && 
                                   expandedStep?.item === itemIndex && 
                                   expandedStep?.step === stepIndex ? (
                                    <FaChevronDown className="text-blue-500 text-sm" />
                                  ) : (
                                    <FaChevronRight className="text-gray-400 text-sm" />
                                  )}
                                </div>
                                
                                {expandedStep?.category === categoryIndex && 
                                 expandedStep?.item === itemIndex && 
                                 expandedStep?.step === stepIndex && (
                                  <ul className="mt-2 space-y-1 text-gray-600">
                                    {step.details.map((detail, detailIndex) => (
                                      <li key={detailIndex} className="flex items-start">
                                        <span className="text-blue-500 mr-2 mt-1">•</span>
                                        <span>
                                          {typeof detail === 'string' ? detail : (
                                            <>
                                              {detail.text}
                                              {detail.link && (
                                                <a 
                                                  href={detail.link.url} 
                                                  target="_blank" 
                                                  rel="noopener noreferrer"
                                                  className="text-blue-600 hover:underline"
                                                >
                                                  {detail.link.label}
                                                </a>
                                              )}
                                              {/* Add a space before the additional text */}
                                              {" with proof of identity"}
                                            </>
                                          )}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                                   {/* Image gallery */}
                                  {step.images && step.images.length > 0 && (
                                    <div className="mt-4 mb-6">
                                      <div 
                                        className="flex items-center cursor-pointer hover:text-blue-600 transition-colors"
                                        onClick={(e) => {
                                          e.stopPropagation(); // Prevent step toggle from firing
                                          // Toggle the image visibility state for this specific step
                                          setExpandedImageGallery(prev => 
                                            prev?.category === categoryIndex && 
                                            prev?.item === itemIndex &&
                                            prev?.step === stepIndex ? null : { category: categoryIndex, item: itemIndex, step: stepIndex }
                                          );
                                        }}
                                      >
                                        <FaChevronRight className={`text-blue-500 mr-2 transition-transform ${
                                          expandedImageGallery?.category === categoryIndex && 
                                          expandedImageGallery?.item === itemIndex &&
                                          expandedImageGallery?.step === stepIndex ? 'transform rotate-90' : ''
                                        }`} />
                                        <h4 className="text-sm font-medium text-gray-700">
                                          Reference Images ({step.images.length})
                                        </h4>
                                      </div>
                                      
                                      {/* Stacked Image Gallery - Only shown when expanded for this specific step */}
                                      {expandedImageGallery?.category === categoryIndex && 
                                       expandedImageGallery?.item === itemIndex &&
                                       expandedImageGallery?.step === stepIndex && (
                                        <div className="relative h-64 mt-3 mb-4">
                                          <div className="absolute inset-0 overflow-x-auto pb-4 hide-scrollbar">
                                            <div className="flex space-x-4 px-2 py-2">
                                              {step.images.map((image, imageIndex) => (
                                                <div 
                                                  key={imageIndex} 
                                                  className={`
                                                    relative flex-shrink-0 w-56 h-56 rounded-lg overflow-hidden 
                                                    border-2 cursor-pointer transform transition-all duration-300
                                                    ${selectedImageItem?.stepIndex === stepIndex && selectedImageItem?.imageIndex === imageIndex 
                                                      ? 'border-blue-500 scale-105' 
                                                      : 'border-gray-200 hover:border-blue-300'}
                                                    ${imageIndex === 0 ? 'shadow-md' : 'shadow-sm'}
                                                  `}
                                                  style={{
                                                    transform: `translateY(${imageIndex * 8}px) rotate(${imageIndex % 2 === 0 ? -2 : 2}deg)`,
                                                    zIndex: step.images ? step.images.length - imageIndex : 0
                                                  }}
                                                  onClick={() => handleImageClick(itemIndex, stepIndex, imageIndex)}
                                                >
                                                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 hover:opacity-100 transition-opacity">
                                                    <FaChevronRight className="text-white text-2xl transform scale-150" />
                                                  </div>
                                                  <Image
                                                    src={image}
                                                    alt={`${step.name} reference image ${imageIndex + 1}`}
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
                                            <FaChevronRight className="h-6 w-6 text-blue-500" />
                                          </div>
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
        ))}
      </div>
    {/* Zoomed Image Modal */}
    {selectedImageItem !== null && (
      <div 
        className={`fixed inset-0 bg-black/80 z-50 flex items-center justify-center transition-opacity duration-300 ${isImageZoomed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleCloseZoom}
      >
        {(() => {
          // Get the current item and step
          const currentCategory = expandedCategory !== null ? emailSecurityData[expandedCategory] : null;
          const currentItem = currentCategory && expandedItem 
            ? currentCategory.items[expandedItem.item] 
            : null;
          
          if (!currentItem) return null;
          
          const currentStep = currentItem.steps[selectedImageItem.stepIndex];
          if (!currentStep?.images) return null;
          
          const currentImage = currentStep.images[selectedImageItem.imageIndex];
          
          return (
            <div 
              className={`relative max-w-4xl max-h-[90vh] transition-transform duration-300 ${isImageZoomed ? 'scale-100' : 'scale-90'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentImage}
                alt={`${currentStep.name} reference image ${selectedImageItem.imageIndex + 1}`}
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
                      ? (currentStep?.images?.length ?? 1) - 1 
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
                    const newIndex = selectedImageItem.imageIndex === (currentStep?.images?.length ?? 1) - 1 
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
                {selectedImageItem.imageIndex + 1} / {currentStep.images.length}
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

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start">
          <FaInfoCircle className="text-blue-500 mt-1 mr-3" />
          <div>
            <h3 className="font-medium text-gray-800 mb-1">Email Security Best Practices</h3>
            <p className="text-gray-600 text-sm">
              Remember that email is inherently insecure unless proper security measures are implemented.
              Never share sensitive information via regular email, and always verify the sender before
              responding to requests for personal information or clicking on links. Regularly review your
              email security settings as providers frequently update their security features.
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

export default EmailSecurity;
