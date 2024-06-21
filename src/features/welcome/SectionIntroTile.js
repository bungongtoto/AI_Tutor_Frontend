import React from "react";

const SectionIntroTile = ({title}) => {
  return (
    <>
      <div className="section_intro_head">
        <div className="section_intro_head_line"></div>
        <h1 className="blue_color_h1">{title}</h1>
        <div className="section_intro_head_line"></div>
      </div>
      <hr />
    </>
  );
};

export default SectionIntroTile;
