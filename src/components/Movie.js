import { useNavigate } from "react-router-dom";

import "./Movie.css";
import { truncate } from "../utilities/string";
import Subtitle from "./Subtitle";

const Movie = ({ movie, index }) => {
  const navigate = useNavigate();

  const handleReviewClick = () => {
    navigate(`/review/${movie.id}`);
  };

  return (
    <div className="movie">
      <div className="movie__serialNo">{index + 1}. </div>

      <div className="movie__content">
        <img src={movie.image} alt="Movie Poster" className="movie__image" />

        <div className="movie__text">
          <div className="movie__header">
            <h2 className="movie__title">{movie.title}</h2>
            <p className="movie__category">{movie.genres}</p>
          </div>

          <Subtitle details={movie} />

          <p className="movie__plot">{truncate(movie.plot, 200)}</p>

          {movie.stars && (
            <p className="movie__detail">
              <span className="label">Starring: </span>
              {movie.stars}
            </p>
          )}

          {movie.streamers && (
            <p className="movie__streamers">
              <span className="label">Streaming on: </span>
              {movie.streamers.map((streamer, index) => (
                <img
                  key={index}
                  src={streamer.logo}
                  alt="Logo"
                  className="movie__streamerLogo"
                />
              ))}
            </p>
          )}

          <div className="movie__footer">
            <div className="movie__ratings">
              <p className="movie__rating">
                <span className="movie__ratingLabel">MovieHunt Score: </span>
                <span className="movie__ratingValue">{movie.mhScore}</span>
              </p>
              <p className="movie__rating">
                <span className="movie__ratingLabel">Users Rating: </span>
                <span className="movie__ratingValue">{movie.userScore}</span>
              </p>
            </div>

            <div className="movie__reviewBtn" onClick={handleReviewClick}>
              Check Full Review &gt;&gt;{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
