import axios from "axios";
import { convertOptionsToUrl } from ".";

/*
 * Ratings: { imdb, rottenTomatoes, metacritic }
 * Details: { id, imdbId, title, originalLanguage, runtime, releaseDate, image, plot, genres, languages, stars, }
 */

export const fetchDetailsFromTMDB = async (
  id,
  setDetails,
  setRatings,
  setLoading
) => {
  // Start the loader
  setLoading(true);

  // Define the options
  const options = {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
  };

  // Convert options to string
  const optionsStr = convertOptionsToUrl(options);

  // Call the API
  await axios
    .get(`https://api.themoviedb.org/3/movie/${id}?${optionsStr}`)
    .then((res) => {
      // Set movie details
      setDetails({
        id: res.data.id,
        imdbId: res.data.imdb_id,
        title: res.data.original_title,
        originalLanguage: res.data.original_language,
        runtime: res.data.runtime,
        releaseDate: res.data.release_date,
        image: `https://image.tmdb.org/t/p/original${res.data.poster_path}`,
        plot: res.data.overview,
        genres: res.data.genres.map((genre) => genre.name).join(", "),
        languages: res.data.spoken_languages
          .map((lang) => lang.english_name)
          .join(", "),
        stars: null,
      });

      // Add TMDB movie ratings
      setRatings((prevRatings) => ({
        ...prevRatings,
        "The Movie Database": res.data.vote_average,
      }));
    })
    .catch((err) => console.log("Fetch Movie Details Error >>> ", err));

  // Stop the loader
  setLoading(false);
};

export const fetchDetailsFromIMDB = async (
  id,
  setRatings,
  setDetails,
  setLoading
) => {
  // Start the loader
  setLoading(true);

  // Fetch the ratings
  const ratingsPromise = axios.get(
    `https://imdb-api.com/API/Ratings/${process.env.REACT_APP_IMDB_API_KEY}/${id}`
  );

  // Fetch the details
  const detailsPromise = axios.get(
    `https://imdb-api.com/en/API/Title/${process.env.REACT_APP_IMDB_API_KEY}/${id}`
  );

  // Update the state
  await Promise.all([ratingsPromise, detailsPromise]).then((values) => {
    const _ratings = values[0].data;
    // console.log("Ratings >>> ", _ratings);
    setRatings({
      imdb: _ratings.imDb,
      rottenTomatoes: _ratings.rottenTomatoes,
      metacritic: _ratings.metacritic,
      theMovieDb: _ratings.theMovieDb,
      tvCom: _ratings.tV_com,
      filmAffinity: _ratings.filmAffinity,
    });

    const _details = values[1].data;
    // console.log("Details >>> ", _details);
    setDetails({
      title: _details.fullTitle,
      image: _details.image,
      plot: _details.plot,
      genres: _details.genres,
      languages: _details.languages,
      stars: _details.stars,
    });
  });

  // Stop the loader
  setLoading(false);
};
