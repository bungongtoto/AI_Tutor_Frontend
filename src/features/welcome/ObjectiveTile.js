import React from 'react'

const ObjectiveTile = ({title, objective, number}) => {
    return (
        <div className="objective_tile">
          <div className="objective_tile-number">
            {number}
          </div>
          <div className="objective_tile-content">
            <div className="objective_tile-title">{title}</div>
            <div className="objective_tile-description paragraph">
             {objective}
            </div>
          </div>
        </div>
      );
}

export default ObjectiveTile