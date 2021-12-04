import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./ReviewPage.css";
import { fetchDetailsFromTMDB } from "../utilities/movieDetails";
import fetchRatings from "../utilities/ratings";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Rating from "../components/Rating";

const ReviewPage = () => {
  const [ratings, setRatings] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // console.log("Details >>> ", details);
  // console.log("Ratings >>> ", ratings);

  const isValidId = (_id) => {
    return true;
  };

  /**** Fetch Movie Details and TMDB rating */
  useEffect(() => {
    // ID validation
    if (isValidId(id) === false) navigate(`error`);

    // Fetch data
    fetchDetailsFromTMDB(id, setDetails, setRatings, setLoading);
  }, [id, navigate]);

  /**** Fetch other ratings ****/
  useEffect(() => {
    if (details) {
      fetchRatings(details.title, setRatings);
    }
  }, [details]);

  return (
    <>
      <Header />
      <div className="reviewPage">
        <div className="reviewPage__container">
          {loading ? (
            <Loader size={45} />
          ) : (
            <>
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
                {details.genres && (
                  <p className="reviewPage__genres">
                    <span className="label">Genres: </span>
                    {details.genres}
                  </p>
                )}

                {/* Languages */}
                {details.languages && (
                  <p className="reviewPage__languages">
                    <span className="label">Languages: </span>
                    {details.languages}
                  </p>
                )}

                {/* Stars */}
                {details.stars && (
                  <div className="reviewPage__stars">
                    <span className="label">Starring: </span>
                    {details.stars}
                  </div>
                )}

                {/* Ratings */}
                <div className="reviewPage__ratings">
                  <h4>Ratings:</h4>

                  <table cellSpacing={0}>
                    <tbody>
                      {Object.keys(ratings).map((name, index) => (
                        <Rating key={index} name={name} value={ratings[name]} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
