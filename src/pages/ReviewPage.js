import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./ReviewPage.css";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Subtitle from "../components/Subtitle";
import Rating from "../components/Rating";
import { fetchDetailsFromTMDB } from "../fetch-data/movieDetails";
import fetchRatings from "../fetch-data/ratings";
import addMovieToFirebase, { checkMovieInFirebase } from "../firebase/addMovie";
import { db } from "../firebase";

const ReviewPage = () => {
  const [ratings, setRatings] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [existsInFirebase, setExistsInFirebase] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // console.log("Details >>> ", details);
  // console.log("Ratings >>> ", ratings);

  const isValidId = (_id) => {
    return true;
  };

  /**** Check for movie in Firebase ****/
  useEffect(() => {
    const fetchData = async () => {
      // ID validation
      if (isValidId(id) === false) navigate(`error`);

      // Start Loader
      setLoading(true);

      // Check in firebase
      const doesExist = await checkMovieInFirebase(id);
      setExistsInFirebase(doesExist);

      // If exists in Firebase, fetch from Firebase
      if (doesExist) {
        db.collection("movies")
          .doc(id)
          .onSnapshot((doc) => {
            setDetails(doc.data().details);
            setRatings(doc.data().ratings);
            setLoading(false);
          });
      } else {
        fetchDetailsFromTMDB(id, setDetails);
      }
    };

    fetchData();
  }, [id, navigate]);

  // console.log(details);

  /**** Fetch Ratings ****/
  useEffect(() => {
    if (details && !existsInFirebase) {
      fetchRatings(details, setRatings, setLoading);
    }
  }, [existsInFirebase, details]);

  /**** Add details and ratings to Firebase */
  useEffect(() => {
    if (details && ratings && !existsInFirebase) {
      addMovieToFirebase(details, ratings);
    }
  }, [details, ratings, existsInFirebase]);

  return (
    <>
      <Header />
      <div className="reviewPage">
        <div
          className="reviewPage__container"
          // style={{ backgroundUrl: details?.backdropImage }}
        >
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

                {/* Subtitle */}
                <Subtitle details={details} />

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
                    <span className="label">Available in: </span>
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
                      {ratings?.map((rating, index) => (
                        <Rating
                          key={index}
                          provider={rating.provider}
                          value={rating.value}
                        />
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
