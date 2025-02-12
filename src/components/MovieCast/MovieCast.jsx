import { useEffect, useState } from "react";
import s from "./MovieCast.module.css"
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../ApiService/Api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loading from "../Loading/Loading";
import noPhoto from "../../components/images/no_photo.jpg"


export default function MovieCast() {
  const { movieId } = useParams();
  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) {
      setIsError(true);
      return;
    }
    async function fetchMoviesCredits() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getMovieCredits(movieId);
        setCredits(data.cast);
      } catch (error) {
        setIsError(true);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMoviesCredits();
  }, [movieId]);

  return (
    <div>
      {isError && <ErrorMessage />}
      {isLoading && <Loading />}
      {credits.length > 0 && (
        <ul className={s.wrap}>
          {credits.map((actor) => (
            <li className={s.items} key={actor.id}>
              <img
                className={s.img}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : noPhoto

                }
                alt={actor.name}
              />
              <h2 className={s.name}>{actor.name}</h2>
              <div>{actor.character && <p>Character: {actor.character}</p>}</div> 
           </li>
          ))}
        </ul>
      )}
    </div>
  );
}