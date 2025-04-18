'use client';

import Image from 'next/image';
import Link from 'next/link';
import HeroImage from '@/images/hero.webp';
import { motion } from 'framer-motion';

export default function HeroSection() {
  // Sample company logos - you would replace these with your actual logo imports
  const companyLogos = [
    { name: 'Microsoft', src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    { name: 'Google', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { name: 'Amazon', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'IBM', src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
    { name: 'Oracle', src: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-slate-50 via-white to-slate-100"
    >
      {/* Background gradients & glowing blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Subtle radial light burst */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-radial from-blue-200/30 via-transparent to-transparent blur-3xl rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-radial from-indigo-200/30 via-transparent to-transparent blur-3xl rounded-full" />

        {/* Layered blurred blobs */}
        <div className="absolute top-[10%] right-[15%] w-[400px] h-[400px] bg-gradient-to-br from-purple-400 via-indigo-600 to-transparent opacity-30 rounded-full blur-[120px] rotate-45" />
        <div className="absolute top-[40%] left-[5%] w-[300px] h-[300px] bg-gradient-to-tr from-blue-400 via-cyan-600 to-transparent opacity-40 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <motion.div
            className="md:w-1/2 md:pr-8 mb-12 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-serif text-gray-900 leading-tight mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Secure Your Digital World
              </span>
              <br />
              With Confidence
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Protect your business with cutting-edge cybersecurity solutions.
              Stay ahead of evolving threats with confidence and clarity.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="#get-started"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-300 hover:scale-105 text-center"
              >
                Get Started
              </Link>
              <Link
                href="#learn-more"
                className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 text-center"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="md:w-1/2 relative w-full" // Added w-full for mobile
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* Adjusted height for better mobile display */}
            <div className="relative h-[350px] md:h-[400px] lg:h-[500px] w-full drop-shadow-xl rounded-2xl overflow-hidden">
              <Image
                src={HeroImage}
                alt="Cyber Security Concept"
                fill
                className="object-contain md:object-contain rounded-2xl"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Floating Badge */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white shadow-xl rounded-xl p-4 hidden md:block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-sm text-center text-gray-500">Trusted by</p>
              <p className="text-xl font-bold text-blue-600">500+ Companies</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Logos */}
        <motion.div
          className="hidden mt-20 border-t border-gray-200 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <p className="text-center text-gray-500 mb-6">
            Trusted by leading companies worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {companyLogos.map((logo, idx) => (
              <div key={idx} className="h-8 w-24 relative">
                <Image 
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  width={96}
                  height={32}
                  className="object-contain h-full w-full grayscale-0 opacity-70 hover:opacity-100 hover:grayscale transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
