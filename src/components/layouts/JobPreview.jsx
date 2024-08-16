import React, { useEffect } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { HiMiniClipboardDocument } from "react-icons/hi2";
import { TbWorld } from "react-icons/tb";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import dp from "../../assets/images/dp3.jpg";

function JobPreview({ setPreview, formdata }) {
  console.log(formdata);
  return (
    <main>
      <Link
        //   to="/"
        className="btnBack"
        onClick={(e) => {
          e.preventDefault();
          setPreview(false);
        }}
      >
        <IoChevronBackOutline className="icon" />
        Back
      </Link>
      <div className="child">
        <h2>Job preview</h2>
        <h1>{formdata?.companyName}</h1>
        <div dangerouslySetInnerHTML={{ __html: formdata?.jobDescription }} />
        <a className="applyBtn" target="_blank">
          Apply for this position
        </a>
        <div className="controls"></div>
      </div>
      <div className="sib">
        <div className="sibcont">
          <img
            src={formdata?.dp ? formdata?.dp : dp}
            alt="complogo"
            className="complogo"
          />
          <h1>AutoGpt</h1>
          <div className="shareconts">
            <a target="_blank" className="btn">
              <FaLinkedin className="icon" />
              Share
            </a>
            <a target="_blank" className="btn">
              <FaTwitter className="icon" />
              tweet
            </a>
            <div className="btn">
              <HiMiniClipboardDocument className="icon" />
              Copy
            </div>
            <a target="_blank" className="btn">
              <TbWorld className="icon" />
              Website
            </a>
          </div>
          <a className="applyBtn" target="_blank">
            Apply for this position
          </a>
          <ul>
            <li>
              <span>Job Roles</span>
              <span>{formdata?.roles.join(", ")}</span>
            </li>
            <li>
              <span>Location</span>
              <span>{formdata?.location.join(", ")}</span>
            </li>
            <li>
              <span>Job Type</span>
              <span>{formdata?.type.join(", ")}</span>
            </li>
            <li>
              <span>Date posted</span>
              <span>Just now</span>
            </li>
            <li className="pr">
              <span>Salaray</span>
              <span>
                ${formdata?.minsalary} to ${formdata?.maxsalary} Yearly
              </span>
            </li>
          </ul>
        </div>

        {/* <ul className="secsib">
        <h2>You might also like</h2>
        <li>
          <a href="" target="">
            UX Design / Research Jobs
          </a>{" "}
        </li>
        <li>
          <a href="" target="">
          Remote UX Design / Research Design Jobs
          </a>{" "}
        </li>
      </ul> */}
        {/* <ul className="secsib">
        <h2>Are you also hiring?</h2>
        <li>
          <a href="" target="">
          Hire UX Designers
          </a>{" "}
        </li>
        <li>
          <a href="" target="">
          Hire Remote UX Designers
          </a>{" "}
        </li>
      </ul> */}
      </div>
    </main>
  );
}

export default JobPreview;
