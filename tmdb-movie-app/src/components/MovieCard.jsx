import React from 'react';
import { Link } from 'react-router-dom';

/**
 * MovieCard Component
 * Displays individual movie information in a clickable card format
 * Links to movie detail page at /movie/{id}
 * 
 * @param {Object} movie - Movie object from TMDB API
 * @param {string} className - Additional CSS classes
 */
function MovieCard({ movie, className = '' }) {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image&bg=f3f4f6&color=9ca3af';
  };

  const formatYear = (dateString) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).getFullYear();
  };

  const formatRating = (rating) => {
    if (!rating || rating === 0) return null;
    return rating.toFixed(1);
  };

  return (
    <article>
      <Link 
        to={`/movie/${movie.id}`}
        className={`block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
        aria-label={`View details for ${movie.title}`}
      >
        {/* Movie Poster */}
        <div className="relative aspect-[2/3] bg-gray-200">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={`Movie poster for ${movie.title}${movie.release_date ? ` (${formatYear(movie.release_date)})` : ''}`}
            className="w-full h-full object-cover group-hover:opacity-95 transition-opacity duration-300"
            onError={handleImageError}
            loading="lazy"
          />
          
          {/* Rating Badge */}
          {formatRating(movie.vote_average) && (
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
              <svg className="w-3 h-3 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="sr-only">Rating:</span>
              {formatRating(movie.vote_average)}
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center" aria-hidden="true">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2 line-clamp-2 leading-tight">
            {movie.title}
          </h3>
          
          <time className="text-xs sm:text-sm text-gray-600 font-medium" dateTime={movie.release_date}>
            {formatYear(movie.release_date)}
          </time>
        </div>
      </Link>
    </article>
  );
}

export default MovieCard;
