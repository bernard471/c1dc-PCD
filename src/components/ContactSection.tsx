'use client';

import { useState, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  Mail,  Phone,  MapPin,  Send,  CheckCircle,  AlertCircle,  Clock,  MessageSquare, User, AtSign, FileText } from 'lucide-react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';


export default function ContactSection() {
  // Form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    submitted: false,
    submitting: false,
    error: false
  });
  
  // Refs for animations
  const formRef = useRef<HTMLFormElement>(null);
  
  // Form field focus states for enhanced UI feedback
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formState.name || !formState.email || !formState.message) {
      setFormState(prev => ({ ...prev, error: true }));
      setTimeout(() => setFormState(prev => ({ ...prev, error: false })), 3000);
      return;
    }
    
    // Set submitting state
    setFormState(prev => ({ ...prev, submitting: true }));
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Success state
      setFormState(prev => ({ 
        ...prev, 
        submitting: false, 
        submitted: true 
      }));
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: '',
          submitted: false,
          submitting: false,
          error: false
        });
      }, 5000);
    }, 2000);
  };
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };





  return (
    <section id="contact" className="py-16 sm:py-20 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute top-40 -left-20 w-60 h-60 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Get In Touch
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-3 sm:mb-4">
            We&apos;d Love To Hear From You
          </h2>
          
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
            Have questions about our cybersecurity solutions? Reach out to our team for personalized assistance.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact information - Takes 2 columns on large screens */}
          <motion.div 
            className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 sm:p-8 text-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Contact Information</h3>
              <p className="text-blue-100 mb-6">Fill out the form and we will get back to you within 24 hours.</p>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3 sm:mr-4">
                    <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                    <p className="text-sm text-blue-100">Phone</p>
                    <p className="font-medium">+233 20 123 4567</p>
                    </div>
                </div>
                
                <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3 sm:mr-4">
                    <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                    <p className="text-sm text-blue-100">Email</p>
                    <p className="font-medium">support@cybersecure.com</p>
                    </div>
                </div>
                
                <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3 sm:mr-4">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                    <p className="text-sm text-blue-100">Address</p>
                    <p className="font-medium">123 Tech Avenue, Accra, Ghana</p>
                    </div>
                </div>
                
                <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3 sm:mr-4">
                    <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                    <p className="text-sm text-blue-100">Working Hours</p>
                    <p className="font-medium">Monday - Friday: 9am - 5pm</p>
                    </div>
                </div>
                </div>
            </div>
            
            {/* Social proof and map */}
            <div className="p-6 sm:p-8">
              <h4 className="font-semibold text-gray-900 mb-4">Connect With Us</h4>
              <div className="flex space-x-3 mb-6">
                    {/* Social media icons */}
                    <a 
                        href="#" 
                        className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-100 transition-colors"
                    >
                        <span className="sr-only">Facebook</span>
                        <Facebook className="h-5 w-5 text-gray-700" />
                    </a>
                    <a 
                        href="#" 
                        className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-100 transition-colors"
                    >
                        <span className="sr-only">Twitter</span>
                        <Twitter className="h-5 w-5 text-gray-700" />
                    </a>
                    <a 
                        href="#" 
                        className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-100 transition-colors"
                    >
                        <span className="sr-only">LinkedIn</span>
                        <Linkedin className="h-5 w-5 text-gray-700" />
                    </a>
                    <a 
                        href="#" 
                        className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-100 transition-colors"
                    >
                        <span className="sr-only">Instagram</span>
                        <Instagram className="h-5 w-5 text-gray-700" />
                    </a>
                    </div>
            </div>
          </motion.div>
          
          {/* Contact form - Takes 3 columns on large screens */}
          <motion.div 
            className="lg:col-span-3 bg-white rounded-2xl shadow-xl overflow-hidden relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Send Us A Message</h3>
              
              <AnimatePresence mode="wait">
                {formState.submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h4>
                    <p className="text-gray-600 mb-4">Thank you for reaching out. We&apos;ll get back to you shortly.</p>
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-green-500 rounded-full"
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 5, ease: "linear" }}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name field */}
                      <div className="relative">
                        <motion.div
                          className={`absolute left-3 top-3.5 text-gray-400 transition-all duration-300 ${
                            focusedField === 'name' || formState.name 
                              ? 'opacity-100' 
                              : 'opacity-70'
                          }`}
                          animate={focusedField === 'name' ? { scale: 1.1 } : { scale: 1 }}
                        >
                          <User className="h-5 w-5" />
                        </motion.div>
                        <input
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Your Name"
                          className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                            focusedField === 'name'
                              ? 'border-blue-300 ring-blue-100 bg-white'
                              : 'border-gray-200'
                          }`}
                          required
                        />
                      </div>
                      
                      {/* Email field */}
                      <div className="relative">
                        <motion.div
                          className={`absolute left-3 top-3.5 text-gray-400 transition-all duration-300 ${
                            focusedField === 'email' || formState.email 
                              ? 'opacity-100' 
                              : 'opacity-70'
                          }`}
                          animate={focusedField === 'email' ? { scale: 1.1 } : { scale: 1 }}
                        >
                          <AtSign className="h-5 w-5" />
                        </motion.div>
                        <input
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Your Email"
                          className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                            focusedField === 'email'
                              ? 'border-blue-300 ring-blue-100 bg-white'
                              : 'border-gray-200'
                          }`}
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Subject field */}
                    <div className="relative">
                      <motion.div
                        className={`absolute left-3 top-3.5 text-gray-400 transition-all duration-300 ${
                          focusedField === 'subject' || formState.subject 
                            ? 'opacity-100' 
                            : 'opacity-70'
                        }`}
                        animate={focusedField === 'subject' ? { scale: 1.1 } : { scale: 1 }}
                      >
                        <FileText className="h-5 w-5" />
                      </motion.div>
                      <input
                        type="text"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Subject"
                        className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                          focusedField === 'subject'
                            ? 'border-blue-300 ring-blue-100 bg-white'
                            : 'border-gray-200'
                        }`}
                      />
                    </div>
                    
                    {/* Message field */}
                    <div className="relative">
                      <motion.div
                        className={`absolute left-3 top-3.5 text-gray-400 transition-all duration-300 ${
                          focusedField === 'message' || formState.message 
                            ? 'opacity-100' 
                            : 'opacity-70'
                        }`}
                        animate={focusedField === 'message' ? { scale: 1.1 } : { scale: 1 }}
                      >
                        <MessageSquare className="h-5 w-5" />
                      </motion.div>
                      <textarea
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your Message"
                        rows={5}
                        className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                          focusedField === 'message'
                            ? 'border-blue-300 ring-blue-100 bg-white'
                            : 'border-gray-200'
                        }`}
                        required
                      />
                    </div>
                    
                    {/* Error message */}
                    <AnimatePresence>
                      {formState.error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center"
                        >
                          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                          <p className="text-sm">Please fill out all required fields.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Submit button */}
                    <div>
                      <motion.button
                        type="submit"
                        disabled={formState.submitting}
                        className={`w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 ${
                          formState.submitting ? 'opacity-80 cursor-not-allowed' : 'hover:-translate-y-1'
                        }`}
                        whileHover={{ scale: formState.submitting ? 1 : 1.02 }}
                        whileTap={{ scale: formState.submitting ? 1 : 0.98 }}
                      >
                        {formState.submitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            <span>Send Message</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                    
                    {/* Privacy note */}
                    <p className="text-xs text-center text-gray-500 mt-4">
                      By submitting this form, you agree to our <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and consent to being contacted regarding your inquiry.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full opacity-50 blur-xl"></div>
          </motion.div>
        </div>
        
        {/* FAQ teaser */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h3>
          <p className="text-gray-600 mb-6">
            Find quick answers to common questions about our services.
          </p>
          <a 
            href="#faq" 
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            View all FAQs
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </motion.div>
      </div>
      
      {/* CSS for grid pattern */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>
    </section>
  );
}

