import "./Streamers.css";

const Streamers = ({ streamers }) => {
  return (
    streamers.length > 0 && (
      <div className="streamers">
        <p className="streamers__label">Streaming On: </p>
        <div className="streamers__value">
          {streamers.map((streamer, index) => (
            <div className="streamers__linkContainer" key={index}>
              <a
                className="streamers__link"
                href={streamer.url}
                target="_blank"
                rel="noreferrer"
              >
                {streamer.provider}
              </a>
              {index !== streamers.length - 1 && ", "}
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Streamers;
