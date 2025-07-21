import React, { useEffect, useState } from 'react';
import { tmdbApi, getImageUrl, ENDPOINTS, IMAGE_SIZES } from '../services/tmdbApi';
import { Movie, TMDBResponse } from '../types/tmdb';

const PopularMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        
        // Example of using the API key from environment variables
        console.log('API Key loaded:', process.env.REACT_APP_TMDB_API_KEY ? 'Yes' : 'No');
        
        const response = await tmdbApi.get<TMDBResponse<Movie>>(ENDPOINTS.POPULAR_MOVIES);
        setMovies(response.data.results.slice(0, 10)); // Get first 10 movies
        setError(null);
      } catch (err: any) {
        console.error('Error fetching popular movies:', err);
        setError(err.response?.data?.status_message || 'Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading popular movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Popular Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img
              src={getImageUrl(movie.poster_path || '', IMAGE_SIZES.poster.medium)}
              alt={movie.title}
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/342x513?text=No+Image';
              }}
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{movie.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{movie.release_date}</p>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="ml-1 text-sm">{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
