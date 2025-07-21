import React from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useSearchMovies } from '../hooks/useMovies';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';

/**
 * Search Results Page Component
 * Displays search results based on URL query parameters (q and page)
 * Uses the useSearchMovies hook for data fetching
 */
function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const query = searchParams.get('q') || '';
  const currentPage = parseInt(searchParams.get('page')) || 1;
  
  // Fetch search results using the custom hook
  const { 
    data: searchResults, 
    isLoading, 
    error
  } = useSearchMovies(query, currentPage);

  // Handle page navigation
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    navigate(`/search?${params.toString()}`);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="flex items-center justify-center min-h-32 sm:min-h-64">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-sm sm:text-lg text-gray-600">Searching for movies...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 text-center shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-red-800 mb-2">Search Error</h2>
          <p className="text-sm sm:text-base text-red-600 mb-4">{error.message}</p>
          <Link 
            to="/" 
            className="inline-block bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // No query provided
  if (!query.trim()) {
    return (
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6 text-center shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-yellow-800 mb-2">No Search Query</h2>
          <p className="text-sm sm:text-base text-yellow-600 mb-4">Please enter a search term to find movies.</p>
          <Link 
            to="/" 
            className="inline-block bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
      {/* Search Header */}
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Search Results
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
          Found {searchResults?.total_results || 0} results for "
          <span className="font-semibold text-gray-900">{query}</span>"
        </p>
      </header>

      {/* Results */}
      {searchResults?.results?.length > 0 ? (
        <>
          {/* Movies Grid */}
          <MovieGrid movies={searchResults.results} className="mb-8 sm:mb-12" />

          {/* Pagination */}
          {searchResults.total_pages > 1 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={searchResults.total_pages}
                onPageChange={handlePageChange}
                maxPages={500} // TMDB API limit
              />
            </div>
          )}
        </>
      ) : (
        /* No Results */
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 sm:p-8 text-center shadow-lg" aria-label="No search results">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-400" aria-hidden="true">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Movies Found</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            No results found for "<span className="font-semibold">{query}</span>". Try searching with different keywords.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Browse Popular Movies
          </Link>
        </section>
      )}
    </main>
  );
}

export default SearchPage;
