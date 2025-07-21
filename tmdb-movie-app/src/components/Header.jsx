import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

/**
 * Header component with app title and search functionality
 * Features:
 * - App title/logo on the left (links to home)
 * - Search input on the right with submit functionality
 * - Responsive design for mobile and desktop
 * - Accessible search input with aria-label
 */
function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  /**
   * Handle search form submission
   * Navigates to /search route with query parameter
   */
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    
    if (trimmedQuery) {
      // Navigate to search page with query parameter
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      // Optional: Clear search input after navigation
      // setSearchQuery('');
    }
  };

  /**
   * Handle input change
   */
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  /**
   * Handle clear search
   */
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Left side - App Title/Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-white hover:text-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 rounded-lg p-1"
              aria-label="MovieDB - Go to homepage"
            >
              {/* Movie icon */}
              <svg 
                className="w-6 h-6 sm:w-8 sm:h-8" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" 
                  clipRule="evenodd" 
                />
              </svg>
              
              {/* App title */}
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
                  MovieDB
                </h1>
                <p className="text-xs text-blue-100 hidden lg:block">
                  Discover Amazing Movies
                </p>
              </div>
            </Link>
          </div>

          {/* Right side - Search */}
          <div className="flex items-center ml-2">
            <form 
              onSubmit={handleSearchSubmit}
              className="relative"
              role="search"
              aria-label="Movie search"
            >
              <div className="relative">
                {/* Search input */}
                <input
                  type="search"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder="Search movies..."
                  aria-label="Search for movies"
                  className="w-32 sm:w-48 lg:w-64 px-3 sm:px-4 py-1.5 sm:py-2 pr-8 sm:pr-12 text-sm sm:text-base text-gray-900 bg-white border border-gray-300 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-500"
                />
                
                {/* Clear button (when there's text) */}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-7 sm:right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                    aria-label="Clear search"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                
                {/* Search button */}
                <button
                  type="submit"
                  className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                  aria-label="Submit search"
                >
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
