import axios from "axios";
import {
  convertToMetacriticTitle,
  convertToRottenTomatoesTitle,
} from "./utilities";

// Ratings = [{ provider: "IMDB", value: "6.7/10" }, {}, {}, ...]

const fetchRatings = async (details, setRatings, setLoading) => {
  let ratings = [];

  // Fetch Bing ratings (IMDB, RottenTomatoes, Metacritic)
  const bingRatings = await fetchBingRatings(details.title);
  ratings.push(...bingRatings);

  // Push TMDB ratings
  const tmdbRating = {
    provider: "TMDB",
    value: details.tmdbRating.toString() + "/10",
  };
  ratings.push(tmdbRating);

  setRatings(ratings);
  setLoading(false);
};

const fetchBingRatings = async (title) => {
  // const url = `http://localhost:8888/.netlify/functions/web-scrap?title=${title}`;
  const url = `https://tempsite-servless.netlify.app/.netlify/functions/web-scrap?title=${title}`;

  const ratings = await axios.get(url).then((res) => res.data.data.ratings);

  return ratings;
};

// eslint-disable-next-line
const fetchIMDBRating = async (id) => {
  const rating = await axios
    .get(`http://localhost:5000/ratings/imdb/${id}`)
    .then((res) => res.data);

  return rating;
};

// eslint-disable-next-line
const fetchRottenTomatoesRating = async (title) => {
  // Get the formatted title
  const formattedTitle = convertToRottenTomatoesTitle(title);
  console.log("Rotten Tomatoes Title = ", formattedTitle);

  // Get the rating
  const rating = await axios
    .get(`http://localhost:5000/ratings/rottentomatoes/${formattedTitle}`)
    .then((res) => res.data);

  return rating;
};

// eslint-disable-next-line
const fetchMetacriticRating = async (title) => {
  // Get the formatted title
  const formattedTitle = convertToMetacriticTitle(title);
  console.log("Metacritic Title = ", formattedTitle);

  // Get the rating
  const rating = await axios
    .get(`http://localhost:5000/ratings/metacritic/${formattedTitle}`)
    .then((res) => res.data);

  return rating;
};

export default fetchRatings;
