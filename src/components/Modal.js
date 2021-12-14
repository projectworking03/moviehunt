import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

import "./Modal.css";
import { createUser, loginUser } from "../firebase/auth";

const Modal = ({ setOpen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      await createUser(name, email, password);
    } else {
      await loginUser(email, password);
    }

    setOpen(false);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const switchModal = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className="modal__overlay">
      <div className="modal">
        <div className="modal__titleContainer">
          <h2 className="modal__title">
            {isSignUp ? "Create a New Account" : "Login to Your Account"}
          </h2>
          <CloseIcon className="modal__closeIcon" onClick={closeModal} />
        </div>

        <form className="modal__form" onSubmit={handleSubmit}>
          {isSignUp ? (
            <div className="modal__inputContainer">
              <input
                type="text"
                className="modal__input"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <PersonIcon className="modal__inputIcon" />
            </div>
          ) : (
            <></>
          )}

          <div className="modal__inputContainer">
            <input
              type="email"
              className="modal__input"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <EmailIcon className="modal__inputIcon" />
          </div>

          <div className="modal__inputContainer">
            <input
              type="password"
              className="modal__input"
              placeholder="Enter the password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <LockIcon className="modal__inputIcon" />
          </div>

          <button type="submit" className="modal__signUp">
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="modal__switch">
          {isSignUp ? (
            <>
              Already have an account? <span onClick={switchModal}>Log In</span>
            </>
          ) : (
            <>
              Don't have an account? <span onClick={switchModal}>Sign Up</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Modal;
