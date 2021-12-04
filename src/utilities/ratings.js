import axios from "axios";

/*
 * Ratings: { imdb, rottenTomatoes, metacritic }
 */

const fetchRatings = async (title, setRatings) => {
  await scrapeGoogle(title, setRatings);
};

const scrapeGoogle = async (title, setRatings) => {
  // Form the URL
  //   const url = `https://www.google.com/search?q=${encodeURI(title)}`;

  const url = "https://www.imdb.com/title/tt0242519/";

  // Call the URL
  axios
    .get(url)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log("Scraping Error >>> ", err.message));
};

export default fetchRatings;
