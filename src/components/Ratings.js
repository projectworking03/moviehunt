import "./Ratings.css";
import Rating from "./Rating";
import Scores from "./Scores";
import RatingForm from "./RatingForm";

const Ratings = ({ details, ratings, mhScore }) => {
  return (
    <div className="ratings">
      <table className="ratings__left" cellSpacing={0}>
        <tbody>
          {ratings?.map((rating, index) => (
            <Rating
              key={index}
              provider={rating.provider}
              value={rating.value}
            />
          ))}
        </tbody>
      </table>

      <div className="ratings__right">
        <Scores movieId={details.id} />
        <RatingForm movieId={details.id} />
      </div>
    </div>
  );
};

export default Ratings;
