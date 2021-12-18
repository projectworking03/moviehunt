import Avatar from "./Avatar";
import "./HomeHeader.css";
import Navbar from "./Navbar";

const HomeHeader = () => {
  return (
    <div className="homeHeader">
      <div className="homeHeader__container">
        <div className="homeHeader__left">
          <h1 className="homeHeader__branding">
            <span>M</span>ovie<span>H</span>unt
          </h1>
        </div>

        <div className="homeHeader__right">
          <Navbar />
          <Avatar />
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
