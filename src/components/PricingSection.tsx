'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Smartphone, Wifi, Home, MessageCircle, Users, Mail, UserCheck, Package } from 'lucide-react';
import BackgroundImage from '@/images/cyber1.png';


export default function PricingSection() {
  const [isHovered, setIsHovered] = useState(false);

  // Features included in the subscription
  const features = [
    { icon: <ShieldCheck className="h-5 w-5 text-blue-600" />, title: "Security Dashboard", description: "Complete overview of your security status" },
    { icon: <Smartphone className="h-5 w-5 text-blue-600" />, title: "Mobile Device Security", description: "Protection for Android and iOS devices" },
    { icon: <Wifi className="h-5 w-5 text-blue-600" />, title: "Wi-Fi Security", description: "Secure your wireless networks" },
    { icon: <Home className="h-5 w-5 text-blue-600" />, title: "Home Network & IoT", description: "Safeguard smart home devices" },
    { icon: <MessageCircle className="h-5 w-5 text-blue-600" />, title: "Communication Security", description: "Private and protected communications" },
    { icon: <Users className="h-5 w-5 text-blue-600" />, title: "Social Media Security", description: "Protect your online presence" },
    { icon: <Mail className="h-5 w-5 text-blue-600" />, title: "Email Security", description: "Defense against phishing and spam" },
    { icon: <UserCheck className="h-5 w-5 text-blue-600" />, title: "Identity Protection", description: "Prevent identity theft" },
    { icon: <Package className="h-5 w-5 text-blue-600" />, title: "Recommended Solutions", description: "Curated security tools and services" },
  ];

  return (
    <section 
      id="pricing" 
      className="py-12 sm:py-16 md:py-20 relative"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(243, 244, 246, 0.9), rgba(229, 231, 235, 0.9)), url(${BackgroundImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium mb-3 sm:mb-4"
          >
            Simple Pricing
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-3 sm:mb-4"
          >
            Comprehensive Protection at an Affordable Price
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600"
          >
            Secure your digital life with our all-inclusive cybersecurity solution.
          </motion.p>
        </div>

        {/* Pricing card */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Popular badge */}
            <div className="absolute -top-5 left-0 right-0 flex justify-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
                Most Popular
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 sm:p-8 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-1">Complete Protection</h3>
                    <p className="text-blue-100 text-sm sm:text-base">Full access to all security features</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl sm:text-4xl font-bold">₵300</div>
                    <div className="text-blue-100 text-sm">per year</div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="mb-6 sm:mb-8">
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Everything you need to stay secure online:</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {features.map((feature, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                            {feature.icon}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 text-sm sm:text-base">{feature.title}</h5>
                          <p className="text-gray-600 text-xs sm:text-sm">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 sm:pt-8">
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    <li className="flex items-center text-sm sm:text-base text-gray-700">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Full access to security dashboard</span>
                    </li>
                    <li className="flex items-center text-sm sm:text-base text-gray-700">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Regular security updates and alerts</span>
                    </li>
                    <li className="flex items-center text-sm sm:text-base text-gray-700">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Email support from security experts</span>
                    </li>
                    <li className="flex items-center text-sm sm:text-base text-gray-700">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Personalized security recommendations</span>
                    </li>
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 ${
                      isHovered 
                        ? 'bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md'
                    }`}
                  >
                    <a href="/payment">
                    Get Protected Now
                    </a>
                  </motion.button>
                  
                  <p className="text-center text-gray-500 text-xs sm:text-sm mt-4">
                    Secure payment via credit card or mobile money
                  </p>
                </div>
              </div>

              {/* Money-back guarantee */}
              <div className="bg-blue-50 p-4 text-center">
                <p className="text-sm sm:text-base text-gray-700 font-medium">
                  <span className="text-blue-600">30-day money-back guarantee</span> — Try risk-free
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 -bottom-6 -left-6 w-24 h-24 bg-blue-200 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-indigo-200 rounded-full opacity-50 blur-xl"></div>
          </motion.div>

          {/* Additional information */}
          <div className="mt-10 sm:mt-12 text-center">
            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Have questions?</h4>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
              Our team is ready to help you understand how our cybersecurity solution can protect your digital life. Contact us for more information or to discuss custom requirements.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="inline-flex items-center justify-center px-5 py-2.5 border border-blue-600 bg-blue-600 text-black rounded-lg font-medium hover:bg-blue-300 transition-colors">
              <a  href="#contact">
              Contact Sales
              </a>
              </button>
              <button className="inline-flex items-center justify-center px-5 py-2.5 border border-blue-600 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              <a  href="#faq">
                View FAQs
              </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
