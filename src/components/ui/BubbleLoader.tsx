import React from 'react';

interface BubbleLoaderProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const BubbleLoader: React.FC<BubbleLoaderProps> = ({ 
  message = 'Loading...', 
  size = 'medium' 
}) => {
  // Size classes for the container and bubbles
  const sizeClasses = {
    small: {
      container: 'p-4',
      bubble: 'w-2 h-2',
      spacing: 'space-x-2',
    },
    medium: {
      container: 'p-8',
      bubble: 'w-4 h-4',
      spacing: 'space-x-3',
    },
    large: {
      container: 'p-12',
      bubble: 'w-5 h-5',
      spacing: 'space-x-4',
    }
  };

  const { container, bubble, spacing } = sizeClasses[size];

  return (
    <div className={`flex flex-col items-center justify-center ${container}`}>
      <div className={`flex ${spacing}`}>
        {/* Colorful bubbles */}
        <div 
          className={`${bubble} rounded-full bg-blue-500 animate-bounce`} 
          style={{ animationDelay: '0ms' }}
        ></div>
        <div 
          className={`${bubble} rounded-full bg-green-500 animate-bounce`} 
          style={{ animationDelay: '150ms' }}
        ></div>
        <div 
          className={`${bubble} rounded-full bg-yellow-500 animate-bounce`} 
          style={{ animationDelay: '300ms' }}
        ></div>
        <div 
          className={`${bubble} rounded-full bg-red-500 animate-bounce`} 
          style={{ animationDelay: '450ms' }}
        ></div>
        <div 
          className={`${bubble} rounded-full bg-purple-500 animate-bounce`} 
          style={{ animationDelay: '600ms' }}
        ></div>
      </div>
      {message && (
        <div 
          className={`mt-4 text-gray-600`}
          style={{ 
            fontWeight: 500,
            fontSize: size === 'small' ? '0.75rem' : size === 'medium' ? '0.875rem' : '1rem'
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default BubbleLoader;
