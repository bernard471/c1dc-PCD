'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, AlertTriangle, MessageSquare, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "sonner";

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCrimeReport, setShowCrimeReport] = useState(false);
  const [showScheduleMeeting, setShowScheduleMeeting] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [userName, setUserName] = useState('');
  const [meetingForm, setMeetingForm] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    numberOfEmployees: '',
    trainingType: 'basic',
    additionalNotes: ''
  });
  const [isSubmittingMeeting, setIsSubmittingMeeting] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // Close the chat when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowCrimeReport(false);
        setShowScheduleMeeting(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const generateDiscountCode = () => {
    if (!userName.trim()) {
      toast.error("Name Required", {
        description: "Please enter your name first to generate a discount code.",
      });
      return;
    }
    
    const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
    const code = `${userName.toUpperCase().substring(0, 4)}-${randomString}`;
    setGeneratedCode(code);
    
    toast.success("Discount Code Generated", {
      description: "Your discount code has been generated successfully!",
    });
  };

  const openWhatsApp = () => {
    // Replace with your company's WhatsApp number
    const phoneNumber = '+233552373603'; // Update with your actual number
    const message = encodeURIComponent('Hello, I would like to inquire about your cybersecurity services.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleMeetingFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMeetingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleScheduleMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingMeeting(true);

    try {
      // Here you would typically send the data to your backend API
      const response = await fetch('/api/schedule-meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingForm),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Meeting request successful:", data);
        toast.success("Meeting Request Submitted", {
          description: "We will contact you within 24 hours to confirm the details.",
          duration: 5000,
        });

        
        // Reset form
        setMeetingForm({
          organizationName: '',
          contactPerson: '',
          email: '',
          phone: '',
          preferredDate: '',
          preferredTime: '',
          numberOfEmployees: '',
          trainingType: 'basic',
          additionalNotes: ''
        });
        setShowScheduleMeeting(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit meeting request');
      }
    } catch (error) {
      console.error('Error submitting meeting request:', error);
      
      toast.error("Submission Failed", {
        description: error instanceof Error ? error.message : "Failed to submit meeting request. Please try again or contact us directly.",
        duration: 5000,
      });
    } finally {
      setIsSubmittingMeeting(false);
    }
  };

  const goBackToMain = () => {
    setShowCrimeReport(false);
    setShowScheduleMeeting(false);
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div ref={chatRef} className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-lg shadow-2xl overflow-hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
              <h3 className="font-bold text-lg">How can we help you?</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-white hover:bg-white/20 p-1 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {showScheduleMeeting ? (
                <motion.div
                  key="schedule-meeting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4"
                >
                  <button 
                    onClick={goBackToMain}
                    className="mb-2 text-blue-600 flex items-center text-sm hover:text-blue-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  
                  <h4 className="font-bold text-gray-800 mb-3">Schedule Training Meeting</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Book a consultation to discuss personal cyber defense training for your organization.
                  </p>
                  
                  <form onSubmit={handleScheduleMeeting} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Organization Name *
                        </label>
                        <input 
                          type="text" 
                          name="organizationName"
                          value={meetingForm.organizationName}
                          onChange={handleMeetingFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="Your organization"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Person *
                        </label>
                        <input 
                          type="text" 
                          name="contactPerson"
                          value={meetingForm.contactPerson}
                          onChange={handleMeetingFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="Your name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input 
                          type="email" 
                          name="email"
                          value={meetingForm.email}
                          onChange={handleMeetingFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={meetingForm.phone}
                          onChange={handleMeetingFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="+1234567890"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Date *
                        </label>
                        <input 
                          type="date" 
                          name="preferredDate"
                          value={meetingForm.preferredDate}
                          onChange={handleMeetingFormChange}
                          min={today}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Time *
                        </label>
                        <select 
                          name="preferredTime"
                          value={meetingForm.preferredTime}
                          onChange={handleMeetingFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          required
                        >
                          <option value="">Select time</option>
                          <option value="09:00">9:00 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="14:00">2:00 PM</option>
                          <option value="15:00">3:00 PM</option>
                          <option value="16:00">4:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Number of Employees
                        </label>
                        <select 
                          name="numberOfEmployees"
                          value={meetingForm.numberOfEmployees}
                          onChange={handleMeetingFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          <option value="">Select range</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-100">51-100 employees</option>
                          <option value="101-500">101-500 employees</option>
                          <option value="500+">500+ employees</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Training Type
                        </label>
                        <select 
                          name="trainingType"
                          value={meetingForm.trainingType}
                          onChange={handleMeetingFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          <option value="basic">Basic Cyber Defense</option>
                          <option value="advanced">Advanced Security</option>
                          <option value="executive">Executive Protection</option>
                          <option value="custom">Custom Training</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Notes
                      </label>
                      <textarea 
                        name="additionalNotes"
                        value={meetingForm.additionalNotes}
                        onChange={handleMeetingFormChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Any specific requirements or questions..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingMeeting}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                    >
                      {isSubmittingMeeting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </div>
                      ) : (
                        'Schedule Meeting'
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : showCrimeReport ? (
                <motion.div
                  key="crime-report"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4"
                >
                  <button 
                    onClick={goBackToMain}
                    className="mb-2 text-blue-600 flex items-center text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  
                  <h4 className="font-bold text-gray-800 mb-2">Report a Cyber Crime</h4>
                  
                  <div className="bg-gray-50 rounded-lg p-3 mb-4 max-h-48 overflow-y-auto text-sm">
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Click <a href="https://cyber1guard.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline">this link to cyber1guard.com</a></li>
                      <li>Create an account (Google recommended)</li>
                      <li>In your dashboard sidebar, search for the particular crime you want to report on and make a report</li>
                      <li>Add the generated code to the top of your description for discounted pricing</li>
                    </ol>
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <button
                    onClick={generateDiscountCode}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mb-2"
                  >
                    Generate Discount Code
                  </button>
                  
                  {generatedCode && (
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-2 text-center">
                      <p className="text-sm text-gray-600 mb-1">Your discount code:</p>
                      <p className="font-mono font-bold text-blue-800 select-all">{generatedCode}</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="options"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 space-y-3"
                >
                  <button
                    onClick={() => setShowScheduleMeeting(true)}
                    className="w-full flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-800">Schedule Training Meeting</p>
                      <p className="text-xs text-gray-500">Book cyber defense training for your organization</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setShowCrimeReport(true)}
                    className="w-full flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-800">Report a Cyber Crime</p>
                      <p className="text-xs text-gray-500">Follow steps to report an incident</p>
                    </div>
                  </button>
                  
                  <Link href="/#contact" className="w-full flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-800">Submit a Complaint</p>
                      <p className="text-xs text-gray-500">Contact our support team</p>
                    </div>
                  </Link>
                  
                  <button
                    onClick={openWhatsApp}
                    className="w-full flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-800">WhatsApp Us</p>
                      <p className="text-xs text-gray-500">Get instant support via WhatsApp</p>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full shadow-lg flex items-center justify-center ${
          isOpen ? 'bg-red-500' : 'bg-gradient-to-r from-green-600 to-green-600'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </motion.button>
    </div>
  );
}
