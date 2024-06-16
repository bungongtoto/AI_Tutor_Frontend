import React from 'react'
import useAuth from "../../hooks/useAuth";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../../assets/images/achievementPage_lion.png";

const Achievement = () => {
    const { email } = useAuth();
    return (
        <>
          <div className="content_container">
            <div className="two_side_grid">
              <div className="content_container">
                <h1 className="blue_color_h1">
                  Hello Welcome...
                </h1>
                <p>User: {email}.</p>
                <h2>To AI Tutor</h2>
              </div>
              <LazyLoadImage
                src={logo}
                className="floating-image"
                width={"400px"}
                height={"490px"}
                alt=""
              />
            </div>
            <hr />
          </div>
        </>
      );
}

export default Achievement