import React from 'react'
import { Link } from 'react-router-dom'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import logo from "../../assets/images/AI_TUTOR_Logo.png";


const ResestPWD = () => {
  return (
    <main className="login_page">
      <div className="login_container">
      <LazyLoadImage src={logo} className="floating-image" width={"150px"} height={"50px"} alt="" />
       {/* <img src="./img/AI_TUTOR_Logo.png" className="floating-image" width={"150px"} height={"50px"} alt="" /> */}
        <form className="login_form" action="">
          <div className="input_container">
            <label htmlFor="email" className="visually-hidden">Email</label>
            <input className="big_input" type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="input_container">
            <label htmlFor="password" className="visually-hidden"> New Password</label>
            <input className="big_input" type="password" id="password" placeholder="Password" />
          </div>

          <button className="login-button">Reset Password</button>

          <p>Already have an account ? <Link to={"/auth/"}> Login</Link></p>
        </form>
      </div>
    </main>
  )
}

export default ResestPWD