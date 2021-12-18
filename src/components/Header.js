import { useNavigate } from "react-router";

import "./Header.css";
import Search from "./Search";
import Avatar from "./Avatar";
import Navbar from "./Navbar";

const Header = () => {
  const navigate = useNavigate();

  const handleBrandClick = () => {
    navigate(`/`);
  };

  return (
    <div className="header">
      <div className="header__branding" onClick={handleBrandClick}>
        <h1>MovieHunt</h1>
      </div>

      <Search header />

      <div className="header__right">
        <Navbar />
        <Avatar />
      </div>
    </div>
  );
};

export default Header;
