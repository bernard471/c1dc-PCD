'use client';

import Link from 'next/link';
import { ArrowLeft, ShieldX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4">
      {/* Background gradients & glowing blobs - similar to HeroSection */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Subtle radial light burst */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-radial from-blue-200/30 via-transparent to-transparent blur-3xl rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-radial from-indigo-200/30 via-transparent to-transparent blur-3xl rounded-full" />

        {/* Layered blurred blobs */}
        <div className="absolute top-[10%] right-[15%] w-[400px] h-[400px] bg-gradient-to-br from-purple-400 via-indigo-600 to-transparent opacity-30 rounded-full blur-[120px] rotate-45" />
        <div className="absolute top-[40%] left-[5%] w-[300px] h-[300px] bg-gradient-to-tr from-blue-400 via-cyan-600 to-transparent opacity-40 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {/* Icon container with bubble effect - similar to FeaturesSection */}
          <div className="relative mx-auto bg-white p-6 rounded-full w-32 h-32 flex items-center justify-center shadow-xl mb-6">
            {/* Decorative bubbles */}
            <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-indigo-400 opacity-20"></div>
            <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-blue-500 opacity-10"></div>
            
            <ShieldX className="h-16 w-16 text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold font-serif text-gray-900 leading-tight mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              404 - Page Not Found
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            We couldn`&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <Link 
              href="/" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-300 hover:scale-105 flex items-center"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
