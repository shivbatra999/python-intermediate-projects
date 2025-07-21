import axios from 'axios';

// TMDB API Configuration
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Get API key from environment variables
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

// Check if API key exists
if (!API_KEY) {
  console.error('TMDB API key is missing. Please add REACT_APP_TMDB_API_KEY to your .env.local file');
}

// Create axios instance with default configuration
export const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Helper function to get full image URL
export const getImageUrl = (imagePath: string, size: string = 'w500'): string => {
  if (!imagePath) return '';
  return `${TMDB_IMAGE_BASE_URL}/${size}${imagePath}`;
};

// Common image sizes for different use cases
export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original',
  },
};

// API endpoints
export const ENDPOINTS = {
  // Movies
  POPULAR_MOVIES: '/movie/popular',
  TOP_RATED_MOVIES: '/movie/top_rated',
  NOW_PLAYING_MOVIES: '/movie/now_playing',
  UPCOMING_MOVIES: '/movie/upcoming',
  MOVIE_DETAILS: (id: number) => `/movie/${id}`,
  MOVIE_CREDITS: (id: number) => `/movie/${id}/credits`,
  MOVIE_VIDEOS: (id: number) => `/movie/${id}/videos`,
  SIMILAR_MOVIES: (id: number) => `/movie/${id}/similar`,
  
  // TV Shows
  POPULAR_TV: '/tv/popular',
  TOP_RATED_TV: '/tv/top_rated',
  ON_THE_AIR_TV: '/tv/on_the_air',
  TV_DETAILS: (id: number) => `/tv/${id}`,
  
  // Search
  SEARCH_MULTI: '/search/multi',
  SEARCH_MOVIES: '/search/movie',
  SEARCH_TV: '/search/tv',
  SEARCH_PEOPLE: '/search/person',
  
  // Genres
  MOVIE_GENRES: '/genre/movie/list',
  TV_GENRES: '/genre/tv/list',
  
  // Trending
  TRENDING: (mediaType: string = 'all', timeWindow: string = 'day') => 
    `/trending/${mediaType}/${timeWindow}`,
};

export default tmdbApi;
