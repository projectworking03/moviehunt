import { useState, useEffect } from "react";

import "./RatingForm.css";
import { auth } from "../firebase";
import {
  addUserRating,
  getUserRating,
  updateMhScore,
  updateUserScore,
} from "../firebase/ratings";

const RatingForm = ({ movieId }) => {
  const [user, setUser] = useState(null);
  const [userRating, setUserRating] = useState("");

  // Listening for authentication change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(authUser);
      }
    });

    return () => unsubscribe();
  }, []);

  // Set default value of user rating to previously given rating (if any)

  useEffect(() => {
    const setRatingToDefault = async () => {
      const prevRating = await getUserRating(movieId, user.uid);
      setUserRating(prevRating);
    };

    if (user) {
      setRatingToDefault();
    } else {
      setUserRating("");
    }
  }, [user, movieId]);

  // Rating submitted
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add the rating to the database
    await addUserRating(userRating, movieId, user.uid);
    alert("Thank you for your response!");

    // Update the UserScore and the MHScore
    await updateUserScore(movieId);
    await updateMhScore(movieId);
  };

  // Input handler function
  const handleInput = (e) => {
    setUserRating(e.target.value);
  };

  return user ? (
    <div className="ratingForm">
      <h4 className="ratingForm__title">Watched the movie?</h4>
      <form className="ratingForm__form" onSubmit={handleSubmit}>
        <label className="ratingForm__subtitle">
          Rate it in a scale of 1 to 10
        </label>
        <input
          type="number"
          min={1}
          max={10}
          step={1}
          required
          className="ratingForm__input"
          value={userRating}
          onChange={handleInput}
        />
        <button className="ratingForm__btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  ) : (
    <p className="ratingForm__inviteMsg">
      Watched the movie? Login to give your rating!
    </p>
  );
};

export default RatingForm;
