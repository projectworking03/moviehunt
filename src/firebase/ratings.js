import { db } from ".";

export const addUserRating = async (rating, movieId, userId) => {
  // Store the user ID and the rating gave by him
  return await db
    .collection("movies")
    .doc(movieId.toString())
    .collection("user-ratings")
    .doc(userId)
    .set({
      rating,
    });
};

export const getUserRating = async (movieId, userId) => {
  return await db
    .collection("movies")
    .doc(movieId.toString())
    .collection("user-ratings")
    .doc(userId)
    .get()
    .then((doc) => (doc.data() ? doc.data().rating : ""));
};

export const updateUserScore = async (movieId) => {
  const sum = await db
    .collection("movies")
    .doc(movieId.toString())
    .collection("user-ratings")
    .get()
    .then((collection) =>
      collection.docs.reduce(
        (s, doc) => s + parseInt(doc.data().rating) * 10,
        0
      )
    );

  const size = await db
    .collection("movies")
    .doc(movieId.toString())
    .collection("user-ratings")
    .get()
    .then((collection) => collection.size);

  let aggregate;
  if (size === 0) {
    aggregate = 0;
  } else {
    aggregate = parseInt(sum / size);
  }

  return db.collection("movies").doc(movieId.toString()).set(
    {
      userScore: aggregate,
    },
    { merge: true }
  );
};

export const updateMhScore = async (movieId) => {
  // Get the other ratings score
  const othersScorePromise = db
    .collection("movies")
    .doc(movieId.toString())
    .get()
    .then((doc) => parseInt(doc.data().othersScore));

  // Get the size of the other ratings
  const othersSizePromise = db
    .collection("movies")
    .doc(movieId.toString())
    .get()
    .then((doc) => doc.data().ratings.length);

  // Get the user score
  const userScorePromise = db
    .collection("movies")
    .doc(movieId.toString())
    .get()
    .then((doc) => doc.data().userScore);

  const aggregate = await Promise.all([
    othersScorePromise,
    othersSizePromise,
    userScorePromise,
  ]).then((values) => {
    const othersScore = values[0];
    const othersSize = values[1];
    const userScore = values[2];

    const othersSum = othersScore * othersSize;
    const totalSum = othersSum + userScore;
    const totalSize = othersSize + 1;
    return parseInt(totalSum / totalSize);
  });

  // Update the MH Score
  db.collection("movies").doc(movieId.toString()).set(
    {
      mhScore: aggregate,
    },
    {
      merge: true,
    }
  );
};
