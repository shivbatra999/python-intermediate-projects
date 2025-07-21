# TMDB Movie App - Project Structure

## 📁 Project Structure

```
tmdb-movie-app/
├── public/                     # Static files
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/                        # Source code
│   ├── api/                    # API layer
│   │   └── tmdb.js            # TMDB API service with axios
│   ├── components/             # Reusable UI components
│   │   ├── common/            # Common components (buttons, cards, etc.)
│   │   ├── layout/            # Layout components (header, footer, sidebar)
│   │   └── movie/             # Movie-specific components
│   ├── hooks/                  # Custom React hooks
│   │   ├── useMovies.js       # Movie data fetching hooks
│   │   ├── useSearch.js       # Search functionality hooks
│   │   └── useLocalStorage.js # Local storage management
│   ├── pages/                  # Page components
│   │   ├── Home.jsx           # Home page
│   │   ├── Search.jsx         # Search results page
│   │   ├── MovieDetail.jsx    # Movie details page
│   │   ├── Category.jsx       # Category/genre pages
│   │   └── NotFound.jsx       # 404 page
│   ├── services/              # Business logic services
│   │   └── tmdbApi.ts         # TypeScript API service (legacy)
│   ├── types/                  # TypeScript type definitions
│   │   └── tmdb.ts            # TMDB API types
│   ├── utils/                  # Utility functions
│   │   ├── helpers.js         # General helper functions
│   │   └── constants.js       # App constants
│   ├── App.jsx                # Main App component
│   ├── index.js               # App entry point
│   ├── App.css                # Global styles
│   └── index.css              # Root styles with Tailwind imports
├── .env.local                  # Environment variables
├── .gitignore                 # Git ignore file
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
└── README.md                  # Project documentation
```

## �️ API Service (`src/api/tmdb.js`)

The TMDB API service provides a centralized way to interact with The Movie Database API:

### Core Features:
- **Axios Instance**: Pre-configured with base URL, timeout, and interceptors
- **Automatic API Key Injection**: Uses environment variables
- **Error Handling**: Consistent error handling with meaningful messages
- **Image URL Helper**: Utility function for constructing image URLs

### Available Functions:

#### Main Movie Endpoints:
- `getPopular(page)` - Get popular movies
- `getTopRated(page)` - Get top-rated movies
- `getUpcoming(page)` - Get upcoming movies
- `getNowPlaying(page)` - Get now playing movies

#### Search & Discovery:
- `searchMovies(query, page)` - Search movies by title
- `discoverMovies(filters, page)` - Discover movies with filters
- `getGenres()` - Get all movie genres

#### Movie Details:
- `getMovieDetails(movieId, appendToResponse)` - Get detailed movie information

#### Utility:
- `getImageUrl(path, size)` - Generate TMDB image URLs

## 🚀 Usage Examples

### Import and use in components:
```javascript
import { getPopular, searchMovies, getMovieDetails } from '../api/tmdb';

// Fetch popular movies
const popularMovies = await getPopular(1);

// Search for movies
const searchResults = await searchMovies('batman', 1);

// Get specific movie details
const movieDetails = await getMovieDetails(550);
```

## 📂 Directory Purposes

- **`api/`** - API configuration and service functions
- **`components/`** - Reusable UI components (MovieCard, SearchBar, etc.)
- **`hooks/`** - Custom React hooks for data fetching and state management
- **`pages/`** - Page-level components (HomePage, MovieDetails, SearchResults)
- **`App.jsx`** - Main application component with routing
- **`index.js`** - React app entry point

## ✅ Ready for Development!

Your TMDB Movie App structure is now properly organized and ready for feature development!
