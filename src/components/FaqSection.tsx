'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, MessageCircle, HelpCircle, Lightbulb, Shield } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: 'general' | 'security' | 'account' | 'technical';
}

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // FAQ data with categories
  const faqItems: FaqItem[] = [
    {
      question: "How does the cybersecurity dashboard protect my digital life?",
      answer: "Our dashboard provides a comprehensive overview of your security status across all devices and accounts. It continuously monitors for threats, alerts you to vulnerabilities, and provides actionable recommendations to enhance your protection. The system runs regular security checks and updates its protection mechanisms to guard against the latest cyber threats.",
      category: 'general'
    },
    {
      question: "Is my personal data secure when using your platform?",
      answer: "Absolutely. We employ end-to-end encryption for all data transmission and storage. Your personal information is never shared with third parties without your explicit consent. We follow strict data protection protocols that comply with international standards, and our systems undergo regular security audits to ensure the highest level of protection for your data.",
      category: 'security'
    },
    {
      question: "What should I do if I suspect a security breach?",
      answer: "If you suspect a security breach, immediately access your dashboard and run a full security scan. Contact our support team through the emergency response channel available 24/7. We'll guide you through immediate steps to secure your accounts, assess the extent of any breach, and implement recovery measures to protect your digital identity and assets.",
      category: 'security'
    },
    {
      question: "Can I use the dashboard on multiple devices?",
      answer: "Yes, your subscription allows you to secure up to 5 devices simultaneously. This includes any combination of smartphones, tablets, laptops, and desktop computers. The dashboard synchronizes security status across all your devices, ensuring comprehensive protection regardless of which device you're using.",
      category: 'account'
    },
    {
      question: "How often are security features updated?",
      answer: "We release security updates on a weekly basis to address emerging threats. Major feature updates are deployed monthly, with critical security patches released immediately when necessary. Our team continuously monitors the threat landscape to ensure you're protected against the latest vulnerabilities and attack vectors.",
      category: 'technical'
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, mobile money payments, bank transfers, and selected cryptocurrency payments. All payment information is processed through secure, PCI-compliant systems. We never store your complete payment details on our servers, ensuring maximum financial security.",
      category: 'account'
    },
    {
      question: "Is there a money-back guarantee if I'm not satisfied?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not completely satisfied with our service within the first 30 days, simply contact our support team, and we'll process a full refund with no questions asked. We're confident in the value our service provides and want you to feel secure in your purchase decision.",
      category: 'general'
    },
    {
      question: "How do I get technical support if I encounter issues?",
      answer: "Technical support is available through multiple channels: live chat on the dashboard, email support, and phone support during business hours. Premium subscribers also get access to priority support with guaranteed response times. Our support team consists of certified security professionals who can assist with any technical issues you encounter.",
      category: 'technical'
    },
  ];

  // Filter FAQs based on search query and category
  const filteredFaqs = faqItems.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === null || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Category options with icons
  const categories = [
    { id: 'general', label: 'General', icon: <HelpCircle className="h-4 w-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="h-4 w-4" /> },
    { id: 'account', label: 'Account', icon: <MessageCircle className="h-4 w-4" /> },
    { id: 'technical', label: 'Technical', icon: <Lightbulb className="h-4 w-4" /> },
  ];

  // Toggle FAQ item
  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Focus search input
  const focusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-80"></div>
        <div className="absolute top-40 -left-20 w-60 h-60 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-80"></div>
        <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-80"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Got Questions?
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-3 sm:mb-4">
            Frequently Asked Questions
          </h2>
          
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
            Find answers to common questions about our cybersecurity solutions.
          </p>
        </motion.div>

        {/* Search and filter */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-all duration-200"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setSearchQuery('')}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeCategory === null
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveCategory(null)}
            >
              All Questions
            </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ accordion */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 ${
                  highlightedIndex === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseLeave={() => setHighlightedIndex(null)}
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-gray-900 text-sm sm:text-base pr-2">{faq.question}</span>
                  <span className="flex-shrink-0 ml-2">
                    {activeIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </span>
                </button>
                
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-4 text-gray-600 text-sm sm:text-base border-t border-gray-100 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 mb-4">
                <Search className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">We couldn&apos;t find any FAQs matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory(null);
                  focusSearch();
                }}
                className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
              >
                Clear filters and try again
              </button>
            </motion.div>
          )}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 sm:mt-16 text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-10 text-white shadow-lg"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Still have questions?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our team is just a message away. Get in touch with us for personalized assistance with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-colors shadow-sm">
              <a  href="#contact">
              Contact Support
              </a>
            </button>
            <button className="px-6 py-3 bg-blue-400  text-white rounded-lg font-medium hover:bg-blue-400 transition-colors cursor-pointer shadow-sm">
             <a  href="/auth/login">
              Try it out
              </a>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
