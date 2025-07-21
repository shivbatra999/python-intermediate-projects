import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetails } from '../hooks/useMovies';

/**
 * MovieDetail Component
 * Displays detailed information for a specific movie
 * Route: /movie/:id
 */
function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Fetch movie details using the custom hook
  const { data: movie, isLoading, error } = useMovieDetails(id);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center justify-center min-h-32 sm:min-h-64">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-sm sm:text-lg text-gray-600">Loading movie details...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 text-center max-w-md mx-auto shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-red-800 mb-2">Movie Not Found</h2>
            <p className="text-sm sm:text-base text-red-600 mb-4">
              {error.message || 'Sorry, we could not find the movie you are looking for.'}
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No movie data
  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Movie Not Found</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">The requested movie could not be found.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Helper functions
  const formatRating = (rating) => {
    if (!rating || rating === 0) return 'N/A';
    return rating.toFixed(1);
  };

  const formatRuntime = (runtime) => {
    if (!runtime) return 'N/A';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Backdrop Image */}
      {movie.backdrop_path && (
        <div 
          className="relative h-48 sm:h-64 lg:h-96 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute top-3 left-3 sm:top-6 sm:left-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center bg-black bg-opacity-70 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-opacity-90 hover:scale-105 transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Go back to previous page"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </div>
        </div>
      )}

      {/* Movie Content */}
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="lg:flex">
            {/* Poster */}
            <div className="lg:w-1/3 xl:w-1/4">
              <img
                src={movie.poster_path 
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://via.placeholder.com/500x750?text=No+Image&bg=f3f4f6&color=9ca3af'
                }
                alt={`Movie poster for ${movie.title}${movie.release_date ? ` (${formatDate(movie.release_date)})` : ''}`}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Movie Information */}
            <div className="lg:w-2/3 xl:w-3/4 p-4 sm:p-6">
              {/* Title and Release Year */}
              <header className="mb-4 sm:mb-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="text-base sm:text-lg text-gray-600 italic mb-2">"{movie.tagline}"</p>
                )}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <time className="font-medium" dateTime={movie.release_date}>
                    {formatDate(movie.release_date)}
                  </time>
                  <span aria-hidden="true">•</span>
                  <span>{formatRuntime(movie.runtime)}</span>
                  {movie.spoken_languages && movie.spoken_languages.length > 0 && (
                    <>
                      <span aria-hidden="true">•</span>
                      <span>{movie.spoken_languages[0].english_name}</span>
                    </>
                  )}
                </div>
              </header>

              {/* Rating */}
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center bg-yellow-50 px-3 py-2 rounded-lg shadow-sm">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold text-gray-900">{formatRating(movie.vote_average)}</span>
                    <span className="text-gray-600 ml-1">/10</span>
                  </div>
                  {movie.vote_count && (
                    <span className="text-xs sm:text-sm text-gray-600">
                      ({movie.vote_count.toLocaleString()} votes)
                    </span>
                  )}
                </div>
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <section className="mb-4 sm:mb-6">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Genres</h2>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Overview */}
              {movie.overview && (
                <section className="mb-4 sm:mb-6">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Overview</h2>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{movie.overview}</p>
                </section>
              )}

              {/* Additional Details */}
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                {movie.budget && movie.budget > 0 && (
                  <div>
                    <span className="font-semibold text-gray-900">Budget:</span>
                    <span className="ml-2 text-gray-700">{formatCurrency(movie.budget)}</span>
                  </div>
                )}
                {movie.revenue && movie.revenue > 0 && (
                  <div>
                    <span className="font-semibold text-gray-900">Revenue:</span>
                    <span className="ml-2 text-gray-700">{formatCurrency(movie.revenue)}</span>
                  </div>
                )}
                {movie.production_companies && movie.production_companies.length > 0 && (
                  <div className="sm:col-span-2">
                    <span className="font-semibold text-gray-900">Production:</span>
                    <span className="ml-2 text-gray-700">
                      {movie.production_companies.map(company => company.name).join(', ')}
                    </span>
                  </div>
                )}
              </section>

              {/* Back Button (for mobile when no backdrop) */}
              {!movie.backdrop_path && (
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    onClick={() => navigate(-1)}
                    className="flex items-center bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Go back to previous page"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default MovieDetail;
