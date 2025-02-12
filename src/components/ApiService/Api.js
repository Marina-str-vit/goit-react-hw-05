import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const API_KEY = "809254d51713fc0e56fd23b3cc31eb61";
const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDkyNTRkNTE3MTNmYzBlNTZmZDIzYjNjYzMxZWI2MSIsIm5iZiI6MTczOTIwNDU1MS4wMzAwMDAyLCJzdWIiOiI2N2FhMjdjN2IwMTE1M2Q2ZjQ5Mzg4MjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.k6el6rtGorWekBbpyl45XmfIgtyRI0fL1Xp3GbKliK8",
  },
};

// шукаємо всі фільми
export const getMovies = async (query, page) => {
  const params = {
    params: {
      query,
      page,
      language: "en-US",
      include_adult: false,
      api_key: API_KEY,
    },
  };

  const res = await axios.get("search/movie", params, options);
  return res.data;
};

// фільми за Id
export const getMovieById = async (movieId) => {
  const params = {
    params: {
      api_key: API_KEY,
      language: "en-US",
    },
  };

  const res = await axios.get(`movie/${movieId}`, params, options);
  return res.data;
};


export const getMovieCredits = async (movieId) => {
  const params = {
		params: {
      api_key: API_KEY,
      language: "en-US",
    },
  };

  const res = await axios.get(`movie/${movieId}/credits`, params, options);
  return res.data;
};


export const getMovieReviews = async (movieId, page) => {
  const params = {
    params: {
      api_key: API_KEY,
      page,
      total_pages: 1,
    },
  };

  const res = await axios.get(`movie/${movieId}/reviews`, params, options);
  return res.data;
};

// кращі фільми за день
export const getTrendingMovie = async (page) => {
  const params = {
		params: {
      page,
			api_key: API_KEY,
      language: "en-US",
    },
  };
  
  const res = await axios.get(`trending/movie/day`, params, options);
  return res.data;
};