import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "../../assets/css/jobdetails.css";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiMiniClipboardDocument } from "react-icons/hi2";
import { TbWorld } from "react-icons/tb";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getJob } from "../../redux/degenwork";
import { useDispatch, useSelector } from "react-redux";
import { timeAgo } from "../../utils/utils";

function JobDetails() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const navigate = useNavigate();
  const { job } = useSelector((state) => state.degenwork);
  const [currentUrl] = useState(window.location.href);

  useEffect(() => {
    if (id) {
      dispatch(getJob({ id: id }));
    }
  }, [id, dispatch]);

  const copyLink = () => {
    navigator.clipboard.writeText(`${currentUrl}`);
  };

  const goBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <>
      {/* Dynamic SEO Meta Tags */}
      {job && (
        <Helmet>
          <title>{`${job.companyName} is hiring ${job.roles.join(
            ", "
          )} - Web3JobPortal`}</title>
          <meta
            name="description"
            content={`Apply for ${job.roles.join(", ")} at ${
              job.companyName
            }. ${job.jobDescription?.substring(0, 150)}...`}
          />
          <meta
            name="keywords"
            content={`Web3 jobs, ${job.roles.join(", ")}, ${
              job.companyName
            }, blockchain jobs, crypto jobs`}
          />
          <meta
            property="og:title"
            content={`${job.companyName} is hiring ${job.roles.join(
              ", "
            )} - Web3JobPortal`}
          />
          <meta
            property="og:description"
            content={`${job.companyName} is looking for ${job.roles.join(
              ", "
            )}. Apply now!`}
          />
          <meta property="og:url" content={currentUrl} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={job.dp || complogo} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={`${job.companyName} is hiring ${job.roles.join(
              ", "
            )} - Web3JobPortal`}
          />
          <meta
            name="twitter:description"
            content={`${job.companyName} is looking for ${job.roles.join(
              ", "
            )}. Apply now!`}
          />
          <meta name="twitter:image" content={job.dp || complogo} />
        </Helmet>
      )}

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
              rel="noopener noreferrer"
            >
              Apply for this position
            </a>
          </div>
          <div className="sib">
            <div className="sibcont">
              <img src={job?.dp} alt="complogo" className="complogo" />
              <h1>{job?.companyName}</h1>
              <div className="shareconts">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    currentUrl
                  )}&text=Check%20this%20${job?.roles.join(
                    ", "
                  )} Role%20out%20on%20Degenwork Website!`}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  rel="noopener noreferrer"
                  className="btn"
                >
                  <FaTwitter className="icon" />
                  Tweet
                </a>
                <div className="btn" onClick={copyLink}>
                  <HiMiniClipboardDocument className="icon" />
                  Copy
                </div>
                <a
                  href={job?.weburl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  <TbWorld className="icon" />
                  Website
                </a>
              </div>
              <a
                href={
                  job?.weburl
                    ? job?.weburl
                    : `mailto:${job?.applyemail}?subject=${job?.roles.join(
                        ", "
                      )}`
                }
                className="applyBtn"
                target="_blank"
                rel="noopener noreferrer"
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
                  <span>Salary</span>
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
    </>
  );
}

export default JobDetails;
