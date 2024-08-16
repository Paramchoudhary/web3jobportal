import React, { useEffect, useRef, useState } from "react";
import "../../../assets/css/listjob.css";
import dp from "../../../assets/images/dp3.jpg";
import paypal from "../../../assets/images/paypal.png";
import Select from "react-select";
import countryCode from "../../../utils/countryCode.json";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer } from "react-toastify";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { errorMsgs, successMsg } from "../../../utils/utils";

//
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, extensions, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar, { editorExtensions } from "./MenuBar";
import { Link } from "react-router-dom";
import JobPreview from "../../layouts/JobPreview";
import { fetchRoles, fetchSkills } from "../../../redux/degenwork";

function ListJob() {
  const dispatch = useDispatch();
  const displayRef = useRef(null);
  const formRef = useRef(null);
  const [countryOption, setCountryOption] = useState([]);
  const [preview, setPreview] = useState(false);
  const [filters, setFilters] = useState([]);
  const [jobRoles, setjobRoles] = useState([]);
  const [formdata, setformdata] = useState({
    companyName: "",
    position: "",
    location: [],
    type: [],
    stack: [],
    roles: [],
    jobDescription: "",
    dp: "",
    minsalary: "",
    maxsalary: "",
    color: "",
    colorInt: "",
  });
  //
  const [jobDescription, setJobDescription] = useState("");
//
const { users, usersCount , skills, roles } = useSelector((state) => state.degenwork);

  const onChange = (e, name) => {
    if (e && e.target) {
      // Handle regular input fields
      setformdata({ ...formdata, [e.target.name]: e.target.value });
    } else if (Array.isArray(e)) {
      // Handle multi-select fields
      setformdata({
        ...formdata,
        [name.name]: e.map((option) => option.value),
      });
    } else {
      // Handle single-select fields
      setformdata({ ...formdata, [name]: e.value });
    }
  };

  //
  const handleEditorUpdate = ({ editor }) => {
    setJobDescription(editor.getHTML());
    setformdata({ ...formdata, ["jobDescription"]: editor.getHTML() });
  };

  //
  const [selectedFeatures, setSelectedFeatures] = useState({
    premiumSupport: false,
    emailBlast: false,
    sticky: 0,
    logo: false,
    color: 0,
  });

  //
  const handleFeatureChange = (feature, value) => {
    setSelectedFeatures((prev) => ({ ...prev, [feature]: value }));
  };
  //
  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    const rawContentState = convertToRaw(newEditorState.getCurrentContent());
    const htmlContent = draftToHtml(rawContentState);
    setJobDescription(htmlContent);
  };

  const jobtype = [
    { label: "Remote", value: "remote" },
    { label: "On Site", value: "on site" },
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

  const toolbarConfig = {
    options: ["inline", "blockType", "list", "history"],
    inline: {
      options: ["bold", "italic", "underline", "strikethrough"],
    },
    blockType: {
      inDropdown: false,
      options: ["Normal", "H1", "H2", "H3"],
    },
    list: {
      options: ["unordered", "ordered"],
    },
  };

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
  dispatch(fetchSkills());
  dispatch(fetchRoles());
}, []);
// 
  const updateImg = (e) => {
    displayRef.current.src = URL.createObjectURL(e.target.files[0]);
    setformdata({
      ...formdata,
      ["dp"]: URL.createObjectURL(e.target.files[0]),
    });
  };

  const calculateTotalViews = () => {
    let views = 200; // Base views

    if (selectedFeatures.premiumSupport) views *= 1.5;
    if (selectedFeatures.emailBlast) views *= 10;
    if (selectedFeatures.sticky) views *= 8 + selectedFeatures.sticky;
    if (selectedFeatures.logo) views *= 20;
    if (selectedFeatures.color === 1) views *= 2;
    if (selectedFeatures.color === 2) views *= 6;

    return views;
  };

  const calculateTotalPrice = () => {
    let price = 0;

    if (selectedFeatures.premiumSupport) price += 49;
    if (selectedFeatures.emailBlast) price += 85;
    if (selectedFeatures.sticky) price += 15 * selectedFeatures.sticky;
    if (selectedFeatures.logo) price += 49;
    if (selectedFeatures.color === 1) price += 99;
    if (selectedFeatures.color === 2) price += 149;

    return price;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/jobs`,
        e.target
      );
      console.log(response.data.msg && response.data.msg.includes("https"));
      if (response.data.msg && response.data.msg.includes("https")) {
        window.location.href = response.data.msg;
      } else {
        successMsg("Listed Successfully");
        formRef.current.reset();
      }
    } catch (error) {
      errorMsgs(error.response.data.err);
    }
  };

  // 
  //   
  useEffect(() => {
    console.log(skills);
    if (skills) {
        let datas = [];
    for (let i = 0; i < skills.length; i++) {
      const val = { label: skills[i].name, value: skills[i].name };
      datas.push(val);
    }
    setFilters(datas);
    }
    // Roles
    if (roles) {
        let datas = [];
    for (let i = 0; i < roles.length; i++) {
      const val = { label: roles[i].name, value: roles[i].name };
      datas.push(val);
    }
    setjobRoles(datas);
    }
  }, [roles, skills]);

  /**
   * Working on the preview
   */
  

  return (
    <div className="listjob">
      <ToastContainer />
      <form action="" onSubmit={onSubmit} ref={formRef}>
        <div className="txtcont">
          <div className="rows">
            <label htmlFor="companyname">Company Name</label>
            <input
              type="text"
              id="companyname"
              name="companyName"
              onChange={onChange}
            />
            <p>
              Your company's brand/trade name: without Inc., Ltd., B.V., Pte.,
              etc.
            </p>
          </div>
          <div className="rows">
            <label htmlFor="position">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              onChange={onChange}
            />
            <p>
              Please specify as single job position like "Marketing Manager" or
              "Node JS Developer", not a sentence like "Looking for PM / Biz Dev
              / Manager". We know your job is important but please DO NOT WRITE
              IN FULL CAPS. If posting multiple roles, please create multiple
              job posts. A job post is limited to a single job. We only allow
              real jobs, absolutely no MLM-type courses "learn how to work
              online" please.
            </p>
          </div>
          <div className="rows">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
            <p>
              Email for invoices, applicants and job edit link. Stays private.
            </p>
          </div>
          <div className="rows">
            <label htmlFor="location">
              <TbWorld className="icon" />
              Location
            </label>
            <Select
              isMulti
              options={countryOption}
              name="location"
              placeholder={"- SELECT COUNTRY -"}
              onChange={onChange}
              styles={style}
              className="select"
            />
            <p>
              If you'd only like to hire people from a specific location or
              timezone this remote job is restricted to (e.g. Europe, United
              States or Japan). If not restricted, please leave it as
              "Worldwide". The less restricted this is, the more applicants you
              will get. Keeping it "Worldwide" is highly recommended as you'll
              have access to a worldwide pool of talent. To promote fairness in
              remote work positions, worldwide jobs are ranked higher.
            </p>
          </div>
          <div className="rows">
            <label htmlFor="type">Job Type</label>
            <Select
              isMulti
              options={jobtype}
              name="type"
              placeholder={"- SELECT JOB TYPE -"}
              onChange={onChange}
              styles={style}
              className="select"
            />
          </div>
          <div className="rows">
            <label htmlFor="stack">
              Tags, keywords or Stack
              <span>*</span>
            </label>
            <Select
              isMulti
              options={filters}
              name="stack"
              onChange={onChange}
              id="stack"
              placeholder={"- SELECT stack -"}
              styles={style}
              className="select"
            />
            <p>
              Short tags are preferred. Use tags like industry and tech stack.
              The first 3 or 4 tags are shown on the site, the other tags aren't
              but the job will be shown on each tag specific page (like
              /remote-react-jobs). We also sometimes generate tags automatically
              after you post/edit to supplement.
            </p>
          </div>
          <div className="rows">
            <label htmlFor="roles">Roles</label>
            <Select
              isMulti
              options={jobRoles}
              name="roles"
              id="roles"
              placeholder={"- SELECT Roles -"}
              onChange={onChange}
              styles={style}
              className="select"
            />
          </div>
          <div className="rows">
            <label htmlFor="apply">Apply</label>
            <div className="box">
              {" "}
              <input
                type="email"
                id="apply"
                name="applyemail"
                placeholder="Drop Apply email"
              />
              <input
                type="url"
                id="apply"
                name="weburl"
                placeholder="Drop Apply Website"
              />
            </div>
            <p>Tips: Drop either email or website url, we can use</p>
          </div>
          <div className="rows">
            <label htmlFor="salary">Salary</label>
            <div className="box">
              {" "}
              <input
                type="tel"
                id="text"
                name="minsalary"
                onChange={onChange}
                placeholder="Min Yearly Salary"
              />
              <input
                type="tel"
                id="text"
                name="maxsalary"
                onChange={onChange}
                placeholder="Max Yearly Salary"
              />
            </div>
            <p>
              Tips: Jobs with salaries have more views ($65,000 to $100,000
              Yearly)
            </p>
          </div>
          <div className="rows bio">
            <label htmlFor="bio">Job description*</label>
            <EditorProvider
              slotBefore={<MenuBar />}
              extensions={editorExtensions}
              onUpdate={handleEditorUpdate}
              className="editor"
            />
            {/* Hidden input to store the HTML content */}
            {/* <input type="hidden" name="jobDescription" value={jobDescription} /> */}
            <input type="hidden" name="jobDescription" value={jobDescription} />
          </div>
          <div className="pricetags">
            <h2>Design your job post</h2>
            <div className="tags">
              <div className="tag">
                <input
                  type="radio"
                  name="premiumSupport"
                  id="premiumSupport"
                  checked={selectedFeatures.premiumSupport}
                  onChange={(e) =>
                    handleFeatureChange("premiumSupport", e.target.checked)
                  }
                />
                <label htmlFor="premiumSupport">
                  {" "}
                  Get premium support and help with your job post: +$49
                </label>
              </div>
              <div className="tag">
                <input
                  type="radio"
                  name="emailBlast"
                  id="emailBlast"
                  checked={selectedFeatures.emailBlast}
                  onChange={(e) =>
                    handleFeatureChange("emailBlast", e.target.checked)
                  }
                />
                <label htmlFor="emailBlast">
                  Email blast my job post to 📮All remote candidates (+$85)
                </label>
                <h4 className="views">10X MORE VIEWS</h4>
              </div>
              <h2>Stick your post to the top for:</h2>
              <div className="tag">
                <input
                  type="radio"
                  name="sticky"
                  id="sticky"
                  value={0}
                  checked={selectedFeatures.sticky === 0}
                  onChange={(e) =>
                    handleFeatureChange("sticky", parseInt(e.target.value))
                  }
                />
                <label htmlFor="sticky" className="lab">
                  {" "}
                  No sticky
                  <h4 className="views">2X MORE VIEWS</h4>
                </label>
              </div>
              <div className="tag">
                <input
                  type="radio"
                  name="sticky"
                  id="sticky1"
                  value={3}
                  checked={selectedFeatures.sticky === 3}
                  onChange={(e) =>
                    handleFeatureChange("sticky", parseInt(e.target.value))
                  }
                />
                <label htmlFor="sticky1" className="lab">
                  3 days: +$45
                  <h4 className="views">8X MORE VIEWS</h4>
                </label>
              </div>
              <div className="tag">
                <input
                  type="radio"
                  name="sticky"
                  id="sticky2"
                  value={7}
                  checked={selectedFeatures.sticky === 7}
                  onChange={(e) =>
                    handleFeatureChange("sticky", parseInt(e.target.value))
                  }
                />
                <label htmlFor="sticky2" className="lab">
                  7 days: +$105
                  <h4 className="views">8X MORE VIEWS</h4>
                </label>
              </div>
              <div className="tag">
                <input
                  type="radio"
                  name="sticky"
                  id="sticky3"
                  value={14}
                  checked={selectedFeatures.sticky === 14}
                  onChange={(e) =>
                    handleFeatureChange("sticky", parseInt(e.target.value))
                  }
                />
                <label htmlFor="sticky3" className="lab">
                  14 days: +$210
                  <h4 className="views">10X MORE VIEWS</h4>
                </label>
              </div>
              <div className="tag">
                <input
                  type="radio"
                  name="sticky"
                  id="sticky4"
                  value={30}
                  checked={selectedFeatures.sticky === 30}
                  onChange={(e) =>
                    handleFeatureChange("sticky", parseInt(e.target.value))
                  }
                />
                <label htmlFor="sticky4" className="lab">
                  30 days: +$450
                  <h4 className="views">13X MORE VIEWS</h4>
                </label>
              </div>
              <div className="tag">
                <input
                  type="radio"
                  name="logo"
                  id="logo"
                  checked={selectedFeatures.logo}
                  onChange={(e) =>
                    handleFeatureChange("logo", e.target.checked)
                  }
                />
                <label htmlFor="logo" className="lab">
                  Add a logo to your job post +$49
                  <h4 className="views">20X MORE VIEWS</h4>
                </label>
                <label htmlFor="companyLogo" className="dp">
                  <img src={dp} alt="" ref={displayRef} />
                </label>
                <input
                  type="file"
                  name="file"
                  id="companyLogo"
                  className="int"
                  onChange={updateImg}
                />
              </div>
              <h2>Highlight your job post with:</h2>
              <div className="tag">
                <input
                  type="radio"
                  name="color"
                  id="color"
                  value={0}
                  checked={selectedFeatures.color === 0}
                  onChange={(e) =>
                    handleFeatureChange("color", parseInt(e.target.value))
                  }
                />
                <label htmlFor="color" className="lab">
                  No color
                </label>
              </div>
              <div className="tag">
                <input
                  type="radio"
                  name="color"
                  id="color1"
                  value={1}
                  checked={selectedFeatures.color === 1}
                  onChange={(e) =>
                    handleFeatureChange("color", parseInt(e.target.value))
                  }
                />
                <label htmlFor="color1" className="lab">
                  Standard color +$99
                  <h4 className="views">2X MORE VIEWS</h4>
                </label>
              </div>
              <div className="tag">
                <input
                  type="radio"
                  name="color"
                  id="color2"
                  value={2}
                  checked={selectedFeatures.color === 2}
                  onChange={(e) =>
                    handleFeatureChange("color", parseInt(e.target.value))
                  }
                />
                <label htmlFor="color2" className="lab">
                  Custom brand color +$149
                  <h4 className="views">6X MORE VIEWS</h4>
                </label>
                <input type="color" name="colorInt" id="color3" />
              </div>
            </div>
          </div>
          <div className="rows bio">
            <button
              onClick={(e) => {
                e.preventDefault();
                setPreview(true);
              }}
            >
              Preview Job
            </button>
          </div>
        </div>
        <div className="priceSec">
          <h2>Design your job post</h2>
          <img src={paypal} alt="" />
          <h3>
            {" "}
            <span>Reach: </span>
            {calculateTotalViews()} X VIEWS
          </h3>
          <button>
            <div className="inner">Pay ${calculateTotalPrice()}</div>
          </button>
        </div>
      </form>

      {preview && <JobPreview setPreview={setPreview} formdata={formdata} />}
    </div>
  );
}

export default ListJob;
