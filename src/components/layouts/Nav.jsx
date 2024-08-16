import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RiUser3Line } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { FaMoon, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
// import dpRef from "../../assets/images/dp.jpg"
import { MdShield } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { LiaSignOutAltSolid } from "react-icons/lia";

function Nav({ setSignupPopUp }) {
  const [bulb, setBulb] = useState(false);
  const [tokenExists, setTokenExists] = useState(true);
  const navRef = useRef(null);
  const dpRef = useRef(null);
  const toggleBulb = (e) => {
    // console.log(e.target);
    setBulb(!bulb);
    const root = document.documentElement; // Get the root element of the document
    // Get the computed styles of the document's root element
    const rootStyles = getComputedStyle(root);
    // Retrieve the values of the CSS custom properties
    const bgColor = rootStyles.getPropertyValue("--bg");
    const textColor = rootStyles.getPropertyValue("--text");
    const bxshadow = rootStyles.getPropertyValue("--bxshadow");
    const bxshadow2 = rootStyles.getPropertyValue("--bxshadow2");
    // Swap the values of --bg and --text
    root.style.setProperty("--bg", textColor);
    root.style.setProperty("--text", bgColor);
    root.style.setProperty("--bxshadow2", bxshadow);
    root.style.setProperty("--bxshadow", bxshadow2);
    /** */
  };

  const openDp = (e) => {
    e.preventDefault();
    dpRef.current.classList.toggle("active");
  };

  const toggleNav = (e) => {
    e.preventDefault();
    navRef.current.classList.toggle("active");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setTokenExists(token ? true : false);
  }, [localStorage.getItem("token")]);

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
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
          {/* <IoIosArrowDown className="arr" /> */}
        </li>
        <li className="desk">
          <Link to="/">Jobs</Link>
        </li>

        {/* <li>
            <a href="">Login</a>
          </li> */}
        <li>
          <Link onClick={toggleBulb}>
            <FaMoon className="icon" />
          </Link>
        </li>
        <li className="user">
          {tokenExists ? (
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
            <Link
              to="sign"
              onClick={(e) => {
                e.preventDefault();
                setSignupPopUp(true);
              }}
            >
              <RiUser3Line className="icon" />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
