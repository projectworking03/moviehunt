import "./Streamers.css";

const Streamers = ({ streamers }) => {
  return (
    streamers?.length > 0 && (
      <div className="streamers">
        <p className="streamers__label">Streaming On: </p>
        <div className="streamers__values">
          {streamers.map((streamer, index) => (
            <div key={index} className="streamers__value">
              <img
                src={streamer.logo}
                alt="Streamer logo"
                className="streamers__logo"
              />
              <p className="streamers__name">
                {streamer.provider}
                {index !== streamers.length - 1 && ", "}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Streamers;
