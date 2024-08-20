import { useEffect, useRef, useState } from "react";
import "../../assets/css/degen.css";
import { IoIosSearch } from "react-icons/io";
import { FaLinkedin, FaSackDollar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";
import company_logo from "../../assets/images/company_logo.png";
import dp from "../../assets/images/dp.jpg";
import dp1 from "../../assets/images/dp1.png";
import dp2 from "../../assets/images/dp2.jpg";
import dp3 from "../../assets/images/dp3.jpg";
import Select from "react-select";
import countryCode from "../../utils/countryCode.json";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { GoFilter } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, fetchSkills, fetchUsers } from "../../redux/degenwork";
import { truncateString } from "../../utils/utils";
import location from "../../assets/images/location.svg";
import { Helmet } from "react-helmet";

function Degens({ setSignupPopUp }) {
  const dispatch = useDispatch();
  const [countryOption, setCountryOption] = useState([]);
  const [filters, setFilters] = useState([
    // Original Skills
    "Solidity",
    "Brand / Graphic Design",
    "Illustrator",
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
  const filterRef = useRef(null);

  const [btns, setBtns] = useState([]);
  const [activeBtn, setActiveBtn] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const { users, usersCount, skills, roles } = useSelector(
    (state) => state.degenwork
  );

  const style = {
    control: (base, state) => ({
      ...base,
      border: state.isFocused ? "none" : "none",
      boxShadow: "var(--bxshadow)",
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

  useEffect(() => {
    let datas = [];
    for (let i = 0; i < countryCode.length; i++) {
      const val = { label: countryCode[i].name, value: countryCode[i].name };
      datas.push(val);
    }
    setCountryOption(datas);
  }, []);

  useEffect(() => {
    if (!users) {
      setIsLoading(true);
      dispatch(fetchUsers({ from: activeBtn - 1 })).then(() =>
        setIsLoading(false)
      );
    }

    dispatch(fetchSkills());
    dispatch(fetchRoles());

    if (users && users.length > 0) {
      setIsLoading(false);
    }
  }, [users]);

  //
  // Get Degens
  useEffect(() => {
    if (usersCount) {
      const partSize = import.meta.env.VITE_DEGEN_PART_SIZE;
      const maxVisibleButtons = 10;
      const totalPages = Math.ceil(usersCount / partSize); // Define totalPages here

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
  }, [usersCount]);
  //Fetch new when onclick
  useEffect(() => {
    dispatch(fetchUsers({ from: activeBtn - 1 }));
  }, [activeBtn]);

  //
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
  const checkUserLoggedin = (e) => {
    if (!localStorage.getItem("token")) {
      e.preventDefault();
      setSignupPopUp(true);
    }
  };

  //searchName
  const searchName = (e) => {
    e.preventDefault();
    const searchKeyword = e.target.text.value;
    if (searchKeyword) {
      const val = filterJob();
      dispatch(fetchUsers({ usernameKeyword: searchKeyword, ...val }));
    } else {
      dispatch(fetchUsers({ from: activeBtn - 1 }));
    }
  };

  // Apply filter Helper function
  const filterJob = () => {
    const desiredStack = [];
    const desiredRoles = [];
    if (selectedFilter && selectedFilter.length >= 1) {
      for (let i = 0; i < selectedFilter.length; i++) {
        desiredStack.push(selectedFilter[i]);
      }
    }
    if (selectedJobtype && selectedJobtype.length >= 1) {
      for (let i = 0; i < selectedJobtype.length; i++) {
        desiredRoles.push(selectedJobtype[i]);
      }
    }
    // console.log(desiredStack, desiredRoles, officeLoc, activeBtn);
    return {
      from: activeBtn - 1,
      desiredStack,
      desiredRoles,
      jobType: officeLoc,
      activeBtn,
      desiredLocation,
    };
  };

  // Apply filter
  const applyFilter = (e) => {
    e.preventDefault();
    const val = filterJob();
    dispatch(fetchUsers({ ...val }));
  };

  const SkeletonLoader = () => (
    <div className="skeleton-loader degen">
      {[...Array(12)].map((i) => (
        <div key={i} className="box skeleton-box">
          <div className="skeleton-dpcont">
            <div className="skeleton-dp"></div>
            <div className="skeleton-dptxt">
              <div className="skeleton-username"></div>
              <div className="skeleton-skill"></div>
            </div>
          </div>
          <div className="skeleton-links">
            <div className="skeleton-icon"></div>
            <div className="skeleton-icon"></div>
            <div className="skeleton-icon"></div>
          </div>
          <div className="skeleton-view">
            <div className="skeleton-btn"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Search Degens | web3jobportal</title>
        <meta
          name="description"
          content="Find and connect with talented degens."
        />
      </Helmet>
      <section className="degen">
        <h1>Search degens</h1>
        <div className="child">
          <main>
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
            <div className="txtcont">
              <h1>Our Degens</h1>
              <h4 className="filter" onClick={openFilterRef}>
                <GoFilter /> Filters
              </h4>
            </div>
            <div className="rows">
              {isLoading ? (
                <SkeletonLoader />
              ) : users && users.length > 0 ? (
                users.map((user) => (
                  <div className="box" key={user._id}>
                    <div className="dpcont">
                      <img
                        src={user?.dp ? user?.dp : dp3}
                        alt="dp"
                        className="dp"
                      />
                      <div className="dptxt">
                        <h3>
                          {user?.username
                            ? user?.username
                            : truncateString(user?.email)}
                        </h3>
                        <h4>
                          <img src={location} alt="location" />
                          {user?.location}
                        </h4>
                        <ul>
                          {user?.skills &&
                            user?.skills.map((list, idx) => (
                              <li key={idx}>{list}</li>
                            ))}
                        </ul>
                        <p>{user.bio}</p>
                      </div>
                    </div>
                    <div className="view">
                      <Link
                        to={`/degen/${user._id}`}
                        onClick={checkUserLoggedin}
                        className="btn"
                      >
                        View Degen
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results-found">
                  <h2>No degens found</h2>
                  <p>Try adjusting your search criteria or filters.</p>
                </div>
              )}
              {users && users.length > 0 && (
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
                        ? selectedFilter.includes(list.name)
                          ? "btn active"
                          : "btn"
                        : "btn"
                    }
                    key={list._id}
                    onClick={() => {
                      setfilter(list.name);
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
                onChange={(e) => {
                  setDesiredLocation(e.value);
                }}
                styles={style}
                className="select"
              />
              <div
                className={officeLoc.includes("remote") ? "btn active" : "btn"}
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
                        ? selectedJobtype.includes(list.name)
                          ? "btn active"
                          : "btn"
                        : "btn"
                    }
                    key={list._id}
                    onClick={() => {
                      setJobTypeSelected(list.name);
                    }}
                  >
                    {list.name}
                  </div>
                ))}
            </div>
            <button onClick={applyFilter}>Apply Filter</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Degens;
