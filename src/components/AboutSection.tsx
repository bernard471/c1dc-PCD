'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Shield, Users, Clock } from 'lucide-react';
import aboutImage from '@/images/freebik.jpg'; // Adjust the path as needed

export default function AboutSection() {
  // Stats to display
  const stats = [
    { icon: <Shield className="h-6 w-6 text-blue-600" />, value: '99.9%', label: 'Protection Rate' },
    { icon: <Users className="h-6 w-6 text-blue-600" />, value: '10K+', label: 'Protected Users' },
    { icon: <Clock className="h-6 w-6 text-blue-600" />, value: '24/7', label: 'Support Available' },
  ];

  return (
    <section id="about" className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          {/* Image Column - Full width on mobile, half on desktop */}
          <motion.div 
            className="w-full lg:w-1/2 mb-10 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main image - Adjusted height for mobile */}
              <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={aboutImage}
                  alt="About Our Cybersecurity Mission"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Decorative elements - Hidden on very small screens */}
                <div className="absolute -bottom-3 -right-3 w-16 sm:w-24 h-16 sm:h-24 bg-blue-600 rounded-full opacity-20"></div>
                <div className="absolute -top-3 -left-3 w-20 sm:w-32 h-20 sm:h-32 bg-indigo-600 rounded-full opacity-10"></div>
              </div>
              
              {/* Floating card - Smaller on mobile, hidden on very small screens */}
              <div className="absolute -bottom-6 sm:-bottom-10 -right-4 sm:-right-10 bg-white p-3 sm:p-6 rounded-xl shadow-lg max-w-[200px] sm:max-w-[260px] hidden sm:block">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="h-2 sm:h-3 w-2 sm:w-3 bg-green-500 rounded-full"></div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Active Protection</p>
                </div>
                <div className="h-1.5 sm:h-2 w-full bg-gray-200 rounded-full mb-1">
                  <div className="h-1.5 sm:h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-[95%]"></div>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500">Your systems are protected and monitored 24/7</p>
              </div>
            </div>
          </motion.div>
          
          {/* Content Column - Full width on mobile, half on desktop */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium mb-4">
              About Us
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4 sm:mb-6">
              Protecting Your Digital Life Since <span className="text-blue-600">2008</span>
            </h2>
            
            <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
              We are a team of cybersecurity experts dedicated to providing comprehensive protection for individuals and businesses. Our mission is to make the digital world safer through education, advanced tools, and personalized security strategies.
            </p>
            
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">
              With over 15 years of experience in the cybersecurity industry, we&apos;ve helped thousands of clients secure their digital assets against evolving threats. Our approach combines cutting-edge technology with practical, easy-to-implement solutions.
            </p>
            
            {/* Stats Grid - 1 column on small mobile, 2 columns on larger screens */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-6 mb-6 sm:mb-8 max-w-xs mx-auto">
            {stats.map((stat, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-blue-100 p-3 sm:p-4 rounded-lg relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                {/* Decorative bubbles */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-indigo-400 opacity-20 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-blue-500 opacity-10 group-hover:scale-110 transition-transform duration-300"></div>
                
                <div className="flex items-center justify-center text-center space-x-2 sm:space-x-3 mb-1 sm:mb-2 relative z-10">
                    <div className="p-1.5 sm:p-2 text-center bg-white rounded-full shadow-sm bg-gradient-to-br from-blue-50 to-white">
                    {stat.icon}
                    </div>
                    <span className="text-xl sm:text-2xl font-bold  bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{stat.value}</span>
                </div>
                <p className="text-sm sm:text-base text-center text-gray-600 relative z-10">{stat.label}</p>
                </div>
            ))}
            </div>

            
            {/* CTA Button - Adjusted for mobile */}
            <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center sm:justify-start">
              Learn More About Our Team
              <svg className="ml-2 h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
