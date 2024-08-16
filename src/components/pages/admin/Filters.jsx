import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addRoles,
  addSkills,
  clear,
  deleteRoles,
  deleteSkills,
  fetchRoles,
  fetchSkills,
} from "../../../redux/degenwork";
import { ToastContainer } from "react-toastify";
import { errorMsgs, successMsg } from "../../../utils/utils";

function Filters() {
  const dispatch = useDispatch();
  const { skills, roles, error, success } = useSelector(
    (state) => state.degenwork
  );

  const skillsRef = useRef(null);
  const rolesRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedRolesFilter, setSelectedRolesFilter] = useState(null);
  const setfilter = (idx) => {
    if (selectedFilter) {
      if (selectedFilter.includes(idx)) {
        // Remove the index from selectedFilter
        if (selectedFilter.length <= 1) {
          setSelectedFilter(null);
        } else {
          setSelectedFilter(selectedFilter.filter((i) => i !== idx));
        }
      } else {
        // Add the index to selectedFilter
        setSelectedFilter([...selectedFilter, idx]);
      }
    } else {
      //first time
      setSelectedFilter([idx]);
    }
  };

  const setRoleFilter = (idx) => {
    if (selectedRolesFilter) {
      if (selectedRolesFilter.includes(idx)) {
        // Remove the index from selectedRolesFilter
        if (selectedRolesFilter.length <= 1) {
          setSelectedRolesFilter(null);
        } else {
          setSelectedRolesFilter(selectedRolesFilter.filter((i) => i !== idx));
        }
      } else {
        // Add the index to setSelectedRolesFilter
        setSelectedRolesFilter([...selectedRolesFilter, idx]);
      }
    } else {
      //first time
      setSelectedRolesFilter([idx]);
    }
  };

  const addSkillsFilter = (e) => {
    e.preventDefault();
    if (e.target.name.value.trim() !== "") {
      dispatch(addSkills(e.target));
      skillsRef.current.reset();
      dispatch(fetchSkills());
    }
  };
  //
  const addRolesFilter = (e) => {
    e.preventDefault();
    if (e.target.name.value.trim() !== "") {
      dispatch(addRoles(e.target));
      rolesRef.current.reset();
      dispatch(fetchRoles());
    }
  };

  useEffect(() => {
    // console.log(error);
    if (success) {
      successMsg(success);
      setSelectedFilter(null);
      setSelectedRolesFilter(null);
    } else if (error) {
      errorMsgs(error);
    }
    dispatch(clear());
  }, [success, error]);
  
  //
  useEffect(() => {
    dispatch(fetchSkills());
    dispatch(fetchRoles());
  }, []);

  const deleteSkillsFunc = (e) => {
    dispatch(deleteSkills({ selectedFilter: selectedFilter }));
    dispatch(fetchSkills());
  };
  const deleteRolesFunc = (e) => {
    dispatch(deleteRoles({ selectedFilter: selectedRolesFilter }));
    dispatch(fetchRoles());
  };

  return (
    <div className="filters">
      <ToastContainer />
      <div className="formcont">
        <form action="" ref={skillsRef} onSubmit={addSkillsFilter}>
          <h1>Add Filters</h1>
          <input type="text" placeholder="e.g (Solidity)" name="name" />
          <button>Add Skills</button>
        </form>
        <form action="" ref={rolesRef} onSubmit={addRolesFilter}>
          <h1>Add Roles</h1>
          <input type="text" placeholder="e.g (Part-time)" name="name" />
          <button>Add Roles</button>
        </form>
      </div>
      <div className="box">
        <h1>Skills</h1>
        <div
          className={selectedFilter ? "deleteBtn active" : "deleteBtn"}
          onClick={deleteSkillsFunc}
        >
          <MdDelete />
        </div>
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
      </div>
      <div className="box">
        <h1>Roles</h1>
        <div
          className={selectedRolesFilter ? "deleteBtn active" : "deleteBtn"}
          onClick={deleteRolesFunc}
        >
          <MdDelete />
        </div>
        <div className="rows">
          {roles &&
            roles.map((list) => (
              <div
                className={
                  selectedRolesFilter
                    ? selectedRolesFilter.includes(list._id)
                      ? "btn active"
                      : "btn"
                    : "btn"
                }
                key={list._id}
                onClick={() => {
                  setRoleFilter(list._id);
                }}
              >
                {list.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Filters;
