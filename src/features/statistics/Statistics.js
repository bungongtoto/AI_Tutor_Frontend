import React from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import UserEnrollmentStats from "./UserEnrollmentStats";
import GeneralStats from "./GeneralStats";
import HeadingTile from "../../components/HeadingTile";


const Statistics = () => {
  return (
    <div className="content_container">
      <HeadingTile title={"System Statistics"} />
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
