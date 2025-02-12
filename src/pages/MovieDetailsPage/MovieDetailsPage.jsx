import { Suspense, useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../components/ApiService/Api";
import s from "./MovieDetailsPage.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import { IoMdArrowRoundBack } from "react-icons/io";
import noPhoto from "../../components/images/no_photo.jpg"

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");
  const navigate = useNavigate();

useEffect(() => {
  if (!movieId) {
    setIsError(true);
    return;
  }
  async function fetchMoviesId() {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await getMovieById(movieId);
      setMovie(data);
      const currentPath = window.location.pathname;
      if (
        !currentPath.includes(`/movies/${movieId}/cast`) &&
        !currentPath.includes(`/movies/${movieId}/reviews`)
      ) {
        navigate(`/movies/${movieId}/cast`);
      }
    } catch (error) {
      setIsError(true);
      console.log(error); 
    } finally {
      setIsLoading(false);
    }
  }
  fetchMoviesId();
}, [movieId, navigate]);

return (
  <>
      <Link to={backLinkRef.current} className={s.btn}>
        <IoMdArrowRoundBack className={s.ioMdArrowRoundBack}/>
      </Link>
   <div className={s.container}>
    {isError && <ErrorMessage />}
    {isLoading && <Loading />}
    {movie !== null && (
      <div className={s.content}>
        <div
          className={s.backgroundWrap}>
          <div className={s.titleInfo}>
            <img
              className={s.img}
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                  : noPhoto
              }
              alt={movie.original_title}
            />
            <div>
              <h1>{movie.title}</h1>
              {movie.release_date !== "" && (
                <p>({parseFloat(movie.release_date)})</p>
              )}
            </div>
          </div>
          <h2 className={s.detailsTitle}>Overview</h2>
          <p>{movie.overview}</p>
          <h2 className={s.detailsTitle}>Genres</h2>

          <ul className={s.genre}>
            {movie.genres.map((genre) => (
              <li key={genre.id}>
                <p>{genre.name}</p>{" "}
              </li>
            ))}
          </ul>
        </div>
        <h2>Additional information</h2>
        <ul className={s.additionalInfo}>
          <li className={s.list}>
            <NavLink className={s.link} to={`/movies/${movieId}/cast`}>
              <p className={s.text}>Cast</p>
            </NavLink>
          </li>
          <li className={s.list}>
            <NavLink className={s.link} to={`/movies/${movieId}/reviews`}>
              <p className={s.text}>Reviews</p>
            </NavLink>
          </li>
        </ul>
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    )}
  </div>
  </>
);
}