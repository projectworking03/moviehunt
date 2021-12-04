import CircularProgress from "@mui/material/CircularProgress";

import "./Loader.css";

const Loader = ({ size }) => {
  return (
    <div className="loader">
      <CircularProgress size={size} />
    </div>
  );
};

export default Loader;
