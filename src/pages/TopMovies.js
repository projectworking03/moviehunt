import { useEffect, useState } from "react";

import Header from "../components/Header";
import Movie from "../components/Movie";
import "./TopMovies.css";
import { getTopMovies } from "../firebase/movie";

const n = 25;

const TopMovies = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    getTopMovies(n, setMovies);
  }, []);

  return (
    <>
      <Header />
      <div className="topMovies">
        <h1 className="topMovies__title">Top Rated Movies</h1>
        <div className="topMovies__movies">
          {movies?.map((movie, index) => (
            <Movie key={index} index={index} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TopMovies;
