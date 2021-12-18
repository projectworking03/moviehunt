import React from "react";
import Hero from "../components/Hero";
import HomeHeader from "../components/HomeHeader";

const HomePage = () => {
  return (
    <div className="homePage">
      <HomeHeader />
      <Hero />
    </div>
  );
};

export default HomePage;
