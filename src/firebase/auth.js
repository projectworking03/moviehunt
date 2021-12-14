import { auth } from ".";

export const createUser = async (name, email, password) => {
  return await auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) =>
      authUser.user.updateProfile({
        displayName: name,
      })
    )
    .catch((err) => alert(err.message));
};

export const loginUser = async (email, password) => {
  return await auth
    .signInWithEmailAndPassword(email, password)
    .catch((err) => alert(err.message));
};

export const signoutUser = async () => {
  return await auth.signOut();
};
