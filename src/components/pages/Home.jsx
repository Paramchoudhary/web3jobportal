import { useEffect, useRef, useState } from "react";
import "../../assets/css/home.css";
import { IoIosSearch } from "react-icons/io";
import { FaSackDollar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { GoFilter } from "react-icons/go";
import { MdCancel } from "react-icons/md";
import company_logo from "../../assets/images/company_logo.png";
import dp from "../../assets/images/dp.jpg";
import dp1 from "../../assets/images/dp1.png";
import dp2 from "../../assets/images/dp2.jpg";
import dp3 from "../../assets/images/dp3.jpg";
import Select from "react-select";
import countryCode from "../../utils/countryCode.json";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, fetchSkills, getJobs } from "../../redux/degenwork";
import { formatNumber, timeAgo } from "../../utils/utils";
import FAQSection from "../ui/FaqSection";
import { Helmet } from "react-helmet";

function Home() {
  const dispatch = useDispatch();
  const { jobs, error, success, jobsCount, skills, roles } = useSelector(
    (state) => state.degenwork
  );
  const [countryOption, setCountryOption] = useState([]);
  const [filters, setFilters] = useState([
    // Original Skills
    "Highlighted",
    "Solidity",
    "Brand / Graphic Design",
    "Illustration",
    "Leadership",
    "Mobile Design",
    "UI / Visual Design",
    "Product Design",
    "UX Design / Research",
    "Web Design",

    // Web3 Skills
    "Blockchain Development",
    "Cryptography",
    "Smart Contracts",
    "DeFi (Decentralized Finance)",
    "NFT (Non-Fungible Tokens)",
    "Decentralized Applications (DApps)",
    "DAO (Decentralized Autonomous Organizations)",
    "Web3 Community Building",
    "Tokenomics",
    "Metaverse Development",

    // Web2 Skills
    "Front-End Development",
    "Back-End Development",
    "Full Stack Development",
    "JavaScript",
    "React",
    "Angular",
    "Vue.js",
    "Node.js",
    "Python",
    "Java",
    "PHP",
    "Ruby on Rails",
    "DevOps",
    "Cloud Computing",
    "AWS",
    "Azure",
    "Google Cloud Platform",
    "Database Management",
    "SQL",
    "NoSQL",
    "API Development",
    "Cybersecurity",
    "SEO (Search Engine Optimization)",
    "Content Management Systems (CMS)",
    "WordPress",
    "E-commerce Development",

    // General Career Skills
    "Career Coaching",
    "Personal Branding",
    "Job Search Strategies",
    "Resume Writing",
    "Interview Preparation",
    "Networking",
    "Time Management",
    "Project Management",
    "Agile Methodology",
    "Scrum",
    "Entrepreneurship",
    "Marketing",
    "Sales",
    "Data Analysis",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Public Speaking",
    "Technical Writing",
    "Customer Relationship Management (CRM)",
  ]);
  const [jobType, setjobType] = useState([
    "Freelance/Contract",
    "Full-Time",
    "Internship",
    "Volunteer",
  ]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedJobtype, setSelectedJobtype] = useState(null);
  const [officeLoc, setOfficeLoc] = useState([]);
  const [desiredLocation, setDesiredLocation] = useState(null);

  const [btns, setBtns] = useState([]);
  const [activeBtn, setActiveBtn] = useState(1);
  const filterRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  const style = {
    control: (base, state) => ({
      ...base,
      border: state.isFocused ? "none" : "none",
      boxShadow: "rgba(0, 0, 0, 0.2) 0px 7px 29px 0px",
      background: "var(--bg)",
      borderRadius: "5px",
      margin: " 1em 0em",
      "&:hover": {
        border: state.isFocused ? "none;" : "none;",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "var(--bg)",
    }),
    option: (styles) => ({
      ...styles,
      background: "var(--bg)",
      color: "var(--text)",
    }),
    singleValue: (styles, { isDisabled, isFocused, isSelected }) => ({
      ...styles,
      color: isSelected ? "var(--text)" : "var(--text)",
    }),
  };

  const setfilter = (idx) => {
    if (selectedFilter) {
      if (selectedFilter.includes(idx)) {
        // Remove the index from selectedFilter
        setSelectedFilter(selectedFilter.filter((i) => i !== idx));
      } else {
        // Add the index to selectedFilter
        setSelectedFilter([...selectedFilter, idx]);
      }
    } else {
      //first time
      setSelectedFilter([idx]);
    }
  };

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

  const setJobTypeSelected = (idx) => {
    if (selectedJobtype) {
      if (selectedJobtype.includes(idx)) {
        // Remove the index from selectedJobtype
        setSelectedJobtype(selectedJobtype.filter((i) => i !== idx));
      } else {
        // Add the index to selectedJobtype
        setSelectedJobtype([...selectedJobtype, idx]);
      }
    } else {
      //first time
      setSelectedJobtype([idx]);
    }
  };

  //
  const openFilterRef = () => {
    filterRef.current.classList.toggle("active");
    document.body.classList.toggle("active");
  };

  // Country
  useEffect(() => {
    let datas = [];
    for (let i = 0; i < countryCode.length; i++) {
      const val = { label: countryCode[i].name, value: countryCode[i].name };
      datas.push(val);
    }
    setCountryOption(datas);
  }, []);

  //
  useEffect(() => {
    if (!jobs) {
      setIsLoading(true);
      dispatch(getJobs({ from: activeBtn - 1 })).then(() =>
        setIsLoading(false)
      );
    }
    dispatch(fetchSkills());
    dispatch(fetchRoles());
  }, [jobs]);

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

  //searchName
  const searchName = (e) => {
    e.preventDefault();
    const searchKeyword = e.target.text.value;
    if (searchKeyword) {
      const val = filterJob();
      // console.log({ companyKeyword: searchKeyword, ...val });
      dispatch(getJobs({ companyKeyword: searchKeyword, ...val }));
    } else {
      dispatch(getJobs({ from: activeBtn - 1 }));
    }
  };

  // Apply filter Helper function
  const filterJob = () => {
    const desiredStack = [];
    const desiredRoles = [];
    if (selectedFilter && selectedFilter.length >= 1) {
      for (let i = 0; i < selectedFilter.length; i++) {
        desiredStack.push(filters[selectedFilter[i]]);
      }
    }
    if (selectedJobtype && selectedJobtype.length >= 1) {
      for (let i = 0; i < selectedJobtype.length; i++) {
        desiredRoles.push(jobType[selectedJobtype[i]]);
      }
    }
    // console.log(desiredStack, desiredRoles, officeLoc, activeBtn);
    return {
      from: activeBtn - 1,
      desiredStack,
      desiredRoles,
      officeLoc,
      activeBtn,
      desiredLocation,
    };
  };

  // Apply filter
  const applyFilter = (e) => {
    e.preventDefault();
    const val = filterJob();
    dispatch(getJobs({ ...val }));
  };

  const addlocOffice = (e) => {
    const loc = e.target.getAttribute("data-index");
    setOfficeLoc((prev) => {
      if (prev.includes(loc)) {
        // Remove the location if it's already selected
        return prev.filter((location) => location !== loc);
      } else {
        // Add the location if it's not selected
        return [...prev, loc];
      }
    });
  };

  //
  useEffect(() => {
    const val = filterJob();
    dispatch(getJobs({ ...val }));
  }, [activeBtn]);

  // Skeleton Loader

  const SkeletonLoader = () => (
    <div className="skeleton-loader job">
      {[...Array(6)].map((i) => (
        <div key={i} className="skeleton-job box">
          <div className="skeleton-dpcont">
            <div className="skeleton-dp"></div>
            <div className="skeleton-dptxt">
              <div className="skeleton-subtext">
                <div className="skeleton-companyName"></div>
                <div className="skeleton-logo"></div>
              </div>
              <div className="skeleton-position"></div>
              <div className="skeleton-stack">
                <div className="skeleton-stack-item"></div>
                <div className="skeleton-stack-item"></div>
                <div className="skeleton-stack-item"></div>
              </div>
            </div>
          </div>
          <div className="skeleton-cont">
            <div className="skeleton-prime"></div>
            <div className="skeleton-loc"></div>
          </div>
          <div className="skeleton-view">
            <div className="skeleton-btn"></div>
            <div className="skeleton-btn"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>
          Web3jobportal - #1 Job Board for Finding Your Next Web3 Job
        </title>
        <meta
          name="description"
          content="Web3jobportal is the top platform to discover and connect with Web3 job opportunities worldwide. Find your next Web3 job today!"
        />
        <meta
          name="keywords"
          content="Web3 jobs, blockchain jobs, crypto jobs, decentralized jobs, find Web3 jobs, connect with degens, job board, Web3 careers"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Web3jobportal - #1 Job Board for Finding Your Next Web3 Job"
        />
        <meta
          property="og:description"
          content="Web3jobportal is where Web3 meets work. Discover and connect with Web3 job opportunities worldwide."
        />
        <meta property="og:image" content="/metaImage.png" />
        <meta property="og:url" content="https://www.web3jobportal.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Web3jobportal - #1 Job Board for Finding Your Next Web3 Job"
        />
        <meta
          name="twitter:description"
          content="Web3jobportal is where Web3 meets work. Discover and connect with Web3 job opportunities worldwide."
        />
        <meta name="twitter:image" content="/metaImage.png" />
      </Helmet>
      <section className="home">
        <header>
          <h1>
            The #1 <span>Job Board for</span> <br />
            finding your next web3 job
          </h1>
          <p>
            Web3jobportal is where web3 meets work and the best place to
            discover and connect with degens and jobs worldwide.
          </p>
          <Link to="/user/list/">+ Post a job</Link>
        </header>
        <div className="jobsCont">
          <ul className="job_nav">
            <li className="active">Job Board</li>
            <li>
              <Link to="/degens">Degen Search</Link>
            </li>
            <li className="filter" onClick={openFilterRef}>
              <GoFilter /> Filters
            </li>
          </ul>
          <div className="child">
            <main>
              <form action="" onSubmit={searchName}>
                <label htmlFor="text">
                  <IoIosSearch className="icon" />
                </label>
                <input
                  type="text"
                  name="text"
                  placeholder="Search by company name"
                />
              </form>
              <h1>Recent posts</h1>
              <div className="rows">
                {isLoading ? (
                  <SkeletonLoader />
                ) : jobs && jobs.length > 0 ? (
                  jobs.map((job) => (
                    <div
                      className={job.color === "1" ? "box highlight" : "box"}
                      key={job._id}
                      style={
                        job.color === "2"
                          ? { backgroundColor: job.colorInt }
                          : {}
                      }
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
                        <div className="prime">
                          Posted {timeAgo(job.createdAt)}
                        </div>
                        <div className="loc">
                          <FaLocationDot />
                          {job.type.map((list) => (
                            <>{list}</>
                          ))}
                        </div>
                      </div>
                      <div className="view">
                        <Link to={`jobs/${job._id}`} className="btn">
                          View Job
                        </Link>
                        <Link to={`jobs/${job._id}`} className="btn">
                          Apply now
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-jobs-found">
                    <h2>No jobs found</h2>
                    <p>Try adjusting your search criteria or filters.</p>
                  </div>
                )}
                {jobs && jobs.length > 0 && (
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
                )}
              </div>
            </main>
            <div className="searchCont" ref={filterRef}>
              <h1>Filters</h1>
              <MdCancel className="cancelBtn" onClick={openFilterRef} />
              <div className="rows">
                {skills &&
                  skills.map((list) => (
                    <div
                      className={
                        selectedFilter
                          ? selectedFilter.includes(list._id)
                            ? "btn active"
                            : "btn"
                          : "btn"
                      }
                      key={list._id}
                      onClick={() => {
                        setfilter(list._id);
                      }}
                    >
                      {list.name}
                    </div>
                  ))}
              </div>
              <div className="rows">
                <Select
                  options={countryOption}
                  name="country"
                  defaultValue={{ label: "United States", value: "usa" }}
                  placeholder={"- SELECT COUNTRY -"}
                  styles={style}
                  onChange={(e) => {
                    setDesiredLocation(e.value);
                  }}
                  className="select"
                />
                <div
                  className={
                    officeLoc.includes("remote") ? "btn active" : "btn"
                  }
                  onClick={addlocOffice}
                  data-index="remote"
                >
                  Open to remote
                </div>
                <div
                  className={officeLoc.includes("site") ? "btn active" : "btn"}
                  onClick={addlocOffice}
                  data-index="site"
                >
                  On site
                </div>
              </div>
              <div className="rows">
                {roles &&
                  roles.map((list) => (
                    <div
                      className={
                        selectedJobtype
                          ? selectedJobtype.includes(list._id)
                            ? "btn active"
                            : "btn"
                          : "btn"
                      }
                      key={list._id}
                      onClick={() => {
                        setJobTypeSelected(list._id);
                      }}
                    >
                      {list.name}
                    </div>
                  ))}
              </div>
              <button onClick={applyFilter}>Apply Filter</button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <FAQSection />
      </section>
    </>
  );
}

export default Home;
