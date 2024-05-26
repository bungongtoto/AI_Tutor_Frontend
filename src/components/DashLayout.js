import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const DashLayout = () => {
  return (
    <>
      <main className="app">
        <SideBar />
        <div className="dash-container">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default DashLayout;
