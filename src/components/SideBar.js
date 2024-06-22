import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoIosSchool,
  IoMdMenu,
  IoMdClose
} from "react-icons/io";
import { FaBeer } from 'react-icons/fa';  
import { MdDashboard } from 'react-icons/md';
import { FaBook , FaChalkboardTeacher} from "react-icons/fa";


// Item component to display each menu item in the sidebar
const Item = ({ title, to, icon, selected, setSelected }) => {
  const navigate = useNavigate();
  return (
    <li
      className={selected === title ? "selected" : ""}
      onClick={() => {
        setSelected(title);
        navigate(to)
      }}
    >
      {icon}
      <Link to={to}>{title}</Link>
    </li>
  );
};

const SideBar = () => {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const activateNav = () => {
    setActive(!active);
  };

  return (
    <div className={active ? "sidebar" : "sidebar-mobile"}>
      <div className="menu-icon" onClick={activateNav}>
        {!active ? (
          <IoMdMenu className="menu" />
        ) : (
          <IoMdClose className="menu" />
        )}
      </div>
      <nav>
        <ul className={active ? "ul-item" : "ul-item oicon"}>
          <Item
            title="Dashboard"
            icon={<MdDashboard className="icon" />}
            to={"/dash"}
            selected={selected}
            setSelected={setSelected}
          />
          
          <Item
            title="Exams"
            icon={<FaBook className="icon" />}
            to={"/dash/exam"}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="My Courses"
            icon={<FaChalkboardTeacher className="icon" />}
            to={"/dash/mycourses"}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Achievements"
            icon={<IoIosSchool className="icon" />}
            to={"/dash/achievement"}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Admin"
            icon={<FaBeer className="icon" />}
            to={"/dash/admin"}
            selected={selected}
            setSelected={setSelected}
          />
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
