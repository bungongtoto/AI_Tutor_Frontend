import React from "react";
import CountUp from "react-countup";
import { FaAward } from "react-icons/fa";

const AchievementTile = ({ number }) => {
  return (
    <div className="achievement-tile">
      <div className="achievement-icon">
        <FaAward />
      </div>
      <div className="achievement-text">
        You are enrolled to{" "}
        <span className="achievement-number">
          <CountUp end={number} duration={2.5} />
        </span>
      </div>
    </div>
  );
};

export default AchievementTile;
