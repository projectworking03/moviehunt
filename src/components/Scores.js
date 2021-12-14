import { useEffect, useState } from "react";
import { db } from "../firebase";
import Score from "./Score";
import "./Scores.css";

const Scores = ({ movieId }) => {
  const [userScore, setUserScore] = useState(0);
  const [mhScore, setMhScore] = useState(0);

  useEffect(() => {
    db.collection("movies")
      .doc(movieId.toString())
      .onSnapshot((doc) => setUserScore(doc.data().userScore));
  }, [movieId]);

  useEffect(() => {
    db.collection("movies")
      .doc(movieId.toString())
      .onSnapshot((doc) => setMhScore(doc.data().mhScore));
  }, [movieId]);

  return (
    <div className="scores">
      <Score title="MovieHunt Score" value={mhScore} />
      <Score title="MH Users Rating" value={userScore} lastCell />
    </div>
  );
};

export default Scores;
