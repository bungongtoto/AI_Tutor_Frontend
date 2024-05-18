import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import logo from "../assets/images/AI_TUTOR_Logo.png";

function Header() {
  return (
    <header className='home_header' >
        <div className='home_header_container'>
            <LazyLoadImage className='logo' src={logo} width={"150px"} height={"50px"} alt="AI Tutor Logo" />
            {/* <img className='logo' src="./img/AI_TUTOR_Logo.png" width={"150px"} height={"50px"} alt="AI Tutor Logo" /> */}
            <h1>Header</h1>
        </div>
    </header>
  )
}

export default Header
