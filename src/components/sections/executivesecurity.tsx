"use client";

import React, { useState, useEffect } from 'react';
import { executiveSecurityData } from '../../data/executiveSecurityData';
import { IconContext } from 'react-icons';
import { FaChevronDown, FaChevronRight, FaInfoCircle, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';
import { Shield } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { BubbleLoader } from '@/components/ui/loaders';
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

export function ExecutiveSecurity() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [expandedItem, setExpandedItem] = useState<{category: number, item: number} | null>(null);
  const [expandedStep, setExpandedStep] = useState<{category: number, item: number, step: number} | null>(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [completedCategories, setCompletedCategories] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [categoryToComplete, setCategoryToComplete] = useState<number | null>(null);
  const { data: session } = useSession();

  // Fetch user's completed categories on component mount
  useEffect(() => {
    const fetchUserExecutiveSecurityData = async () => {
      if (!session?.user) {
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch('/api/executive-security');
        if (response.ok) {
          const data = await response.json();
          setCompletedCategories(data.completedCategories || []);
        } else {
          console.error('Failed to fetch executive security data');
        }
      } catch (error) {
        console.error('Error fetching executive security data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserExecutiveSecurityData();
  }, [session]);

  // Calculate security implementation score whenever completedCategories changes
  useEffect(() => {
    const totalCategories = executiveSecurityData.length;
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
      const categoryElement = document.getElementById(`executive-security-category-${categoryIndex}`);
      if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Add event listener
    window.addEventListener('expandExecutiveSecurityCategory', handleExpandCategory as EventListener);

    // Clean up
    return () => {
      window.removeEventListener('expandExecutiveSecurityCategory', handleExpandCategory as EventListener);
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
        description: "This security category has already been marked as complete and cannot be changed.",
      });
      return;
    }
    
    if (!session?.user) {
      toast.error("Authentication Required", {
        description: "Please sign in to track your security implementation progress.",
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
      const response = await fetch('/api/executive-security', {
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
          description: "Failed to update your security progress. Please try again.",
        });
      } else {
        toast.success("Security Category Completed", {
          description: "You've successfully completed this executive security category!",
        });
      }
    } catch (error) {
      console.error('Error updating executive security progress:', error);
      // Revert to previous state on error
      setCompletedCategories(completedCategories);
      toast.error("Update Failed", {
        description: "Failed to update your security progress. Please try again.",
      });
    }
  };

  // Check if a category is completed
  const isCategoryCompleted = (categoryIndex: number) => {
    return completedCategories.includes(categoryIndex);
  };

  // Get priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Immediate':
        return 'bg-red-100 text-red-800';
      case 'Short-term':
        return 'bg-yellow-100 text-yellow-800';
      case 'Long-term':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get risk level color
  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <BubbleLoader message="Loading executive security data..." size="medium" />;
  }

  return (
    <div className="lg:p-6">
      <Toaster />
      <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="ml-3 text-2xl font-bold text-gray-900">Executive Security</h1>
        </div>
        <p className="mt-2 text-gray-600">
          Comprehensive security measures designed for high-profile individuals and executives. 
          These advanced protocols provide multi-layered protection against sophisticated threats.
        </p>
        
        {/* Security implementation progress card */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-blue-800">Security Implementation Progress</h3>
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
            {currentScore >= 80 ? 'Your executive security posture is comprehensive. Continue monitoring and updating.' : 
            currentScore >= 60 ? 'You\'ve implemented key security measures. Focus on remaining critical areas.' : 
            'Your security implementation requires immediate attention.'}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {executiveSecurityData.map((category, categoryIndex) => (
          <div 
            key={categoryIndex}
            id={`executive-security-category-${categoryIndex}`}
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
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <h2 className="md:text-xl text-sm font-semibold text-gray-800">{category.title}</h2>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full hidden md:inline ${getPriorityColor(category.priority)}`}>
                      {category.priority}
                    </span>
                  </div>
                </div>
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
                          <IconContext.Provider value={{ className: "text-red-500" }}>
                            <item.icon />
                          </IconContext.Provider>
                          <div className="flex flex-col">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium text-gray-800">{item.title}</h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskLevelColor(item.riskLevel)}`}>
                                {item.riskLevel}
                              </span>
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 hidden md:inline">
                                {item.implementationTime}
                              </span>
                            </div>
                          </div>
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
                                        <span>{detail}</span>
                                      </li>
                                    ))}
                                  </ul>
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

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start">
          <FaInfoCircle className="text-blue-500 mt-1 mr-3" />
          <div>
            <h3 className="font-medium text-gray-800 mb-1">Executive Security Best Practices</h3>
            <p className="text-gray-600 text-sm">
              Executive security requires a layered approach combining physical, digital, and operational security measures.
              Start with immediate and critical risk items, then build comprehensive protection over time.
              Regular threat assessments and security reviews are essential to maintain effectiveness.
              Coordinate with professional security services and law enforcement when appropriate.
              Remember that security is an ongoing process that must adapt to evolving threats.
            </p>
          </div>
        </div>
      </div>

      {/* Security Priority Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <div className="flex items-center mb-2">
            <FaShieldAlt className="text-red-600 mr-2" />
            <h4 className="font-medium text-red-800">Immediate Priority</h4>
          </div>
          <p className="text-sm text-red-700">
            {executiveSecurityData.filter(cat => cat.priority === 'Immediate').length} categories require immediate attention
          </p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <div className="flex items-center mb-2">
            <FaShieldAlt className="text-yellow-600 mr-2" />
            <h4 className="font-medium text-yellow-800">Short-term Priority</h4>
          </div>
          <p className="text-sm text-yellow-700">
            {executiveSecurityData.filter(cat => cat.priority === 'Short-term').length} categories for short-term implementation
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center mb-2">
            <FaShieldAlt className="text-green-600 mr-2" />
            <h4 className="font-medium text-green-800">Long-term Priority</h4>
          </div>
          <p className="text-sm text-green-700">
            {executiveSecurityData.filter(cat => cat.priority === 'Long-term').length} categories for long-term enhancement
          </p>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        title="Confirm Executive Security Category Completion"
        description="Before marking this security category as complete, please ensure you have:"
        items={[
          { text: "Reviewed all security measures in this category" },
          { text: "Implemented the necessary security protocols" },
          { text: "Coordinated with appropriate security professionals" },
          { text: "Tested and verified all security implementations" },
          { text: "Established ongoing monitoring and maintenance procedures" }
        ]}
        warningText="Executive security implementations should be verified by qualified security professionals. Once marked as complete, this action cannot be undone."
        cancelText="Cancel"
        confirmText="I Have Completed This Security Category"
        onConfirm={confirmCategoryCompletion}
      />
    </div>
  );
}

export default ExecutiveSecurity;
