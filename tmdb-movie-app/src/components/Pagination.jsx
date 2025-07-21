import React from 'react';

/**
 * Pagination Component
 * Provides Prev/Next navigation controls that adjust the ?page= URL parameter
 * 
 * @param {number} currentPage - Current active page number
 * @param {number} totalPages - Total number of pages available
 * @param {Function} onPageChange - Callback function when page changes
 * @param {number} maxPages - Maximum pages to allow (optional, for API limits)
 * @param {boolean} isLoading - Loading state for showing spinner
 * @param {string} className - Additional CSS classes
 */
function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  maxPages,
  isLoading = false,
  className = ''
}) {
  // Respect API limits if maxPages is set
  const effectiveTotalPages = maxPages ? Math.min(totalPages, maxPages) : totalPages;
  
  const handlePrevious = () => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < effectiveTotalPages && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  // Don't render if there's only one page or no pages
  if (effectiveTotalPages <= 1) {
    return null;
  }

  const isPrevDisabled = currentPage === 1 || isLoading;
  const isNextDisabled = currentPage >= effectiveTotalPages || isLoading;

  return (
    <nav 
      className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 ${className}`}
      aria-label="Pagination Navigation"
    >
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={isPrevDisabled}
        className="flex items-center px-4 sm:px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg hover:scale-105 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:shadow-md disabled:hover:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Go to previous page"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Prev</span>
      </button>

      {/* Page Info */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <span className="text-sm sm:text-base text-gray-600 font-medium whitespace-nowrap">
          <span className="sr-only">Current page </span>
          Page {currentPage} of {effectiveTotalPages.toLocaleString()}
        </span>
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center" role="status" aria-label="Loading new page">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
            <span className="ml-2 text-sm text-gray-500 hidden sm:inline">Loading...</span>
            <span className="sr-only">Loading new page</span>
          </div>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        className="flex items-center px-4 sm:px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg hover:scale-105 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:shadow-md disabled:hover:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Go to next page"
      >
        <span className="hidden sm:inline">Next</span>
        <span className="sm:hidden">Next</span>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}

export default Pagination;
