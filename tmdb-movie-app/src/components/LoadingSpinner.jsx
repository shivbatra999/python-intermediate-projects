import React from 'react';

/**
 * LoadingSpinner Component
 * A simple, reusable loading spinner with Tailwind CSS
 * 
 * @param {string} size - Size of the spinner: 'sm', 'md', 'lg', or 'xl'
 * @param {string} color - Color of the spinner: 'blue', 'white', 'gray', 'red', 'green'
 * @param {string} text - Optional text to display below the spinner
 * @param {boolean} center - Whether to center the spinner on the page
 * @param {string} className - Additional CSS classes
 */
function LoadingSpinner({ 
  size = 'md', 
  color = 'blue', 
  text = '', 
  center = false,
  className = '' 
}) {
  // Size configurations
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  // Color configurations
  const colorClasses = {
    blue: 'border-blue-600',
    white: 'border-white',
    gray: 'border-gray-600',
    red: 'border-red-600',
    green: 'border-green-600',
    yellow: 'border-yellow-600',
    purple: 'border-purple-600'
  };

  // Text size based on spinner size
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const spinnerClasses = `
    animate-spin 
    rounded-full 
    border-2 
    border-t-transparent 
    ${sizeClasses[size]} 
    ${colorClasses[color]}
  `.trim();

  const containerClasses = `
    ${center ? 'flex items-center justify-center min-h-64' : 'flex items-center'}
    ${className}
  `.trim();

  return (
    <div className={containerClasses}>
      <div className={center ? 'text-center' : 'flex items-center'}>
        {/* Spinner */}
        <div 
          className={spinnerClasses}
          role="status"
          aria-label={text || 'Loading...'}
        >
          <span className="sr-only">{text || 'Loading...'}</span>
        </div>
        
        {/* Optional text */}
        {text && (
          <span className={`
            ${center ? 'mt-4 block' : 'ml-3'} 
            ${textSizeClasses[size]} 
            text-gray-600
          `}>
            {text}
          </span>
        )}
      </div>
    </div>
  );
}

// Preset spinner components for common use cases
LoadingSpinner.Page = ({ text = 'Loading...', className = '' }) => (
  <LoadingSpinner 
    size="lg" 
    color="blue" 
    text={text} 
    center={true} 
    className={`min-h-screen bg-gray-50 ${className}`}
  />
);

LoadingSpinner.Button = ({ text = '', className = '' }) => (
  <LoadingSpinner 
    size="sm" 
    color="white" 
    text={text} 
    className={className}
  />
);

LoadingSpinner.Card = ({ text = 'Loading...', className = '' }) => (
  <LoadingSpinner 
    size="md" 
    color="blue" 
    text={text} 
    center={true} 
    className={`py-12 ${className}`}
  />
);

LoadingSpinner.Inline = ({ size = 'sm', color = 'blue', className = '' }) => (
  <LoadingSpinner 
    size={size} 
    color={color} 
    className={className}
  />
);

export default LoadingSpinner;
