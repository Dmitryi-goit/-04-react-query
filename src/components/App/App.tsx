import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar'
import './App.module.css'
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';

const notify = () => toast('No movies found for your request.');

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null)

  function onClose() {
    setActiveMovie(null)
  }

  function handleSelect(selected: Movie) {
    setActiveMovie(selected)
  }

  async function handleSubmit(query: string) {
    setLoading(true)
    setError(false)


    try {
      const results = await fetchMovies(query)
      if (results.length  === 0) {
        notify()
      }
      setMovies(results)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <MovieGrid movies={movies} onSelect={handleSelect} />
      {error && <ErrorMessage isError={error} />}
      {loading && <Loader />}
      <Toaster />
      {activeMovie && <MovieModal movie={activeMovie} onClose={onClose} />}
    </>
  )
}