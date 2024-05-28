import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../../assets/images/AI_TUTOR_Logo.png";
import usePersist from "../../hooks/usePersist.js";
import { useDispatch } from "react-redux";
import {useLoginMutation} from "../auth/authApiSlice";
import { setCredentials } from "./authSlice.js";
import { PulseLoader } from "react-spinners";
import { useSnackbar } from "notistack";

// import gmail_logo from "../../assets/images/gmail_logo.png"

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const userRef = useRef(null);
  const errRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      enqueueSnackbar("Login Successfully", { variant: "success" });
      navigate("/dash");
    } catch (err) {
      enqueueSnackbar("An Error Occured", { variant: "error" });
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      // errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg" : "offscreen";

  return (
    <main className="login_page">
      {isLoading ? (
        <PulseLoader color={"blue"} />
      ) : (
        <div className="login_container">
          <LazyLoadImage
            src={logo}
            className="floating-image"
            width={"150px"}
            height={"50px"}
            alt=""
          />
          <p ref={errRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p>
          <form className="login_form" onSubmit={handleSubmit}>
            <div className="input_container">
              <label htmlFor="email" className="visually-hidden">
                Email
              </label>
              <input
                className="big_input"
                type="email"
                id="email"
                ref={userRef}
                placeholder="Enter a valid email"
                value={email}
                onChange={handleUserInput}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="password" className="visually-hidden">
                Password
              </label>
              <input
                className="big_input"
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={handlePwdInput}
                required
              />
            </div>

            <div className="check">
              <input
                type="checkbox"
                id="persist"
                checked={persist}
                onChange={handleToggle}
              />
              <label htmlFor="persist">Remember Me</label>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
            {/* <p>OR</p>
        <div>
        <LazyLoadImage className="hover-effect" src={gmail_logo} width={50} height={50} alt="" />
        </div> */}
            <p>
              Forgot password ?{" "}
              <Link to={"/auth/resetpassword"}>Reset Password</Link>
            </p>
            <p>
              Dont have an account ? <Link to={"/auth/signup"}>Sign Up</Link>
            </p>
          </form>
        </div>
      )}
    </main>
  );
};

export default Login;
