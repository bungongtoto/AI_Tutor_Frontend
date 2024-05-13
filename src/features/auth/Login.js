import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className="login_page">
      <div className="login_container">
       <img src="./img/AI_TUTOR_Logo.png" className="floating-image" width={"150px"} height={"50px"} alt="" />
        <form className="login_form" action="">
          <div className="input_container">
            <label htmlFor="email" className="visually-hidden">Email</label>
            <input className="big_input" type="email" id="email" placeholder="Enter a valid email" />
          </div>
          <div className="input_container">
            <label htmlFor="password" className="visually-hidden">Password</label>
            <input className="big_input" type="password" id="password" placeholder="Password" />
          </div>

          <button className="login-button">Login</button>
          <p>OR</p>
          <div>
          <img src="./img/gmail_logo.png" width={50} height={50} alt="" />
          </div>
          <p>Forgot password ? <Link to={"/auth/resetpassword"}>Reset Password</Link></p>
          <p>Dont have an account ? <Link to={"/auth/signup"}>Sign Up</Link></p>
        </form>
      </div>
    </main>
  );
};

export default Login;
