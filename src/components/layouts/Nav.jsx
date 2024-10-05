import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RiUser3Line } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { FaMoon, FaSun, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdShield } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { LiaSignOutAltSolid } from "react-icons/lia";

function Nav({ setSignupPopUp, isAuthenticated, setIsAuthenticated }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navRef = useRef(null);
  const dpRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      applyDarkMode();
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      applyDarkMode();
      localStorage.setItem("theme", "dark");
    } else {
      applyLightMode();
      localStorage.setItem("theme", "light");
    }
  };

  const applyDarkMode = () => {
    const root = document.documentElement;
    root.style.setProperty("--bg", "#1a1a1a");
    root.style.setProperty("--text", "#ffffff");
    root.style.setProperty("--bxshadow", "rgba(255, 255, 255, 0.1)");
    root.style.setProperty("--bxshadow2", "rgba(255, 255, 255, 0.05)");
  };

  const applyLightMode = () => {
    const root = document.documentElement;
    root.style.setProperty("--bg", "#ffffff");
    root.style.setProperty("--text", "#000000");
    root.style.setProperty("--bxshadow", "rgba(0, 0, 0, 0.1)");
    root.style.setProperty("--bxshadow2", "rgba(0, 0, 0, 0.05)");
  };

  const openDp = (e) => {
    e.preventDefault();
    dpRef.current.classList.toggle("active");
  };

  const toggleNav = (e) => {
    e.preventDefault();
    navRef.current.classList.toggle("active");
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setIsAuthenticated(false);
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <nav ref={navRef}>
      <Link to="/" className="logo">
        <div className="menuBtn" onClick={toggleNav}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        Web3jobportal
      </Link>
      <ul>
        <li className="desk">
          <Link to="/degens">Find degens</Link>
        </li>
        <div class="dropdown">
          <button class="dropbtn">Web3 Guides</button>
          <div class="dropdown-content">

            <Link to="/Web3Roadmap">web3 Roadmap</Link>

          </div>
        </div>
        <li className="desk">
          <Link to="/">Jobs</Link>
        </li>
        <li>
          <button onClick={toggleTheme} className="theme-toggle">
            {isDarkMode ? (
              <FaSun className="icon" />
            ) : (
              <FaMoon className="icon" />
            )}
          </button>
        </li>
        <li className="user">
          {isAuthenticated ? (
            <>
              <Link to="/user/" onClick={openDp}>
                <RiUser3Line className="icon" />
              </Link>
              <ul className="profileCont" ref={dpRef}>
                {/* <li>
                  <Link to={`/resetpass/${localStorage.getItem("token")}`}>
                    <CiSettings className="icon" />
                  <span>  Change Password</span>
                  </Link>
                </li>
                <li>
                  <Link to="/user/">
                    <MdShield className="icon" /> 
                    <span>Account Security</span>
                  </Link>
                </li> */}
                <li>
                  <Link to="/user/">
                    <FaUser className="icon" />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <a href="#" onClick={logout}>
                    <LiaSignOutAltSolid className="icon" />
                    <span>Sign Out</span>
                  </a>
                </li>
              </ul>
            </>
          ) : (
            <button
              className="login-button"
              onClick={() => setSignupPopUp(true)}
            >
              Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;

