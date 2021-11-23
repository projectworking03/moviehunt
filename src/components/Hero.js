import React from "react";
import "./Hero.css";
import Search from "./Search";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero__overlay">
        {/* Branding */}
        <div className="hero__branding">
          <h1>
            <span>M</span>ovie<span>H</span>unt
          </h1>
          <h3>
            Search movies and analyse their reviews by the most prominent sites
            of the world!
          </h3>
        </div>

        {/* Search Container */}
        <div className="hero__search">
          <h4>Enter a movie name to get its reviews!</h4>
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Hero;
