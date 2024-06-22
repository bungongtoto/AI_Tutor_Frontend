import { React } from "react";

const HeadingTile = ({ title}) => {
    return (
        <div className="heading-tile">
          <h1 className="heading-title">{title}</h1>
        </div>
      );
};

export default HeadingTile;
