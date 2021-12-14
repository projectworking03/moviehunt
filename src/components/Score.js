import "./Score.css";

const Score = ({ title, value, lastCell }) => {
  return (
    <div className="score">
      <div className="score__container">
        <div className="score__title">{title}</div>
        <div className="score__value">{value}</div>
      </div>

      {!lastCell && <div className="score__divider"></div>}
    </div>
  );
};

export default Score;
