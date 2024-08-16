import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer>
      <a href="#" className="logo">
        Web3jobportal
      </a>
      <ul>
        <li>
          <Link to="degens">Degen Jobs</Link>
        </li>
        <li>
          <Link to="">FAQ</Link>
        </li>
        <li>
          <Link to="/degens">Hire Degens</Link>
        </li>
        <li>
          <Link to="/sign">Sign Up</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to={"#"}>
            <FaLinkedin className="icon" />
          </Link>
        </li>
        <li>
          <Link to={"#"}>
            <FaXTwitter className="icon" />
          </Link>
        </li>
        <li>
          <Link to={"#"}>
            <FaDiscord className="icon" />
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
