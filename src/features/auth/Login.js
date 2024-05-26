import React from "react";
import { Link, useNavigate } from "react-router-dom";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../../assets/images/AI_TUTOR_Logo.png";
import gmail_logo from "../../assets/images/gmail_logo.png"
 
const Login = () => {
  const navigate = useNavigate();
  const onLoginClicked = () => {
    navigate("/dash")
  }
  return (
    <main className="login_page">
      <div className="login_container">
        <LazyLoadImage src={logo} className="floating-image" width={"150px"} height={"50px"} alt="" />
       {/* <img src="./img/AI_TUTOR_Logo.png" className="floating-image" width={"150px"} height={"50px"} alt="" /> */}
        <form className="login_form" onSubmit={onLoginClicked}>
          <div className="input_container">
            <label htmlFor="email" className="visually-hidden">Email</label>
            <input className="big_input" type="email" id="email" placeholder="Enter a valid email" />
          </div>
          <div className="input_container">
            <label htmlFor="password" className="visually-hidden">Password</label>
            <input className="big_input" type="password" id="password" placeholder="Password" />
          </div>

          <button type="submit" className="login-button">Login</button>
          <p>OR</p>
          <div>
          <LazyLoadImage className="hover-effect" src={gmail_logo} width={50} height={50} alt="" />
          {/* <img className="hover-effect" src="./img/gmail_logo.png" width={50} height={50} alt="" /> */}
          </div>
          <p>Forgot password ? <Link to={"/auth/resetpassword"}>Reset Password</Link></p>
          <p>Dont have an account ? <Link to={"/auth/signup"}>Sign Up</Link></p>
        </form>
      </div>
    </main>
  );
};

export default Login;
