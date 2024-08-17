import React, { useEffect, useState } from "react";
import "../../../assets/css/adminJobs.css";
import {
  IoIosSearch,
  IoMdArrowDropleft,
  IoMdArrowDropright,
} from "react-icons/io";
import company_logo from "../../../assets/images/company_logo.png";
import dp from "../../../assets/images/dp.jpg";
import dp1 from "../../../assets/images/dp1.png";
import dp2 from "../../../assets/images/dp2.jpg";
import dp3 from "../../../assets/images/dp3.jpg";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clear, deleteJob, getJobs } from "../../../redux/degenwork";
import {
  errorMsgs,
  formatNumber,
  successMsg,
  timeAgo,
} from "../../../utils/utils";
import { ToastContainer } from "react-toastify";

function AdminJobs() {
  const dispatch = useDispatch();
  const { jobs, error, success, jobsCount } = useSelector(
    (state) => state.degenwork
  );

  const [btns, setBtns] = useState([]);
  const [activeBtn, setActiveBtn] = useState(1);
  const [filteredJob, setFilteredJob] = useState(null);

  const addActiveBtn = (idx) => {
    setActiveBtn(idx);
  };

  const prevBtn = (idx) => {
    if (activeBtn > 1) {
      setActiveBtn(activeBtn - 1);
    }
  };
  //
  const nextBtn = (idx) => {
    if (activeBtn < btns.length) {
      setActiveBtn(activeBtn + 1);
    }
  };

  //searchName
  const searchName = (e) => {
    e.preventDefault();
    const searchKeyword = e.target.text.value;
    if (searchKeyword) {
      dispatch(getJobs({ companyKeyword: searchKeyword }));
    } else {
      dispatch(getJobs({ from: activeBtn - 1 }));
    }
  };

  //searchName
  const DeleteJobModal = (id) => {
    if (id) {
      const job = jobs.filter((job) => job._id.includes(id));
      setFilteredJob(job[0]);
    } else {
      setFilteredJob(null);
    }
  };
  // deletejobFunc
  const deletejobFunc = (e) => {
    e.preventDefault();
    const id = filteredJob._id;
    dispatch(deleteJob(id));
  };

  // Get jobs
  useEffect(() => {
    if (jobsCount) {
      const partSize = import.meta.env.VITE_PART_SIZE;
      const maxVisibleButtons = 10;
      const totalPages = Math.ceil(jobsCount / partSize); // Define totalPages here

      // Function to determine which page buttons to display
      const getVisiblePageNumbers = (activeBtn) => {
        let startPage, endPage;

        if (totalPages <= maxVisibleButtons) {
          startPage = 1;
          endPage = totalPages;
        } else {
          if (activeBtn <= Math.floor(maxVisibleButtons / 2)) {
            startPage = 1;
            endPage = maxVisibleButtons - 1;
          } else if (
            activeBtn + Math.floor(maxVisibleButtons / 2) >=
            totalPages
          ) {
            startPage = totalPages - (maxVisibleButtons - 2);
            endPage = totalPages - 1;
          } else {
            startPage = activeBtn - Math.floor(maxVisibleButtons / 2);
            endPage = activeBtn + Math.floor(maxVisibleButtons / 2) - 1;
          }
        }

        const pageNumbers = Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => startPage + index
        );

        if (!pageNumbers.includes(totalPages)) {
          pageNumbers.push(totalPages); // Ensure last page is always visible
        }

        return pageNumbers;
      };

      const visiblePages = getVisiblePageNumbers(activeBtn);
      setBtns(visiblePages);
    }
  }, [jobsCount, activeBtn]);

  useEffect(() => {
    if (!jobs) {
      dispatch(getJobs({ from: activeBtn - 1 }));
    }
  }, [jobs]);

  //
  useEffect(() => {
    // console.log(error);
    if (success) {
      successMsg(success);
      dispatch(getJobs({ from: activeBtn - 1 }));
    } else if (error) {
      errorMsgs(error);
    }
    setFilteredJob(null);
    dispatch(clear());
  }, [success, error]);

  return (
    <div className="adminJobs">
      <ToastContainer />
      <form action="" onSubmit={searchName}>
        <label htmlFor="text">
          <IoIosSearch className="icon" />
        </label>
        <input
          type="text"
          name="text"
          placeholder="Search by company, skill, tag"
        />
      </form>
      <h1>Recent posts</h1>
      <div className="rows">
        {jobs &&
          jobs.map((job) => (
            <div
              className={job.color === "1" ? "box highlight" : "box"}
              key={job._id}
              style={job.color === "2" ? { backgroundColor: job.colorInt } : {}}
            >
              <div className="dpcont">
                <img src={job.dp ? job.dp : dp} alt="" className="dp" />
                <div className="dptxt">
                  <div className="subtext">
                    <h3>{job.companyName}</h3>
                    <img
                      src={job.dp ? job.dp : dp}
                      alt=""
                      className="company_logo"
                    />
                  </div>
                  <h4>
                          {job.position}
                          <span>
                            💰 ${formatNumber(job.minsalary)} - $
                            {formatNumber(job.maxsalary)}
                          </span>
                        </h4>
                  <ul>
                  {job.stack.map((list) => (
                            <li>{list}</li>
                          ))}
                  </ul>
                </div>
              </div>
              <div className="cont">
                <div className="prime">Posted {timeAgo(job.createdAt)}</div>
                <div className="loc">
                  <FaLocationDot />
                  {job.type.map((list) => (
                    <>{list}</>
                  ))}
                </div>
              </div>
              <div className="view">
                <Link to={`/jobs/${job._id}`} className="btn">
                  View Job
                </Link>
                <div onClick={() => DeleteJobModal(job._id)} className="btn">
                  Delete
                </div>
              </div>
            </div>
          ))}

        <div className="morecont">
          <div className="prev" onClick={prevBtn}>
            <IoMdArrowDropleft />
            Previous
          </div>
          {btns &&
            btns.map((no) => (
              <div
                className={no === activeBtn ? "btn active" : "btn"}
                onClick={() => {
                  addActiveBtn(no);
                }}
                key={no}
              >
                {no}
              </div>
            ))}
          <div className="next" onClick={nextBtn}>
            Next
            <IoMdArrowDropright />
          </div>
        </div>
      </div>
      {filteredJob && (
        <form className="jobModal" onSubmit={deletejobFunc}>
          <div className="box">
            <h2>
              ARE YOU SURE YOU WANT TO Delete This Job from{" "}
              {filteredJob.companyName}
            </h2>
            <div className="btns">
              <button onClick={() => DeleteJobModal(null)}>Decline</button>
              <button>Delete Now</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default AdminJobs;
