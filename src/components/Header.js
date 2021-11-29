import { useNavigate } from "react-router";

import "./Header.css";
import Search from "./Search";

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

      <div className="header__search">
        <Search header />
      </div>
    </div>
  );
};

export default Header;
