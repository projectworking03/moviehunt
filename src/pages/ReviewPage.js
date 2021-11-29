import { useEffect, useState } from "react";
import axios from "axios";

import "./ReviewPage.css";
import Header from "../components/Header";
import Ratings from "../components/Ratings";
// import { ratingsData, detailsData } from "../data";
import { useParams, useNavigate } from "react-router-dom";

/*
  Structure of ratings: { imdb, rottenTomatoes, metacritic }
  Structure of details: { title, image, plot, genres, languages, stars }
*/

const ReviewPage = () => {
  const [ratings, setRatings] = useState(null);
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const isValidId = (_id) => {
    if (_id.length < 2) {
      return false;
    } else if (_id.substr(0, 2).localeCompare("tt") !== 0) {
      return false;
    } else {
      return true;
    }
  };

  // IMDB API Call
  useEffect(() => {
    const fetchData = async () => {
      // Validate the ID
      if (isValidId(id) === false) navigate(`error`);

      // Fetch the ratings
      const ratingsPromise = axios.get(
        `https://imdb-api.com/en/API/Ratings/${process.env.REACT_APP_IMDB_API_KEY}/${id}`
      );

      // Fetch the details
      const detailsPromise = axios.get(
        `https://imdb-api.com/en/API/Title/${process.env.REACT_APP_IMDB_API_KEY}/${id}`
      );

      // Update the state
      Promise.all([ratingsPromise, detailsPromise]).then((values) => {
        const _ratings = values[0].data;
        console.log(_ratings);
        setRatings({
          imdb: _ratings.imDb,
          rottenTomatoes: _ratings.rottenTomatoes,
          metacritic: _ratings.metacritic,
          theMovieDb: _ratings.theMovieDb,
          tvCom: _ratings.tV_com,
          filmAffinity: _ratings.filmAffinity,
        });

        const _details = values[1].data;
        setDetails({
          title: _details.fullTitle,
          image: _details.image,
          plot: _details.plot,
          genres: _details.genres,
          languages: _details.languages,
          stars: _details.stars,
        });
      });
    };

    fetchData();
  }, [id, navigate]);

  // // OMDB API Call
  // useEffect(() => {
  //   const fetchData = async () => {
  //     // Validate the ID
  //     if (isValidId(id) === false) navigate(`error`);

  //     // Fetch data from API
  //     await axios
  //       .get(
  //         `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${id}`
  //       )
  //       .then((res) => {
  //         setDetails(res.data);
  //         setRatings(res.data.Ratings);
  //       });
  //   };

  //   fetchData();
  // }, [id]);

  return (
    <>
      <Header />

      <div className="reviewPage">
        <div className="reviewPage__container">
          {/* Image */}
          <div className="reviewPage__image">
            <img src={details.image} alt="Movie Poster" />
          </div>

          {/* Details */}
          <div className="reviewPage__details">
            {/* Title */}
            <h1 className="reviewPage__title">{details.title}</h1>

            {/* Plot */}
            <p className="reviewPage__plot">{details.plot}</p>

            {/* Genres */}
            <p className="reviewPage__genres">
              <span className="label">Genres: </span>
              {details.genres}
            </p>

            {/* Languages */}
            <p className="reviewPage__languages">
              <span className="label">Languages: </span>
              {details.languages}
            </p>

            {/* Stars */}
            <div className="reviewPage__stars">
              <span className="label">Starring: </span>
              {details.stars}
            </div>

            {/* Ratings */}
            <div className="reviewPage__ratings">
              <h4>Ratings:</h4>
              <Ratings ratings={ratings} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
