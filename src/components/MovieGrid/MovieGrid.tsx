import css from "./MovieGrid.module.css"
import type { Movie } from "../../types/movie"


interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
    function selectedMovie(movie: Movie) {
        onSelect(movie)
        console.log(movie)
    }

    return (
        <ul className={css.grid}>
            {movies.map((el) => {
                return (
                    <li key={el.id}>
                        <div className={css.card}>
                        <img 
                                className={css.image} 
                                src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                                alt={el.title} 
                                loading="lazy" 
                                onClick={() => selectedMovie(el)}
                            />
                            <h2 className={css.title}>{el.title}</h2>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}