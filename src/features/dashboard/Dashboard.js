import { React, useState } from "react";
import useAuth from "../../hooks/useAuth";
import AIContainer from "../ai/AIContainer";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../../assets/images/achievementPage_lion.png";
import HeadingTile from "../../components/HeadingTile";
import GeneralStats from "../statistics/GeneralStats";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { email } = useAuth();
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <>
      <div className="content_container">
        <HeadingTile title={"Welcome To Your Dashboard"} />
        <div className="two_side_grid">
          <div className="content_container gap">
            <h1 className="blue_color_h1">Hello Welcome...</h1>
            <h2>User: {email}.</h2>
            <h2>AI Titor</h2>
          </div>
          <LazyLoadImage
            src={logo}
            className="floating-image home-image"
            width={"400px"}
            height={"490px"}
            alt=""
          />
        </div>
        <hr />
        <GeneralStats />
        <button className="ai-chat-button" onClick={toggleSidebar}>
          AI Tutor
        </button>
        <div className={`ai-sidebar ${isSidebarOpen ? "open" : ""}`}>
          <AIContainer closeSidebar={closeSidebar} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
