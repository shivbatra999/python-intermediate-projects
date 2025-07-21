import axios from 'axios';

// Create axios instance with base configuration
const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to add API key to all requests
tmdbApi.interceptors.request.use(
  (config) => {
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    
    if (!apiKey) {
      console.error('TMDB API key is missing. Please check your environment variables.');
      return Promise.reject(new Error('TMDB API key is not configured'));
    }
    
    config.params = {
      ...config.params,
      api_key: apiKey
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
tmdbApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('TMDB API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Helper function to construct image URLs
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// API Functions

/**
 * Get popular movies
 * @param {number} page - Page number (default: 1)
 * @returns {Promise} Popular movies data
 */
export const getPopular = async (page = 1) => {
  try {
    const response = await tmdbApi.get('/movie/popular', {
      params: { page }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch popular movies: ${error.message}`);
  }
};

/**
 * Search for movies
 * @param {string} query - Search query
 * @param {number} page - Page number (default: 1)
 * @returns {Promise} Search results
 */
export const searchMovies = async (query, page = 1) => {
  try {
    if (!query || query.trim() === '') {
      throw new Error('Search query is required');
    }
    
    const response = await tmdbApi.get('/search/movie', {
      params: { 
        query: query.trim(),
        page 
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to search movies: ${error.message}`);
  }
};

/**
 * Get detailed information about a specific movie
 * @param {number|string} movieId - Movie ID
 * @param {string} appendToResponse - Additional data to include (e.g., 'credits,videos,reviews')
 * @returns {Promise} Movie details
 */
export const getMovieDetails = async (movieId, appendToResponse = '') => {
  try {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }

    const params = {};
    if (appendToResponse) {
      params.append_to_response = appendToResponse;
    }

    const response = await tmdbApi.get(`/movie/${movieId}`, { params });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch movie details: ${error.message}`);
  }
};

/**
 * Get top rated movies
 * @param {number} page - Page number (default: 1)
 * @returns {Promise} Top rated movies data
 */
export const getTopRated = async (page = 1) => {
  try {
    const response = await tmdbApi.get('/movie/top_rated', {
      params: { page }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch top rated movies: ${error.message}`);
  }
};

/**
 * Get upcoming movies
 * @param {number} page - Page number (default: 1)
 * @returns {Promise} Upcoming movies data
 */
export const getUpcoming = async (page = 1) => {
  try {
    const response = await tmdbApi.get('/movie/upcoming', {
      params: { page }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch upcoming movies: ${error.message}`);
  }
};

/**
 * Get now playing movies
 * @param {number} page - Page number (default: 1)
 * @returns {Promise} Now playing movies data
 */
export const getNowPlaying = async (page = 1) => {
  try {
    const response = await tmdbApi.get('/movie/now_playing', {
      params: { page }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch now playing movies: ${error.message}`);
  }
};

/**
 * Get movie genres
 * @returns {Promise} List of movie genres
 */
export const getGenres = async () => {
  try {
    const response = await tmdbApi.get('/genre/movie/list');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch genres: ${error.message}`);
  }
};

/**
 * Discover movies with filters
 * @param {Object} filters - Filter options (genre, year, sort_by, etc.)
 * @param {number} page - Page number (default: 1)
 * @returns {Promise} Filtered movies data
 */
export const discoverMovies = async (filters = {}, page = 1) => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        ...filters,
        page
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to discover movies: ${error.message}`);
  }
};

// Export the axios instance for additional custom requests
export default tmdbApi;
