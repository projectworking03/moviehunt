import "./Ratings.css";

const Ratings = ({ ratings }) => {
  return (
    <div className="ratings">
      {/* Websites */}
      <div className="ratings__websites">
        {ratings?.imdb && <p>IMDB</p>}
        {ratings?.rottenTomatoes && <p>Rotten Tomatoes</p>}
        {ratings?.metacritic && <p>Metacritic</p>}
        {ratings?.theMovieDb && <p>TheMovieDb</p>}
        {ratings?.tvCom && <p>TV.com</p>}
        {ratings?.filmAffinity && <p>FilmAffinity</p>}
      </div>

      {/* Ratings */}
      <div className="ratings__ratings">
        {ratings?.imdb && <p>{ratings?.imdb} / 10</p>}
        {ratings?.rottenTomatoes && <p>{ratings?.rottenTomatoes}%</p>}
        {ratings?.metacritic && <p>{ratings?.metacritic} / 100</p>}
        {ratings?.theMovieDb && <p>{ratings?.theMovieDb} / 10</p>}
        {ratings?.tvCom && <p>{ratings?.tvCom} / 10</p>}
        {ratings?.filmAffinity && <p>{ratings?.filmAffinity} / 10</p>}
      </div>
    </div>
  );
};

export default Ratings;
