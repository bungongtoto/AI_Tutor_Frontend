import React from "react";
import {
  IoIosGlobe,
  IoIosListBox,
  IoLogoBuffer,
  IoMdAlbums,
  IoIosContacts,
  IoMdStats,
} from "react-icons/io";
import { useNavigate } from "react-router-dom";
import GeneralStats from "../statistics/GeneralStats";
import BarChart from "../statistics/BarChart";
import HeadingTile from "../../components/HeadingTile";

const AdminNavTile = ({ title, to, icon }) => {
  const navigate = useNavigate();
  return (
    <button className="admin_nav_button" onClick={() => navigate(to)}>
      <h1>{title}</h1>
      {icon}
    </button>
  );
};

const Admin = () => {
  return (
    <>
      <div className="content_container">
        <HeadingTile title={"Welcome To The Admin's Dashboard"} />
        <GeneralStats />

        <div className="two_side_grid">
          <div className="admin_nav_container">
            <AdminNavTile
              title={"Users"}
              icon={<IoIosContacts className="icon" />}
              to={"/dash/admin/users"}
            />
            <AdminNavTile
              title={"Exams"}
              icon={<IoIosGlobe className="icon" />}
              to={"/dash/admin/exams"}
            />
            <AdminNavTile
              title={"Courses"}
              icon={<IoLogoBuffer className="icon" />}
              to={"/dash/admin/courses"}
            />
            <AdminNavTile
              title={"Papers"}
              icon={<IoMdAlbums className="icon" />}
              to={"/dash/admin/papers"}
            />
            <AdminNavTile
              title={"Questions"}
              icon={<IoIosListBox className="icon" />}
              to={"/dash/admin/questions"}
            />
            <AdminNavTile
              title={"Statistics"}
              icon={<IoMdStats className="icon" />}
              to={"/dash/admin/statistics"}
            />
          </div>

       
            <BarChart />
          
        </div>
      </div>
    </>
  );
};

export default Admin;
