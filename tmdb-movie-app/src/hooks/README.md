# useMovies.js - Custom React Query Hooks

## 📝 Overview

This file contains custom React Query hooks for interacting with the TMDB API. Each hook provides optimized data fetching, caching, and error handling for different movie endpoints.

## 🎯 Available Hooks

### Core Hooks (as requested):

#### `usePopularMovies(page)`
Fetches popular movies with pagination.

```javascript
import { usePopularMovies } from '../hooks/useMovies';

function PopularMoviesComponent() {
  const { data, isLoading, error, refetch } = usePopularMovies(1);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.results?.map(movie => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
}
```

#### `useSearchMovies(query, page)`
Searches movies by query with pagination.

```javascript
import { useSearchMovies } from '../hooks/useMovies';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const { data, isLoading, error } = useSearchMovies(query, 1);
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
      />
      {isLoading && <div>Searching...</div>}
      {data?.results?.map(movie => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
}
```

#### `useMovieDetails(id, appendToResponse)`
Fetches detailed movie information.

```javascript
import { useMovieDetails } from '../hooks/useMovies';

function MovieDetailComponent({ movieId }) {
  const { data: movie, isLoading, error } = useMovieDetails(movieId, 'credits,videos');
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h1>{movie?.title}</h1>
      <p>{movie?.overview}</p>
      {movie?.credits && (
        <div>
          <h3>Cast</h3>
          {movie.credits.cast.slice(0, 5).map(actor => (
            <span key={actor.id}>{actor.name}, </span>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Additional Hooks (bonus features):

#### `useTopRatedMovies(page)`
Fetches top-rated movies.

#### `useUpcomingMovies(page)`
Fetches upcoming movies.

#### `useNowPlayingMovies(page)`
Fetches currently playing movies.

#### `useGenres()`
Fetches all movie genres.

#### `useDiscoverMovies(filters, page)`
Discovers movies with advanced filters.

## 🛠️ Hook Features

### Performance Optimizations:
- **Stale Time**: 5-10 minutes (data considered fresh)
- **Cache Time**: 10-30 minutes (data kept in memory)
- **Keep Previous Data**: Maintains previous page data during pagination
- **Retry Logic**: Automatic retry with exponential backoff
- **Conditional Fetching**: Only runs when required data is available

### Error Handling:
- Smart retry logic (doesn't retry validation errors)
- User-friendly error messages
- Proper error propagation

### Caching Strategy:
- Query keys include all relevant parameters
- Longer cache times for stable data (genres: 24 hours)
- Shorter cache times for dynamic data (popular movies: 10 minutes)

## 🎯 Usage Patterns

### 1. Basic Usage
```javascript
import { usePopularMovies } from '../hooks/useMovies';

const { data, isLoading, error, refetch } = usePopularMovies(1);
```

### 2. Pagination
```javascript
import { usePopularMovies } from '../hooks/useMovies';

function MoviesList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, isPreviousData } = usePopularMovies(page);
  
  return (
    <div>
      {data?.results?.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      
      <div>
        <button 
          onClick={() => setPage(old => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button 
          onClick={() => setPage(old => old + 1)}
          disabled={isPreviousData || !data?.total_pages || page >= data.total_pages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

### 3. Search with Debouncing
```javascript
import { useState, useEffect } from 'react';
import { useSearchMovies } from '../hooks/useMovies';

function SearchMovies() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  const { data, isLoading, error } = useSearchMovies(debouncedQuery, 1);
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
      />
      {isLoading && <div>Searching...</div>}
      {data?.results?.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
```

### 4. Movie Discovery with Filters
```javascript
import { useDiscoverMovies, useGenres } from '../hooks/useMovies';

function DiscoverMovies() {
  const [filters, setFilters] = useState({});
  const { data: genres } = useGenres();
  const { data: movies, isLoading } = useDiscoverMovies(filters, 1);
  
  const handleGenreChange = (genreId) => {
    setFilters(prev => ({
      ...prev,
      with_genres: genreId
    }));
  };
  
  return (
    <div>
      <select onChange={(e) => handleGenreChange(e.target.value)}>
        <option value="">All Genres</option>
        {genres?.genres?.map(genre => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      
      {movies?.results?.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
```

## 🚀 Query Key Strategy

Each hook uses a specific query key pattern for optimal caching:

```javascript
// Popular movies: ['movies', 'popular', page]
// Search: ['movies', 'search', query, page]
// Details: ['movie', 'details', id, appendToResponse]
// Top rated: ['movies', 'topRated', page]
// Upcoming: ['movies', 'upcoming', page]
// Now playing: ['movies', 'nowPlaying', page]
// Genres: ['movies', 'genres']
// Discover: ['movies', 'discover', filters, page]
```

This strategy ensures:
- Proper cache isolation
- Efficient invalidation
- Predictable data updates

## 📦 Import Options

### Individual imports (recommended):
```javascript
import { usePopularMovies, useSearchMovies, useMovieDetails } from '../hooks/useMovies';
```

### Default import (all hooks):
```javascript
import movieHooks from '../hooks/useMovies';
const { usePopularMovies, useSearchMovies } = movieHooks;
```

These hooks provide a robust foundation for building a movie application with excellent performance and user experience!
