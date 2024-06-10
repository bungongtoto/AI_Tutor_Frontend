import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import DashHeader from "./DashHeader";

const DashLayout = () => {
  return (
    <>
      <main className="app">
        <SideBar />
        <div className="dash-container">
        <DashHeader />
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default DashLayout;
