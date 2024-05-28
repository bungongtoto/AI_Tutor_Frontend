import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../../assets/images/AI_TUTOR_Logo.png";
import PasswordStrengthBar from "react-password-strength-bar";
import { useSignUpMutation } from "./authApiSlice";
import { PulseLoader } from "react-spinners";
import { useSnackbar } from "notistack";

const SignUp = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const userRef = useRef(null);
  const errRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [signUp, { isLoading }] = useSignUpMutation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  };

  const onEmailChanged = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp({ email, password }).unwrap();
      setEmail("");
      setPassword("");
      enqueueSnackbar("Signed Up Successfully", { variant: "success" });
      navigate("/auth");
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
          {/* <img src="./img/AI_TUTOR_Logo.png" className="floating-image" width={"150px"} height={"50px"} alt="" /> */}
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
                value={email}
                onChange={onEmailChanged}
                placeholder="Enter a valid email"
                required
              />
            </div>
            <div className="password-input-container">
              <label htmlFor="password" className="visually-hidden">
                Password
              </label>
              <div className="password-input-wrapper">
                <input
                  className="big_input"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={onPasswordChanged}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="show-password-button"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <PasswordStrengthBar password={password} />
            </div>

            <button type="submit" className="login-button">
              Sign Up
            </button>
            {/* <p>OR</p>
        <div>
          <LazyLoadImage className="hover-effect" src={gmail_logo} width={50} height={50} alt="" />
        </div> */}

            <p>
              Already have an account ? <Link to={"/auth/"}>Login</Link>
            </p>
          </form>
        </div>
      )}
    </main>
  );
};

export default SignUp;
