import React from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import UserEnrollmentStats from "./UserEnrollmentStats";
import GeneralStats from "./GeneralStats";


const Statistics = () => {
  return (
    <div className="content_container">
      <GeneralStats />
      <h1 className="blue_color_h1">General Statistics</h1>
      <div className="two_side_grid">
        <BarChart />
        <PieChart />
      </div>
      <h1 className="blue_color_h1">Course Enrollment Statistics</h1>
      <UserEnrollmentStats />
    </div>
  );
};

export default Statistics;
