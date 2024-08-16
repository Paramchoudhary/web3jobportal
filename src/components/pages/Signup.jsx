import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/signup.css";
import { FcGoogle } from "react-icons/fc";
import bg from "../../assets/images/dp.jpg";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { clear, goggleSign, login, register } from "../../redux/degenwork";
import { useNavigate } from "react-router-dom";

function Signup({ signupPopUp, setSignupPopUp }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [countryOption, setCountryOption] = useState([]);
  const formRef = useRef(null);
  const [imgPreview, setImgPreview] = useState(null);
  const { error, success } = useSelector((state) => state.degenwork);
  const [sign, setSign] = useState(true);
  const childRef = useRef(null);

  function handleClickOutside(event) {
    if (childRef.current && !childRef.current.contains(event.target)) {
      setSignupPopUp(false);
    }
  }

  const handleSuccess = async (response) => {
    try {
      dispatch(goggleSign({ token: response.credential }));
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleError = (error) => {
    console.error("Login failed:", error);
  };

  const registerUser = (e) => {
    e.preventDefault();
    dispatch(register(e.target));
    // console.log(e.target);
  };
  const loginUser = (e) => {
    e.preventDefault();
    dispatch(login(e.target));
  };

  //
  useEffect(() => {
    let timer ;
    if (success) {
       timer = setTimeout(() => {
        dispatch(clear());
        setSignupPopUp(false);
        if (localStorage.token && localStorage.role === "user") {
          navigate("/user/");
        } else if (localStorage.role === "admin") {
          navigate("/admin/");
        }
      }, 3000);
      // Cleanup the timeout if the component unmounts or `success` changes
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return signupPopUp ? (
    <section className="signup" onClick={handleClickOutside}>
      {sign ? (
        <form className="child" ref={childRef} onSubmit={registerUser}>
          <div className="txtCont">
            <h1>Create a new account</h1>
            <p>Provide your email and choose a password</p>
            {error && <p style={{ color: "crimson" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <div className="rows">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="rows">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Choose a password"
              />
            </div>
            <h4>OR</h4>
            {/* <div className="gdgbtn">
              <FcGoogle />
              Continue with Google
            </div> */}
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              useOneTap
            />
            <button>Sign Up</button>
            <p>
              Already have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSign(false);
                }}
              >
                Sign in
              </a>
            </p>
            <p>
              By joining, you agree to the Fiverr{" "}
              <a href="#">Terms of Service</a> and to occasionally receive
              emails from us. Please read our <a href="#">Privacy Policy </a>to
              learn how we use your personal data.
            </p>
          </div>
        </form>
      ) : (
        <form className="child" ref={childRef} onSubmit={loginUser}>
          <div className="txtCont">
            <h1>Sign in to your account</h1>
            <p>Provide your email and password</p>
            {error && <p style={{ color: "crimson" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <div className="rows">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="rows">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Choose a password"
              />
            </div>
            <h4>OR</h4>
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              useOneTap
            />
            <button>Sign in</button>
            <p>
              Don’t have an account??{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSign(true);
                }}
              >
                Sign up
              </a>
            </p>
            <p>
              By joining, you agree to the Fiverr{" "}
              <a href="#">Terms of Service</a> and to occasionally receive
              emails from us. Please read our <a href="#">Privacy Policy </a>to
              learn how we use your personal data.
            </p>
          </div>
        </form>
      )}
    </section>
  ) : (
    <></>
  );
}

export default Signup;
