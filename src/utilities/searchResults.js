import axios from "axios";
import { convertOptionsToUrl } from ".";

/*
Structure of Results: [{}, {}, {}, ...]
Structure of each Result: { id, title, titleExtension, image }
*/

export const searchInIMDB = (query, setResults) => {
  axios
    .get(
      `https://imdb-api.com/en/api/searchmovie/${process.env.REACT_APP_IMDB_API_KEY}/${query}`
    )
    .then((res) => {
      setResults(
        res.data.results.map(({ id, title, description, image }) => ({
          id: id,
          title: title,
          titleExtension: description,
          image: image,
        }))
      );
    });
};

export const searchInTMDB = (query, setResults) => {
  // Set the options
  const options = {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
    //language: "en-US",
    page: "1",
    include_adult: "true",
    query: query,
  };

  // Convert the options to url string
  const optionsStr = convertOptionsToUrl(options);

  // Fetch the data from the API
  axios
    .get(`https://api.themoviedb.org/3/search/movie?${optionsStr}`)
    .then((res) =>
      setResults(
        res.data.results?.map(({ id, original_title, poster_path }) => ({
          id: id,
          title: original_title,
          titleExtension: "",
          image:
            poster_path === null
              ? null
              : `https://image.tmdb.org/t/p/original${poster_path}`,
        }))
      )
    )
    .catch((err) => console.log(err));
};
