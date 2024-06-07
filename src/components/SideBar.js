import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IoMdImage,
  IoIosSchool,
  IoIosBulb,
  IoMdSettings,
  IoMdMenu,
  IoMdClose,
  IoIosBody
} from "react-icons/io";

// Item component to display each menu item in the sidebar
const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <li className={selected === title ? "selected" : ""} onClick={() => setSelected(title)} >
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
            icon={<IoMdImage className="icon" />}
            to={"/dash"}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Achievements"
            icon={<IoIosSchool className="icon" />}
            to={""}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Exams"
            icon={<IoIosSchool className="icon" />}
            to={""}
            selected={selected}
            setSelected={setSelected}
          />
           <Item
            title="My Courses"
            icon={<IoIosBulb className="icon" />}
            to={""}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Settings"
            icon={<IoMdSettings className="icon" />}
            to={""}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Admin"
            icon={<IoIosBody className="icon" />}
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
