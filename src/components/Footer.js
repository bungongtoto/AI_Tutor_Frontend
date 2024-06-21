import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="home_footer">
      <div className="home_footer_container">
        <h1>Contact Us</h1>
        <div className="contact-tile">
          <FaEnvelope className="contact-icon" />
          <span>info.contact@aitutor.com</span>
        </div>
        <div className="contact-tile">
          <FaPhoneAlt className="contact-icon" />
          <span>+237 6 xx xx xx xx</span>
        </div>
        <hr />
        <p>&copy; 2024 AI-Tutor. All rights reserved.</p>

        <hr />
      </div>
    </footer>
  );
};

export default Footer;
