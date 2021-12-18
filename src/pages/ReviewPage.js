import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./ReviewPage.css";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Subtitle from "../components/Subtitle";
import Ratings from "../components/Ratings";
import LeftReview from "../components/LeftReview";
import MovieDetail from "../components/MovieDetail";
import Streamers from "../components/Streamers";
import { fetchDetailsFromTMDB } from "../fetch-data/movieDetails";
import fetchRatings from "../fetch-data/ratings";
import addMovieToFirebase, {
  checkMovieInFirebase,
  getMovieFromFirebase,
} from "../firebase/movie";

const ReviewPage = () => {
  const [ratings, setRatings] = useState(null);
  const [details, setDetails] = useState(null);
  const [mhScore, setMhScore] = useState(0);
  const [othersScore, setOthersScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [existsInFirebase, setExistsInFirebase] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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
        getMovieFromFirebase(
          id,
          setDetails,
          setRatings,
          setOthersScore,
          setMhScore,
          setLoading
        );
      } else {
        fetchDetailsFromTMDB(id, setDetails);
      }
    };

    fetchData();
  }, [id, navigate]);

  /**** Fetch Ratings ****/
  useEffect(() => {
    if (details && !existsInFirebase) {
      fetchRatings(details, setRatings, setMhScore, setOthersScore, setLoading);
    }
  }, [existsInFirebase, details]);

  /**** Add details, ratings, streamers and mhscore to Firebase */
  useEffect(() => {
    if (details && ratings && !existsInFirebase) {
      addMovieToFirebase(details, ratings, mhScore, othersScore);
    }
  }, [details, ratings, mhScore, othersScore, existsInFirebase]);

  return (
    <>
      <Header />
      <div className="reviewPage">
        <div
          className="reviewPage__container"
          style={{ backgroundUrl: details?.backdropImage }}
        >
          {loading ? (
            <Loader size={45} />
          ) : (
            <>
              <LeftReview details={details} mhScore={mhScore} />

              {/* Details */}
              <div className="reviewPage__details">
                <h1 className="reviewPage__title">{details.title}</h1>

                <Subtitle details={details} />

                <p className="reviewPage__plot">{details.plot}</p>

                <MovieDetail label="Genres" value={details.genres} />
                {/* <MovieDetail label="Languages" value={details.languages} /> */}
                <MovieDetail label="Starring" value={details.stars} />

                <Streamers streamers={details.streamers} />

                <h2 className="reviewPage__ratingsTitle">Ratings:</h2>
                <Ratings
                  details={details}
                  ratings={ratings}
                  mhScore={mhScore}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
