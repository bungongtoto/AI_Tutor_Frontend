import React from 'react';
import CountUp from 'react-countup';


const StatTile = ({ title, icon, number }) => {
    return (
        <div className="stat-tile">
          <div className="stat-title">{title}</div>
          <div className="stat-icon">{icon}</div>
          <div className="stat-number">
            <CountUp end={number} duration={2.5} />
          </div>
        </div>
      );
}

export default StatTile