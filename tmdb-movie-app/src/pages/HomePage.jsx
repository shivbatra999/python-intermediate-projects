import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { usePopularMovies } from '../hooks/useMovies';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get page number from URL params, default to 1
  const currentPage = parseInt(searchParams.get('page')) || 1;
  
  // Fetch popular movies data
  const { data, isLoading, error } = usePopularMovies(currentPage);
  
  // Handle page navigation
  const handlePageChange = (newPage) => {
    navigate(`/?page=${newPage}`);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">Loading popular movies...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 max-w-md mx-auto shadow-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-red-800 mb-2">
              Error Loading Movies
            </h2>
            <p className="text-sm sm:text-base text-red-600 mb-4">
              {error.message || 'Failed to load popular movies. Please try again later.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!data || !data.results || data.results.length === 0) {
    return (
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">No Movies Found</h2>
          <p className="text-sm sm:text-base text-gray-600">No popular movies are available at the moment.</p>
        </div>
      </div>
    );
  }

  const { results: movies, total_pages, page } = data;

  return (
    <main className="container mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
      {/* Page Header */}
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Popular Movies
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Discover the most popular movies right now. Page {page} of {total_pages.toLocaleString()}
        </p>
      </header>

      {/* Movies Grid */}
      <MovieGrid movies={movies} className="mb-8 sm:mb-12" />

      {/* Pagination */}
      {total_pages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={total_pages}
            onPageChange={handlePageChange}
            maxPages={500} // TMDB API limit
          />
        </div>
      )}

      {/* Results Info */}
      <footer className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500">
        Showing page {page} of {Math.min(total_pages, 500).toLocaleString()} pages
        {total_pages > 500 && (
          <span className="block mt-1">
            (Limited to first 500 pages due to API restrictions)
          </span>
        )}
      </footer>
    </main>
  );
};

export default HomePage;
