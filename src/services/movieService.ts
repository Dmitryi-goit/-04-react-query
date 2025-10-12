import axios from 'axios';
import type { Movie } from '../types/movie';

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(query: string, page: number = 1): Promise<MovieResponse> {
  const url = 'https://api.themoviedb.org/3/search/movie';
  const response = await axios.get<MovieResponse>(url, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
    },
    params: {
      query,
      page,
    },
  });

  return response.data;
}