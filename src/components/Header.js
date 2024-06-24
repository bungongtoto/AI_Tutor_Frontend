import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../assets/images/AI_TUTOR_Logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import {  IoMdMenu, IoMdClose } from "react-icons/io";
import { GrPersonalComputer } from "react-icons/gr";

const AUTH_REGEX = /^\/auth(\/)?$/;
const SIGNUP_REGEX = /^\/auth\/signup(\/)?$/;
const RSP_REGEX = /^\/auth\/resetpassword(\/)?$/;

function Header() {
  const [show, setShow] = useState(true);
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (
      AUTH_REGEX.test(pathname) ||
      SIGNUP_REGEX.test(pathname) ||
      RSP_REGEX.test(pathname)
    ) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [setShow, pathname]);

  const navigate = useNavigate();
  const handleGoToHome = () => {
    navigate("/");
  };
  const handlePortalClicked = () => {
    navigate("/auth");
  };
  return (
    <header className="home_header">
      <div className="home_header_container ">
        <div className="logo_container">
          <LazyLoadImage
            onClick={handleGoToHome}
            className="logo"
            src={logo}
            width={"150px"}
            height={"50px"}
            alt="AI Tutor Logo"
          />
        </div>
        <button className="menu_button" onClick={toggleMenu}>
        {!menuOpen ? (
          <IoMdMenu className="icon" />
        ) : (
          <IoMdClose className="icon" />
        )} 
        </button>
        <div className={`header-nav ${menuOpen ? "open-nav" : ""}`}>
          <nav>
            <ul>
              <li onClick={handleGoToHome}>
                <a>HOME</a>
              </li>
              {show && (
                <>
                  <li>
                    <a href="#aboutus">ABOUT</a>
                  </li>
                  <li>
                    <a href="#objectives">OBJECTIVES</a>
                  </li>
                  <li>
                    <a href="#team">TEAM</a>
                  </li>
                  <li>
                    <a href="#footer">CONTACT</a>
                  </li>
                  <li>
                    <a href="#numbers">NUMBERS</a>
                  </li>
                  <li>
                   { show && <div>
                      <button
                      title="Portal"
                        className="portalBtn"
                        onClick={handlePortalClicked}
                      >
                        <GrPersonalComputer />
                      </button>
                    </div>}
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
        
      </div>
    </header>
  );
}

export default Header;
