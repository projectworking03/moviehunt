import "./MovieDetail.css";

const MovieDetail = ({ label, value }) => {
  return (
    value && (
      <p className="movieDetail">
        <span>{label}: </span>
        {value}
      </p>
    )
  );
};

export default MovieDetail;
