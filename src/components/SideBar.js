import React, { useState } from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import {
  IoMdImage,
  IoIosSchool,
  IoIosBulb,
  IoMdSettings,
  IoMdMenu,
  IoMdClose,
} from "react-icons/io";

const SideBar = () => {
  const [active, setActive] = useState(false);

  const activateNav = () => {
    setActive(!active);
  };

  return (
    <div className={active ? "sidebar" : "sidebar-mobile"}>
      <div className="menu-icon" onClick={activateNav}>
        {!active ? <IoMdMenu className="menu" /> : <IoMdClose className="menu" /> }
      </div>
      <nav>
        <ul className={active ? "ul-item" : "ul-item oicon"}>
          <li>
            <IoMdImage className="icon" />
            <Link to={""}>Alumni</Link>
          </li>
          <li>
            <IoIosSchool className="icon" />
            <Link to={""}>Achievements</Link>
          </li>
          <li>
            <IoIosBulb className="icon" />
            <Link to={""}>Courses</Link>
          </li>
          <li>
            <IoMdSettings className="icon" />
            <Link to={""}>Settings</Link>
          </li>
          <li>
            <IoMdImage className="icon" />
            <Link to={""}>Alumni</Link>
          </li>
          <li>
            <IoMdImage className="icon" />
            <Link to={""}>Alumni</Link>
          </li>
          <li>
            <IoMdImage className="icon" />
            <Link to={""}>Alumni</Link>
          </li>
          <li>
            <IoMdImage className="icon" />
            <Link to={""}>Alumni</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
