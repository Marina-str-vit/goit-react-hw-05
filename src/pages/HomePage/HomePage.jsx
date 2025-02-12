import { useEffect, useState } from "react";
import { getTrendingMovie } from "../../components/ApiService/Api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import s from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

export default function HomePage() {
  const [trendMovie, setTrendMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!trendMovie) {
      setIsError(true);
      return;
    }
    async function fetchTrendingMovies() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getTrendingMovie(page);
        setTrendMovie((prevMovies) => {
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
    fetchTrendingMovies();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      {isError && <ErrorMessage />}
      {isLoading && <Loading />}
      {trendMovie.length > 0 && (
        <>
          <h1 className={s.title}>Trending today</h1>
          <MovieList trendMovie={trendMovie} />
        </>
      )}
      {trendMovie.length > 0 && !isLoading && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
}