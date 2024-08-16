import React, { useEffect } from "react";
import "../../assets/css/userdashboard.css";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./user/Profile";
import ListJob from "./user/ListJob";

function UserDashbaord() {
const navigate = useNavigate();
  useEffect(()=>{
    if (localStorage.role === "admin") {
      navigate("/admin/")
    }
  },[])
  return (
    <section className="userdashboard">
      <ul className="sub_nav">
        <li className="active">
          <NavLink to="/user/" end>
          Profile
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="profile/" end>
            Work
          </NavLink>
        </li> */}
        <li>
          <NavLink to="list/" end>
            List Job
          </NavLink>
        </li>
      </ul>
      <main>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/list" element={<ListJob />} />
      </Routes>
      </main>
    </section>
  );
}

export default UserDashbaord;
