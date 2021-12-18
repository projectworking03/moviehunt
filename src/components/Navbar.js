import { useNavigate } from "react-router";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar__item" onClick={() => navigate("/top-movies")}>
        <p>Top Movies</p>
      </div>
    </div>
  );
};

export default Navbar;
