import React, { useEffect, useState } from "react";
import "../../assets/css/viewdegen.css";
import dp3 from "../../assets/images/dp3.jpg";
import { IoChatbubble, IoLocationSharp } from "react-icons/io5";
import {
  FaEnvelopeCircleCheck,
  FaGithub,
  FaLinkedin,
  FaStar,
  FaTwitter,
} from "react-icons/fa6";
import { HiMiniClipboardDocument } from "react-icons/hi2";
import { TbWorld } from "react-icons/tb";
import { BiLogoTelegram, BiSolidBadgeCheck } from "react-icons/bi";
import { getUserInfo } from "../../redux/degenwork";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { rateUser } from "../../utils/utils";

import location from "../../assets/images/location.svg"
import badge from "../../assets/images/badge.svg"
import language from "../../assets/images/language.svg"

function ViewDegen() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const { userInfo, error, success } = useSelector((state) => state.degenwork);
  const [currentUrl] = useState(window.location.href);
  useEffect(() => {
    if (id) {
      dispatch(getUserInfo({ id: id }));
    }
  }, [id]);

  const copyLink = (e) => {
    navigator.clipboard.writeText(`${currentUrl}`);
  };

  // useEffect(() => {
  //   console.log(userInfo);
  // }, [userInfo]);

  // getUserInfo
  return (
    <section className="viewdegen">
      {userInfo ? (
        <header>
          <div className="dpcont">
            <img src={userInfo?.dp ? userInfo?.dp : dp3} alt="dp" />
            <div className="txt">
              <h1>
                {userInfo.username ? userInfo.username : userInfo.email}{" "}
                {rateUser(userInfo) &&
                <img src={badge} alt="badge" />
                }
              </h1>
              {/* <h3>
              {rateUser(userInfo)}
              <BiSolidBadgeCheck className="icon" />
              </h3> */}
              <ul>
                <li>
                <img src={location} alt="location" />
                  {userInfo.location}
                </li>
                <li>
                <img src={language} alt="location" />
                  Fluent {userInfo.language}
                </li>
                {/* <li>
                <IoChatbubble />
                English, spanish
              </li> */}
                <div className="shareconts">
                  <a href={userInfo.linkelnd} target="_blank" className="btn">
                    <FaLinkedin className="icon" />
                    Linkelnd
                  </a>
                  <a href={userInfo.twitter} className="btn">
                    <FaTwitter className="icon" />
                    Twitter
                  </a>
                  <a href={userInfo.github} target="_blank" className="btn">
                    <FaGithub className="icon" />
                    Github
                  </a>
                  <a href={userInfo.website} target="_blank" className="btn">
                    <TbWorld className="icon" />
                    Website
                  </a>
                  <a href={userInfo.telegram} target="_blank" className="btn">
                    <BiLogoTelegram className="icon" />
                    Telegram
                  </a>
                </div>
              </ul>
              <h4>About me</h4>
              <p>{userInfo.bio}</p>
            </div>
          </div>
          <h6>Interested in roles</h6>
          <ul className="skills">
            {userInfo.roles.map((role, idx) =>
              role === "" ? <></> : <li key={idx}>{role}</li>
            )}
          </ul>
          <h6>Skills</h6>
          <ul className="skills">
            {userInfo.skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
          <h6>Job Type</h6>
          <ul className="skills">
            {userInfo.jobtype.map((list, idx) =>
              list === "" ? <></> : <li key={idx}>{list}</li>
            )}
          </ul>
          {/* <h6>Rate User</h6>
        <div className="staruser">
          <FaStar className="icon" />
        </div> */}
        </header>
      ) : (
        <div className="loaderCont">
          <span class="loader"></span>
        </div>
      )}
    </section>
  );
}

export default ViewDegen;
