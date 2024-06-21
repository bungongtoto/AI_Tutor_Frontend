import React from 'react'

const MissionTile = ({ icon, title }) => {
    return (
        <div className="mission_tile">
          <div className="mission_tile-icon">
            {icon} 
          </div>
          <div className="mission_tile-title">
            {title}
          </div>
        </div>
      );
}

export default MissionTile