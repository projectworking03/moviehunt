import firebase from "firebase";
import { db } from ".";

const addMovieToFirebase = (
  details,
  ratings,
  streamers,
  mhScore,
  othersScore
) => {
  db.collection("movies").doc(details.id.toString()).set({
    details,
    ratings,
    streamers,
    mhScore,
    othersScore,
    userScore: 0,
    lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const checkMovieInFirebase = async (id) => {
  const doesExist = await db
    .collection("movies")
    .doc(id)
    .get()
    .then((doc) => doc.exists);

  return doesExist;
};

export const getMovieFromFirebase = async (
  id,
  setDetails,
  setRatings,
  setStreamers,
  setOthersScore,
  setMhScore,
  setLoading
) => {
  db.collection("movies")
    .doc(id)
    .get()
    .then((doc) => {
      setDetails(doc.data().details);
      setRatings(doc.data().ratings);
      setStreamers(doc.data().streamers);
      setOthersScore(doc.data().othersScore);
      setMhScore(doc.data().mhScore);
      setLoading(false);
    });
};

export default addMovieToFirebase;
