import React from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

const Statistics = () => {
  return (
    <div className="content_container">
      <h1 className="blue_color_h1">General Statistics</h1>
      <div className="two_side_grid">
        <BarChart />
        <PieChart />
      </div>
      <h1 className="blue_color_h1">Course Enrollment Statistics</h1>
      <BarChart />
    </div>
  );
};

export default Statistics;
