'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronRight, ChevronLeft, Quote } from 'lucide-react';

// Define the testimonial type
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  bgColor: string;
}

export default function TestimonialsSection() {
  // Sample testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CTO",
      company: "TechVision Inc.",
      content: "The cybersecurity solutions provided have transformed how we approach digital security. Our systems have never been more protected, and the team's responsiveness to emerging threats is unmatched.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      bgColor: "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "IT Director",
      company: "Global Finance Group",
      content: "After experiencing a security breach with our previous provider, switching to this service was the best decision we made. The proactive monitoring and rapid response capabilities have given us peace of mind.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      bgColor: "from-indigo-500 to-purple-600"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Security Manager",
      company: "HealthCare Solutions",
      content: "In the healthcare industry, data security is paramount. This team understands our unique challenges and has implemented customized solutions that meet our strict compliance requirements while keeping our systems secure.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/67.jpg",
      bgColor: "from-purple-500 to-pink-600"
    },
    {
      id: 4,
      name: "David Wilson",
      role: "CEO",
      company: "Retail Innovations",
      content: "The threat landscape for e-commerce is constantly evolving. Having a security partner that stays ahead of these threats has been invaluable. Their team is knowledgeable, responsive, and truly cares about our business.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      bgColor: "from-pink-500 to-red-600"
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Handle autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, testimonials.length]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  // Navigation functions
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToIndex = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section 
      id="testimonials" 
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background decorative elements - Adjusted for better mobile appearance */}
        <div className="absolute top-0 left-0 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium mb-3 sm:mb-4"
          >
            Client Success Stories
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-3 sm:mb-4"
          >
            What Our Clients Are Saying
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600"
          >
            Real feedback from organizations we&apos;ve helped secure against evolving cyber threats.
          </motion.p>
        </div>

        {/* 3D Testimonial Carousel - Adjusted for better mobile display */}
        <div className="relative h-[430px] sm:h-[500px] md:h-[400px] mb-8 sm:mb-10 md:mb-12">
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              index === activeIndex && (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.9, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -40 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0"
                >
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col md:flex-row">
                    {/* Left side - Image and info - Stacks on top for mobile */}
                    <div className={`w-full md:w-2/5 bg-gradient-to-br ${testimonial.bgColor} p-6 sm:p-8 flex flex-col justify-between text-white`}>
                      <div className="mb-4 sm:mb-6">
                        <Quote className="h-8 w-8 sm:h-10 sm:w-10 opacity-30 mb-3 sm:mb-4" />
                        <div className="flex space-x-1 mb-3 sm:mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 sm:h-5 sm:w-5 ${i < testimonial.rating ? 'text-yellow-300 fill-yellow-300' : 'text-gray-400'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="mr-3 sm:mr-4 h-12 w-12 sm:h-16 sm:w-16 rounded-full overflow-hidden border-2 border-white">
                          <Image 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-bold">{testimonial.name}</h4>
                          <p className="text-xs sm:text-sm opacity-90">{testimonial.role}</p>
                          <p className="text-xs opacity-80">{testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right side - Content */}
                    <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                      <p className="text-base sm:text-xl md:text-2xl font-serif text-gray-700 italic mb-4 sm:mb-6 leading-relaxed">
                        &quot;{testimonial.content}&quot;
                      </p>
                      
                      <div className="mt-auto flex justify-between items-center">
                        <div className="flex space-x-1 sm:space-x-2">
                          {testimonials.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => goToIndex(idx)}
                              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                                idx === activeIndex ? 'w-6 sm:w-8 bg-blue-600' : 'w-2 sm:w-2.5 bg-gray-300'
                              }`}
                              aria-label={`Go to testimonial ${idx + 1}`}
                            />
                          ))}
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={goToPrev}
                            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            aria-label="Previous testimonial"
                          >
                            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                          </button>
                          <button
                            onClick={goToNext}
                            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
                            aria-label="Next testimonial"
                          >
                            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
        
        {/* Floating cards - Adjusted grid for better mobile display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            index !== activeIndex && (
              <motion.div
                key={`card-${testimonial.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-md cursor-pointer"
                onClick={() => goToIndex(index)}
              >
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden mr-2 sm:mr-3">
                      <Image 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-gray-900">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                  <div className={`h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br ${testimonial.bgColor} flex items-center justify-center`}>
                    <Quote className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm line-clamp-3">&quot;{testimonial.content}&quot;</p>
                <div className="mt-2 sm:mt-3 flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </div>
      </div>
      
      {/* Add the required animation keyframes via a style tag */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
