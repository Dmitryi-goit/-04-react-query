import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import css from './App.module.css';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';
import type { Movie } from '../../types/movie';
import { fetchMovies, type MovieResponse } from '../../services/movieService';

const notify = () => toast('No movies found for your request.');

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);

 
  const { data, isLoading, isError } = useQuery<MovieResponse>({
    queryKey: ['movies', query, page],
    queryFn: async () => fetchMovies(query, page),
    enabled: !!query.trim(),
    placeholderData: (prev) => prev, 
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 1;

  const handleSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleSelect = (movie: Movie) => setActiveMovie(movie);
  const onClose = () => setActiveMovie(null);

  if (data && movies.length === 0 && !isLoading) notify();

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {isError && <ErrorMessage isError={true} />}
      {isLoading && <Loader />}
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={handleSelect} />}

     
      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      <Toaster />
      {activeMovie && <MovieModal movie={activeMovie} onClose={onClose} />}
    </>
  );
}