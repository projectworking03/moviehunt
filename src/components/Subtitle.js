import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import LanguageIcon from "@mui/icons-material/Language";

import { convertMinsToHours, extractYearFromYyyyMmDd } from "../utilities/time";
import { convertIsoToLanguage } from "../utilities/languageCodes";
import "./Subtitle.css";

const Subtitle = ({ details }) => {
  return (
    <div className="subtitle">
      {/* Runtime */}
      {details.runtime && (
        <div className="subtitle__cell">
          <AccessTimeIcon className="subtitle__cellIcon" />
          <p className="subtitle__cellText">
            {convertMinsToHours(details.runtime)}
          </p>
        </div>
      )}

      {/* Release Year */}
      {details.releaseDate && (
        <div className="subtitle__cell">
          <EventIcon className="subtitle__cellIcon" />
          <p className="subtitle__cellText">
            {extractYearFromYyyyMmDd(details.releaseDate)}
          </p>
        </div>
      )}

      {/* Language */}
      {details.originalLanguage && (
        <div className="subtitle__cell">
          <LanguageIcon className="subtitle__cellIcon" />
          <p className="subtitle__cellText">
            {convertIsoToLanguage(details.originalLanguage)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Subtitle;
