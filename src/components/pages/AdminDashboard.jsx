import React from "react";
import "../../assets/css/admindashboard.css";
import { NavLink, Route, Routes } from "react-router-dom";
import Filters from "./admin/Filters";
import AdminJobs from "./admin/AdminJobs";
import Users from "./admin/Users";
import ListJob from "./admin/ListJob";
// import Profile from "./user/Profile";
// import ListJob from "./user/ListJob";

function AdminDashboard() {
  return (
    <section className="admindashboard">
      <ul className="sub_nav">
        <li className="active">
          <NavLink to="/admin/" end>
         Add Filters
          </NavLink>
        </li>
        <li>
          <NavLink to="jobs/" end>
            Jobs
          </NavLink>
        </li>
        <li>
          <NavLink to="users/" end>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="listjob/" end>
            listJob
          </NavLink>
        </li>
      </ul>
      <main>
      <Routes>
        <Route path="/" element={<Filters />} />
        <Route path="/jobs" element={<AdminJobs />} />
        <Route path="/users/" element={<Users />} />
        <Route path="/listjob/" element={<ListJob />} />
      </Routes>
      </main>
    </section>
  );
}

export default AdminDashboard;
