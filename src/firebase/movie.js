import firebase from "firebase";
import { db } from ".";

const addMovieToFirebase = (details, ratings, mhScore, othersScore) => {
  db.collection("movies")
    .doc(details.id.toString())
    .set({
      ...details,
      ratings,
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
  setOthersScore,
  setMhScore,
  setLoading
) => {
  db.collection("movies")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();

      const details = {
        id: data.id,
        imdbId: data.imdbId,
        title: data.title,
        image: data.image,
        backdropImage: data.backdropImage,
        runtime: data.runtime,
        originalLanguage: data.originalLanguage,
        releaseDate: data.releaseDate,
        plot: data.plot,
        genres: data.genres,
        languages: data.languages,
        stars: data.stars,
        tmdbRating: data.tmdbRating,
        streamers: data.streamers,
      };

      setDetails(details);
      setRatings(data.ratings);
      setOthersScore(data.othersScore);
      setMhScore(data.mhScore);
      setLoading(false);
    });
};

export const getTopMovies = async (n, setMovies) => {
  const movies = await db
    .collection("movies")
    .orderBy("mhScore", "desc")
    .orderBy("userScore", "desc")
    .limit(n)
    .get()
    .then((collection) => collection.docs.map((doc) => doc.data()));

  setMovies(movies);
};

export default addMovieToFirebase;
