import React from 'react';
import MovieCard from './MovieCard';

/**
 * MovieGrid Component
 * Renders a responsive grid of movie cards
 * 
 * @param {Array} movies - Array of movie objects from TMDB API
 * @param {string} className - Additional CSS classes for the grid container
 */
function MovieGrid({ movies, className = '' }) {
  if (!movies || movies.length === 0) {
    return (
      <section className="text-center py-8 sm:py-12" aria-label="No movies available">
        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-400" aria-hidden="true">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 6h6v12H9V6z" />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Movies Available</h3>
        <p className="text-sm sm:text-base text-gray-600">No movies to display at the moment.</p>
      </section>
    );
  }

  return (
    <section 
      className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 ${className}`}
      aria-label="Movies grid"
    >
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie}
        />
      ))}
    </section>
  );
}

export default MovieGrid;
