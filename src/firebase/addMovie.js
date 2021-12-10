import { db } from ".";

const addMovieToFirebase = (details, ratings) => {
  db.collection("movies").doc(details.id.toString()).set({
    details,
    ratings,
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

export default addMovieToFirebase;
