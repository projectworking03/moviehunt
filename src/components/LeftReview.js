import "./LeftReview.css";

const LeftReview = ({ details, mhScore }) => {
  return (
    <div className="leftReview">
      <img src={details.image} alt="Movie Poster" />
    </div>
  );
};

export default LeftReview;
