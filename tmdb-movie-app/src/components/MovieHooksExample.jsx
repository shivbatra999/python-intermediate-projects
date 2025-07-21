import React, { useState } from 'react';
import { usePopularMovies, useSearchMovies, useMovieDetails } from '../hooks/useMovies';
import { getImageUrl } from '../api/tmdb';

/**
 * Example component demonstrating the usage of custom movie hooks
 */
function MovieHooksExample() {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Hook examples
  const { 
    data: popularMovies, 
    isLoading: popularLoading, 
    error: popularError 
  } = usePopularMovies(currentPage);

  const { 
    data: searchResults, 
    isLoading: searchLoading, 
    error: searchError 
  } = useSearchMovies(searchQuery, 1);

  const { 
    data: movieDetails, 
    isLoading: detailsLoading, 
    error: detailsError 
  } = useMovieDetails(selectedMovieId, 'credits');

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        TMDB Movie Hooks Example
      </h1>

      {/* Search Section */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">🔍 Search Movies</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for movies..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        {searchLoading && <div className="mt-4 text-center">Searching...</div>}
        {searchError && (
          <div className="mt-4 text-red-600 text-center">
            Error: {searchError.message}
          </div>
        )}
        
        {searchResults && searchResults.results.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {searchResults.results.slice(0, 12).map(movie => (
              <div
                key={movie.id}
                onClick={() => setSelectedMovieId(movie.id)}
                className="cursor-pointer transform hover:scale-105 transition-transform"
              >
                <img
                  src={getImageUrl(movie.poster_path, 'w185')}
                  alt={movie.title}
                  className="w-full h-auto rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/185x278?text=No+Image';
                  }}
                />
                <p className="text-sm text-center mt-2 truncate">{movie.title}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Popular Movies Section */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">🔥 Popular Movies</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 bg-gray-100 rounded">
              Page {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={!popularMovies || currentPage >= popularMovies.total_pages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {popularLoading && <div className="text-center">Loading popular movies...</div>}
        {popularError && (
          <div className="text-red-600 text-center">
            Error: {popularError.message}
          </div>
        )}

        {popularMovies && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {popularMovies.results.map(movie => (
              <div
                key={movie.id}
                onClick={() => setSelectedMovieId(movie.id)}
                className="cursor-pointer transform hover:scale-105 transition-transform"
              >
                <img
                  src={getImageUrl(movie.poster_path, 'w185')}
                  alt={movie.title}
                  className="w-full h-auto rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/185x278?text=No+Image';
                  }}
                />
                <p className="text-sm text-center mt-2 truncate">{movie.title}</p>
                <p className="text-xs text-center text-yellow-600">
                  ⭐ {movie.vote_average.toFixed(1)}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Movie Details Section */}
      {selectedMovieId && (
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">🎬 Movie Details</h2>
          
          {detailsLoading && <div className="text-center">Loading movie details...</div>}
          {detailsError && (
            <div className="text-red-600 text-center">
              Error: {detailsError.message}
            </div>
          )}

          {movieDetails && (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <img
                  src={getImageUrl(movieDetails.poster_path, 'w342')}
                  alt={movieDetails.title}
                  className="w-full rounded-lg shadow-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/342x513?text=No+Image';
                  }}
                />
              </div>
              
              <div className="md:w-3/4">
                <h3 className="text-3xl font-bold mb-2">{movieDetails.title}</h3>
                <p className="text-gray-600 mb-4">{movieDetails.tagline}</p>
                
                <div className="flex gap-4 mb-4">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded">
                    ⭐ {movieDetails.vote_average.toFixed(1)}
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                    {movieDetails.runtime} min
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded">
                    {movieDetails.release_date}
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Genres:</h4>
                  <div className="flex gap-2">
                    {movieDetails.genres?.map(genre => (
                      <span 
                        key={genre.id}
                        className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Overview:</h4>
                  <p className="text-gray-700 leading-relaxed">{movieDetails.overview}</p>
                </div>

                {movieDetails.credits && movieDetails.credits.cast && (
                  <div>
                    <h4 className="font-semibold mb-2">Cast:</h4>
                    <div className="flex gap-4 overflow-x-auto">
                      {movieDetails.credits.cast.slice(0, 6).map(actor => (
                        <div key={actor.id} className="flex-shrink-0 text-center">
                          <img
                            src={getImageUrl(actor.profile_path, 'w185')}
                            alt={actor.name}
                            className="w-16 h-16 rounded-full object-cover mx-auto mb-1"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/64x64?text=?';
                            }}
                          />
                          <p className="text-xs font-medium">{actor.name}</p>
                          <p className="text-xs text-gray-600">{actor.character}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setSelectedMovieId(null)}
                  className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Close Details
                </button>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default MovieHooksExample;
