import React from 'react';

interface CircularBubbleLoaderProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const CircularBubbleLoader: React.FC<CircularBubbleLoaderProps> = ({ 
  message = 'Loading...', 
  size = 'medium' 
}) => {
  // Size classes for the container, bubbles, and text
  const sizeClasses = {
    small: {
      container: 'p-4',
      wrapper: 'h-12 w-12',
      bubble: 'w-3 h-3',
      centerBubble: 'w-4 h-4',
      text: 'text-xs mt-4'
    },
    medium: {
      container: 'p-8',
      wrapper: 'h-20 w-20',
      bubble: 'w-5 h-5',
      centerBubble: 'w-6 h-6',
      text: 'text-sm mt-6'
    },
    large: {
      container: 'p-12',
      wrapper: 'h-28 w-28',
      bubble: 'w-7 h-7',
      centerBubble: 'w-8 h-8',
      text: 'text-base mt-8'
    }
  };

  const { container, wrapper, bubble, centerBubble, text } = sizeClasses[size];

  return (
    <div className={`flex flex-col items-center justify-center ${container}`}>
      <div className={`relative ${wrapper}`}>
        {/* Bubbles arranged in a circle */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 ${bubble} rounded-full bg-blue-500 animate-pulse`}></div>
        <div 
          className={`absolute top-1/4 right-0 ${bubble} rounded-full bg-green-500 animate-pulse`} 
          style={{ animationDelay: '150ms' }}
        ></div>
        <div 
          className={`absolute bottom-0 right-1/4 ${bubble} rounded-full bg-yellow-500 animate-pulse`} 
          style={{ animationDelay: '300ms' }}
        ></div>
        <div 
          className={`absolute bottom-0 left-1/4 ${bubble} rounded-full bg-red-500 animate-pulse`} 
          style={{ animationDelay: '450ms' }}
        ></div>
        <div 
          className={`absolute top-1/4 left-0 ${bubble} rounded-full bg-purple-500 animate-pulse`} 
          style={{ animationDelay: '600ms' }}
        ></div>
        
        {/* Center bubble */}
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${centerBubble} rounded-full bg-blue-600 animate-ping`}
        ></div>
      </div>
      {message && <p className={`text-gray-600 font-medium ${text}`}>{message}</p>}
    </div>
  );
};

export default CircularBubbleLoader;
