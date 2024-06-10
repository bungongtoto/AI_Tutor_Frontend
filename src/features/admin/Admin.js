import React from "react";
import {
  IoIosGlobe,
  IoIosListBox,
  IoLogoBuffer,
  IoMdAlbums,
  IoIosContacts, 
  IoMdStats 
} from "react-icons/io";
import { useNavigate } from "react-router-dom";

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
        <div className="admin_stats_container"></div>
        <div className="admin_2nd_container">
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
              to={""}
            />
            <AdminNavTile
              title={"Papers"}
              icon={<IoMdAlbums className="icon" />}
              to={""}
            />
            <AdminNavTile
              title={"Questions"}
              icon={<IoIosListBox className="icon" />}
              to={""}
            />
            <AdminNavTile
              title={"Statistics"}
              icon={<IoMdStats className="icon" />}
              to={""}
            />
          </div>
          <div className="admin_chart_container"></div>
        </div>
      </div>
    </>
  );
};

export default Admin;
