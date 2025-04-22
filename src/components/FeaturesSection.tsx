import { 
  ShieldCheck, 
  Smartphone, 
  Wifi, 
  Home, 
  MessageCircle, 
  Users, 
  Mail, 
  UserCheck, 
  Package 
} from 'lucide-react';
import backgroundImage from '@/images/cyber-security-concept.png'; // Adjust the path as needed
import Link from 'next/link';


// Remove any direct font imports that might be causing issues

export default function FeaturesSection() {
  // Using the same navigation items structure from sidebar.tsx
  const features = [
    { 
      icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
      title: "Dashboard", 
      description: "Get a comprehensive overview of your security status and recommendations."
    },
    { 
      icon: <Smartphone className="h-8 w-8 text-blue-600" />,
      title: "Mobile Device Security", 
      description: "Protect your Android and iOS devices from malware, data breaches, and unauthorized access."
    },
    { 
      icon: <Wifi className="h-8 w-8 text-blue-600" />,
      title: "Wi-Fi Security", 
      description: "Secure your wireless networks with proper router configuration and access controls."
    },
    { 
      icon: <Home className="h-8 w-8 text-blue-600" />,
      title: "Home Network & IoT", 
      description: "Safeguard your smart home devices and create a secure connected environment."
    },
    { 
      icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
      title: "Communication Security", 
      description: "Ensure your digital communications remain private and protected from eavesdropping."
    },
    { 
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Social Media Security", 
      description: "Protect your online presence with robust account protection and privacy settings."
    },
    { 
      icon: <Mail className="h-8 w-8 text-blue-600" />,
      title: "Email Security", 
      description: "Defend against phishing, spam, and email-based attacks with advanced protection."
    },
    { 
      icon: <UserCheck className="h-8 w-8 text-blue-600" />,
      title: "Identity Protection", 
      description: "Prevent identity theft and secure your personal and financial information."
    },
    { 
      icon: <Package className="h-8 w-8 text-blue-600" />,
      title: "Recommended Solutions", 
      description: "Discover trusted security tools and services to enhance your digital protection."
    }
  ];

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
       
        <div className="text-center mb-16">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
        Features
        </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-blue-900 mb-4">
            Comprehensive Personal Cybersecurity Defense
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Our platform provides a complete security solution to protect your digital life across all devices and online activities.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-white justify-center to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
            >
              {/* Decorative bubbles */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-indigo-400 opacity-50 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-indigo-500 opacity-30 group-hover:scale-110 transition-transform duration-300"></div>
              
              {/* Icon container with bubble effect */}
              <div className="relative z-10 mb-6 bg-white p-4 rounded-full w-16 h-16 flex mx-auto shadow-md group-hover:shadow-lg group-hover:bg-blue-100 transition-all duration-300">
                <div className="text-blue-600 items-center justify-center text-center group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold items-center justify-center text-center text-gray-900 mb-3 relative z-10">
                {feature.title}
              </h3>
              
              <p className="text-gray-700 items-center justify-center text-center relative z-10 group-hover:text-gray-800 transition-colors duration-300">
                {feature.description}
              </p>
              
              {/* Subtle action indicator */}
              <div className="mt-4 flex items-center justify-center text-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                <span>Learn more</span>
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          ))}
        </div>


        {/* Feature highlight */}
        <div className="mt-20 bg-white rounded-xl shadow-xl overflow-hidden relative">
        {/* Background image */}
        <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: `url(${backgroundImage.src})`
        }}
      ></div>
        
        <div className="flex flex-col lg:flex-row relative z-10">
          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="inline-block mx-auto p-3 bg-indigo-100 rounded-lg text-blue-700 mb-4">
              <ShieldCheck className="h-8 w-8 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Complete Personal Cybersecurity System
            </h3>
            <p className="text-gray-600 mb-6">
              Our comprehensive approach to personal cybersecurity addresses all aspects of your digital life, from mobile devices to home networks, social media accounts to email communications.
            </p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Integrated security across all your devices</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Practical implementation strategies</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Curated security tools and recommendations</span>
              </li>
            </ul>
            <Link href="/dashboard" className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition-colors">
              Explore our security dashboard
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          <div className="lg:w-1/2 relative">
            {/* Background image for this section only */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
              style={{
                backgroundImage: `url(${backgroundImage.src})`
              }}
            ></div>
            
            <div className="h-64 lg:h-full w-full relative z-10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-4 bg-white rounded-full shadow-lg">
                  <div className="h-40 w-40 rounded-full bg-blue-600 flex items-center justify-center">
                    <ShieldCheck className="h-32 w-32 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
