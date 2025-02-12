import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css"
import noPhoto from "../../components/images/no_photo.jpg"


export default function MovieList({ movies = [], trendMovie = [] }) {
  const location = useLocation();
  return (
    <div className={s.movieList}>
      <div>
        <ul className={s.trendMovieWrap}>
          {trendMovie.map((trend) => (
            <li className={s.items} key={trend.id}>
              <Link to={`/movies/${trend.id}`}>
              <img
                className={s.img}
                src={
                  trend.backdrop_path
                    ? `https://image.tmdb.org/t/p/original/${trend.backdrop_path}`
                    :  noPhoto

                }
                alt={trend.original_title}
              />
              </Link>
              <p className={s.name_movie}>
                <Link
                  className={s.name_movie}
                  to={`/movies/${trend.id}`}
                  state={location}
                >
                  {trend.original_title}
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul className={s.trendMovieWrap}>
          {movies.map((movie) => (    
            <li className={s.items} key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
              <img
                className={s.img}
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                    : noPhoto 

                }
                alt={movie.original_title}
              />
              </Link>
              <p>
              <Link
                  className={s.title}
                  to={`/movies/${movie.id}`}
                  state={location}
                >
                {movie.title}
                </Link>
              </p>              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
