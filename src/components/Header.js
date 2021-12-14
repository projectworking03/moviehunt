import { useNavigate } from "react-router";

import "./Header.css";
import Search from "./Search";
import Avatar from "./Avatar";

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
      <Avatar />
    </div>
  );
};

export default Header;
