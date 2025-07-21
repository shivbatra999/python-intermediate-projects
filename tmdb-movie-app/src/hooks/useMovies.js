import { useQuery } from '@tanstack/react-query';
import { 
  getPopular, 
  searchMovies, 
  getMovieDetails, 
  getTopRated, 
  getUpcoming, 
  getNowPlaying, 
  getGenres, 
  discoverMovies 
} from '../api/tmdb';

/**
 * Custom hook to fetch popular movies with React Query
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Object} React Query result object with data, loading state, error, etc.
 */
export const usePopularMovies = (page = 1) => {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => getPopular(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    keepPreviousData: true, // Keep previous data while fetching new page
    refetchOnWindowFocus: false,
  });
};

/**
 * Custom hook to search movies with React Query
 * @param {string} query - Search query string
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Object} React Query result object with data, loading state, error, etc.
 */
export const useSearchMovies = (query, page = 1) => {
  return useQuery({
    queryKey: ['movies', 'search', query, page],
    queryFn: () => searchMovies(query, page),
    enabled: !!query && query.trim().length > 0, // Only run if query exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry if it's a validation error (empty query)
      if (error.message.includes('Search query is required')) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    keepPreviousData: true, // Keep previous data while fetching new page
    refetchOnWindowFocus: false,
  });
};

/**
 * Custom hook to fetch movie details with React Query
 * @param {number|string} id - Movie ID
 * @param {string} appendToResponse - Additional data to include (optional)
 * @returns {Object} React Query result object with data, loading state, error, etc.
 */
export const useMovieDetails = (id, appendToResponse = '') => {
  return useQuery({
    queryKey: ['movie', 'details', id, appendToResponse],
    queryFn: () => getMovieDetails(id, appendToResponse),
    enabled: !!id, // Only run if ID exists
    staleTime: 10 * 60 * 1000, // 10 minutes (details change less frequently)
    cacheTime: 30 * 60 * 1000, // 30 minutes
    retry: (failureCount, error) => {
      // Don't retry if it's a validation error (missing ID)
      if (error.message.includes('Movie ID is required')) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
  });
};

/**
 * Custom hook to fetch top rated movies with React Query
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Object} React Query result object with data, loading state, error, etc.
 */
export const useTopRatedMovies = (page = 1) => {
  return useQuery({
    queryKey: ['movies', 'topRated', page],
    queryFn: () => getTopRated(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

/**
 * Custom hook to fetch upcoming movies with React Query
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Object} React Query result object with data, loading state, error, etc.
 */
export const useUpcomingMovies = (page = 1) => {
  return useQuery({
    queryKey: ['movies', 'upcoming', page],
    queryFn: () => getUpcoming(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

/**
 * Custom hook to fetch now playing movies with React Query
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Object} React Query result object with data, loading state, error, etc.
 */
export const useNowPlayingMovies = (page = 1) => {
  return useQuery({
    queryKey: ['movies', 'nowPlaying', page],
    queryFn: () => getNowPlaying(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

/**
 * Custom hook to fetch movie genres with React Query
 * @returns {Object} React Query result object with data, loading state, error, etc.
 */
export const useGenres = () => {
  return useQuery({
    queryKey: ['movies', 'genres'],
    queryFn: () => getGenres(),
    staleTime: 60 * 60 * 1000, // 1 hour (genres rarely change)
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
  });
};

/**
 * Custom hook to discover movies with filters using React Query
 * @param {Object} filters - Filter options (genre, year, sort_by, etc.)
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Object} React Query result object with data, loading state, error, etc.
 */
export const useDiscoverMovies = (filters = {}, page = 1) => {
  return useQuery({
    queryKey: ['movies', 'discover', filters, page],
    queryFn: () => discoverMovies(filters, page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

// Export all hooks as a group for easier importing
const movieHooks = {
  usePopularMovies,
  useSearchMovies,
  useMovieDetails,
  useTopRatedMovies,
  useUpcomingMovies,
  useNowPlayingMovies,
  useGenres,
  useDiscoverMovies,
};

export default movieHooks;
