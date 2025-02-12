import { useParams } from "react-router-dom";
import s from "./MovieReviews.module.css";
import { useEffect, useState } from "react";
import { getMovieReviews } from "../ApiService/Api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loading from "../Loading/Loading";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";


export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!movieId) {
      setIsError(true);
      return;
    }
      async function fetchMoviesReviews() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getMovieReviews(movieId, page);
        setReviews((prevMovies) => {
          const movieIds = new Set(prevMovies.map((movie) => movie.id));
          const newMovies = data.results.filter(
            (movie) => !movieIds.has(movie.id)
          );
          return [...prevMovies, ...newMovies];
        });
        setTotalPages(data.total_pages);
      } catch (error) {
        setIsError(true);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMoviesReviews();
  }, [movieId, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={s.wrap}>
      {isError && <ErrorMessage />}
      {isLoading && <Loading />}
      {reviews.length === 0 && <p>We don`t have any reviews for this movie</p>}
      {reviews.length > 0 && (
        <ul className={s.menuList}>
          {reviews.map((review) => (
            <li className={s.list} key={review.id}>
              <h2 className={s.title}>Author: {review.author}</h2>
              <p className={s.text}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews.length > 0 && !isLoading && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
}
