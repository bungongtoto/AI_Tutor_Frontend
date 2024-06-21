import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../assets/images/AI_TUTOR_Logo.png";
import { useNavigate } from "react-router-dom";

function Header() {
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
        <div>
          <button className="portalBtn" onClick={handlePortalClicked}>
            Portal
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
