// TMDB API Response Types

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  origin_country: string[];
  original_language: string;
  original_name: string;
  popularity: number;
}

export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  known_for: (Movie | TVShow)[];
  popularity: number;
  adult: boolean;
  gender: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  belongs_to_collection: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
  english_name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  cast_id: number;
  credit_id: string;
  gender: number;
  known_for_department: string;
  adult: boolean;
  popularity: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  credit_id: string;
  gender: number;
  known_for_department: string;
  adult: boolean;
  popularity: number;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface GenreResponse {
  genres: Genre[];
}

export interface VideoResponse {
  results: Video[];
}

// Search result types
export type SearchResult = Movie | TVShow | Person;

export interface MultiSearchResult {
  media_type: 'movie' | 'tv' | 'person';
}

export type MovieSearchResult = Movie & MultiSearchResult;
export type TVSearchResult = TVShow & MultiSearchResult;
export type PersonSearchResult = Person & MultiSearchResult;
