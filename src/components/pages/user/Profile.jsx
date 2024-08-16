import React, { useEffect, useRef, useState } from "react";
import "../../../assets/css/userprofile.css";
import dp from "../../../assets/images/dp3.jpg";
import Select from "react-select";
import countryCode from "../../../utils/countryCode.json";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { HiMiniClipboardDocument } from "react-icons/hi2";
import { TbWorld } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { clear, getUser, updateUser } from "../../../redux/degenwork";
import { errorMsgs, successMsg } from "../../../utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiLogoTelegram } from "react-icons/bi";
import { FaLanguage } from "react-icons/fa";

function Profile() {
  const dispatch = useDispatch();
  const [countryOption, setCountryOption] = useState([]);
  const [filters, setFilters] = useState([]);
  const { error, success, user, skills, roles } = useSelector(
    (state) => state.degenwork
  );
  const displayRef = useRef(null);

  const [formdata, setformdata] = useState({
    username: "",
    website: "",
    twitter: "",
    telegram: "",
    linkelnd: "",
    userlanguage: "",
    github: "",
    location: "",
    jobtype: [],
    skills: [],
    userRoles: [],
    bio: "",
  });
  const {
    username,
    website,
    twitter,
    telegram,
    linkelnd,
    userlanguage,
    github,
    location,
    jobtype,
    userSkills,
    userRoles,
    bio,
  } = formdata;

  // You can then set the filters if needed with setFilters(formattedFilters);

  const [jobRoles, setjobRoles] = useState([]);
  const jobtypeOpt = [
    { label: "Remote", value: "remote" },
    { label: "On Site", value: "site" },
  ];

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

  const updateImg = (e) => {
    displayRef.current.src = URL.createObjectURL(e.target.files[0]);
  };

  const onChange = (e) =>
    setformdata({ ...formdata, [e.target.name]: e.target.value });

  const handleLocationChange = (selectedOption) => {
    setformdata((prevFormdata) => ({
      ...prevFormdata,
      location: selectedOption,
    }));
  };

  const handleSkillsChange = (selectedOptions) => {
    setformdata((prevFormdata) => ({
      ...prevFormdata,
      userSkills: selectedOptions,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(e.target));
  };

  useEffect(() => {
    let datas = [];
    for (let i = 0; i < countryCode.length; i++) {
      const val = { label: countryCode[i].name, value: countryCode[i].name };
      datas.push(val);
    }
    setCountryOption(datas);
  }, []);

  // Get user
  useEffect(() => {
    if (user) {
      setformdata({
        username: user.username,
        website: user.website,
        twitter: user.twitter,
        telegram: user.telegram,
        linkelnd: user.linkelnd,
        userlanguage: user.userlanguage,
        github: user.github,
        location: { label: user.location, value: user.location },
        jobtype: user.jobtype
          ? user.jobtype.map((type) => ({ label: type, value: type }))
          : [],
        userSkills: user.skills
          ? user.skills.map((skill) => ({ label: skill, value: skill }))
          : [],
        userRoles: user.roles
          ? user.roles.map((role) => ({ label: role, value: role }))
          : [],
        bio: user.bio,
      });
    } else {
      dispatch(getUser());
    }
  }, [user]);

  //
  //
  useEffect(() => {
    if (skills) {
      let datas = [];
      for (let i = 0; i < skills.length; i++) {
        const val = { label: skills[i].name, value: skills[i].name };
        datas.push(val);
      }
      setFilters(datas);
    } else {
      dispatch(fetchSkills());
    }
    // Roles
    if (roles) {
      let datas = [];
      for (let i = 0; i < roles.length; i++) {
        const val = { label: roles[i].name, value: roles[i].name };
        datas.push(val);
      }
      setjobRoles(datas);
    } else {
      dispatch(fetchRoles());
    }
  }, [roles, skills]);
  //
  useEffect(() => {
    if (error) {
      errorMsgs(error);
    }
    if (success) {
      successMsg(success);
      setTimeout(() => {
        dispatch(getUser());
      }, 5000);
    }
    // console.log(error);
    dispatch(clear());
  }, [success, error]);
  return (
    <div className="profile">
      <ToastContainer />
      <form action="" onSubmit={onSubmit}>
        <label htmlFor="file" className="file">
          <img src={user && user.dp ? user.dp : dp} alt="" ref={displayRef} />
          <input
            type="file"
            id="file"
            name="file"
            className="dpInt"
            onChange={updateImg}
          />
        </label>
        <div className="txtcont">
          <div className="rows">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={onChange}
            />
          </div>
          <div className="rows">
            <label htmlFor="website">
              <TbWorld className="icon" />
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={website}
              onChange={onChange}
            />
          </div>
          <div className="rows">
            <label htmlFor="twitter">
              <FaTwitter className="icon" />
              Twitter(X)
            </label>
            <input
              type="url"
              id="twitter"
              name="twitter"
              value={twitter}
              onChange={onChange}
            />
          </div>
          <div className="rows">
            <label htmlFor="telegram">
              <BiLogoTelegram className="icon" />
              Telegram
            </label>
            <input
              type="url"
              id="telegram"
              name="telegram"
              value={telegram}
              onChange={onChange}
              placeholder="Telegram url"
            />
          </div>
          <div className="rows">
            <label htmlFor="linkelnd">
              <FaLinkedin className="icon" />
              Linkelnd
            </label>
            <input
              type="url"
              id="linkelnd"
              name="linkelnd"
              value={linkelnd}
              onChange={onChange}
            />
          </div>
          <div className="rows">
            <label htmlFor="github">
              <FaGithub className="icon" />
              Github
            </label>
            <input
              type="text"
              id="github"
              name="github"
              value={github}
              onChange={onChange}
            />
          </div>
          <div className="rows">
            <label htmlFor="userlanguage">
              <FaLanguage className="icon" />
              Language
            </label>
            <input
              type="text"
              id="userlanguage"
              name="userlanguage"
              value={userlanguage}
              onChange={onChange}
              placeholder="English, french"
            />
          </div>
          <div className="rows">
            <label htmlFor="country">Location</label>
            <Select
              options={countryOption}
              value={location}
              onChange={handleLocationChange}
              name="location"
              placeholder={"- SELECT COUNTRY -"}
              styles={style}
              className="select"
            />
          </div>
          <div className="rows">
            <label htmlFor="type">Job Type</label>
            <Select
              isMulti
              options={jobtypeOpt}
              name="jobtype"
              placeholder={"- SELECT JOB TYPE -"}
              styles={style}
              className="select"
            />
          </div>
          <div className="rows">
            <label htmlFor="userSkills">Skills</label>
            <Select
              isMulti
              options={filters}
              name="skills"
              id="userSkills"
              placeholder={"- SELECT Skills -"}
              styles={style}
              onChange={handleSkillsChange}
              value={userSkills}
              className="select"
            />
          </div>
          <div className="rows">
            <label htmlFor="roles">Roles</label>
            <Select
              isMulti
              options={jobRoles}
              name="roles"
              id="roles"
              placeholder={"- SELECT Roles -"}
              styles={style}
              className="select"
            />
          </div>
          <div className="rows bio">
            <label htmlFor="bio">Biography</label>
            <textarea
              name="bio"
              id="bio"
              value={bio}
              onChange={onChange}
            ></textarea>
          </div>
          <div className="rows bio">
            <button>Update</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
