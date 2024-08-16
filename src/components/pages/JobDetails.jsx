import React, { useEffect, useState } from "react";
import "../../assets/css/jobdetails.css";
import { FaLinkedin } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { HiMiniClipboardDocument } from "react-icons/hi2";
import { TbWorld } from "react-icons/tb";
import { IoChevronBackOutline } from "react-icons/io5";
import complogo from "../../assets/images/dp3.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getJob } from "../../redux/degenwork";
import { useDispatch, useSelector } from "react-redux";
import { timeAgo } from "../../utils/utils";
function JobDetails() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const navigate = useNavigate();
  const { job, error, success } = useSelector((state) => state.degenwork);
  const [currentUrl] = useState(window.location.href);
  useEffect(() => {
    if (id) {
      dispatch(getJob({ id: id }));
    }
  }, [id]);

  const copyLink = (e) => {
    navigator.clipboard.writeText(`${currentUrl}`);
  };
  const goBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <section className="job">
      <main>
        <Link to="/" className="btnBack" onClick={goBack}>
          <IoChevronBackOutline className="icon" />
          Degen Jobs
        </Link>
        <div className="child">
          <h2>Job Details</h2>
          <h1>{job?.companyName}</h1>
          <h3>Our Project</h3>
          <div dangerouslySetInnerHTML={{ __html: job?.jobDescription }} />
          <a
            href={job?.weburl ? job?.weburl : job?.applyemail}
            className="applyBtn"
            target="_blank"
          >
            Apply for this position
          </a>
        </div>
        <div className="sib">
          <div className="sibcont">
            <img src={job?.dp} alt="complogo" className="complogo" />
            <h1>AutoGpt</h1>
            <div className="shareconts">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  currentUrl
                )}&text=Check%20this%20${job?.roles.join(
                  ", "
                )} Role%20out%20on%20Degenwork Website!`}
                target="_blank"
                className="btn"
              >
                <FaLinkedin className="icon" />
                Share
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  currentUrl
                )}&text=Check%20this%20${job?.roles.join(
                  ", "
                )} Role%20out%20on%20Degenwork Website!`}
                target="_blank"
                className="btn"
              >
                <FaTwitter className="icon" />
                tweet
              </a>
              <div className="btn" onClick={copyLink}>
                <HiMiniClipboardDocument className="icon" />
                Copy
              </div>
              <a href={job?.weburl} target="_blank" className="btn">
                <TbWorld className="icon" />
                Website
              </a>
            </div>
            <a
              href={
                job?.weburl
                  ? job?.weburl
                  : `mailto:${job?.applyemail}?subject=${job?.roles.join(", ")}`
              }
              className="applyBtn"
              target="_blank"
            >
              Apply for this position
            </a>
            <ul>
              <li>
                <span>Job Type</span>
                <span>{job?.roles.join(", ")}</span>
              </li>
              <li>
                <span>Location</span>
                <span>{job?.location.join(", ")}</span>
              </li>
              <li>
                <span>Job Type</span>
                <span>{job?.type.join(", ")}</span>
              </li>
              <li>
                <span>Date posted</span>
                <span>{timeAgo(job?.createdAt)}</span>
              </li>
              <li className="pr">
                <span>Salaray</span>
                <span>
                  ${job?.minsalary} to ${job?.maxsalary} Yearly
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
    </section>
  );
}

export default JobDetails;
