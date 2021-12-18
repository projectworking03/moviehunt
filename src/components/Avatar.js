import { useEffect, useState } from "react";

import { auth } from "../firebase";
import { signoutUser } from "../firebase/auth";
import "./Avatar.css";
import Modal from "./Modal";

const Avatar = () => {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(null);

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

  // const displayName = (name) => name.split(" ")[0];

  const openModal = () => setModal(true);

  return (
    <div className="avatar">
      {modal && <Modal setOpen={setModal} />}

      {user ? (
        <div className="avatar__logoutContainer">
          {/* <p className="avatar__greet">
            Welcome, {displayName(user.displayName)}!
          </p> */}
          <button className="avatar__signIn" onClick={signoutUser}>
            Logout
          </button>
        </div>
      ) : (
        <button className="avatar__signIn" onClick={openModal}>
          Sign In
        </button>
      )}
    </div>
  );
};

export default Avatar;
