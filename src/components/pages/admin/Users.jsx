import React, { useEffect, useState } from "react";
import "../../../assets/css/users.css";
import dp from "../../../assets/images/dp.jpg";
import dp1 from "../../../assets/images/dp1.png";
import dp2 from "../../../assets/images/dp2.jpg";
import dp3 from "../../../assets/images/dp3.jpg";
import { useDispatch, useSelector } from "react-redux";
import { clear, deleteUser, fetchUsers } from "../../../redux/degenwork";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import {
  errorMsgs,
  rateUser,
  successMsg,
  truncateString,
} from "../../../utils/utils";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
function Users() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  const { users, usersCount, success, error } = useSelector(
    (state) => state.degenwork
  );

  const [btns, setBtns] = useState([]);
  const [activeBtn, setActiveBtn] = useState(1);

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

  // Apply filter Helper function
  const filterJob = () => {
    return {
      from: activeBtn - 1,
      desiredStack,
      desiredRoles,
      jobType: officeLoc,
      activeBtn,
      desiredLocation,
    };
  };

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
  const decline = (e) => {
    e.preventDefault();
    setUserInfo(null);
  };

  //
  const deleteUsernow = (e) => {
    e.preventDefault();
    const id = userInfo._id;
    dispatch(deleteUser(id));
  };

  //
  const showFundProp = (idx) => {
    const user = users.filter((user) => user._id == idx);
    if (user.length > 0) {
      setUserInfo(user[0]);
    }
  };
  useEffect(() => {
    dispatch(fetchUsers({ from: activeBtn - 1 }));
  }, []);

  //
  //
  useEffect(() => {
    // console.log(error);
    if (success) {
      successMsg(success);
      setUserInfo(null);
    } else if (error) {
      errorMsgs(error);
    }
    dispatch(fetchUsers({ from: activeBtn - 1 }));
    dispatch(clear());
  }, [success, error]);

  return (
    <div className="users">
      <ToastContainer />
      <div className="rows">
        {users &&
          users.map((user) => (
            <div className="box" key={user._id}>
              <div className="dpcont">
                <img src={user?.dp ? user?.dp : dp3} alt="dp" className="dp" />
                <div className="dptxt">
                  <h3>{user?.username ? user?.username : user?.email}</h3>
                  <h4>
                    {user.roles.map((role, idx) =>
                      role === "" ? <></> : <li key={idx}>{role}</li>
                    )}
                    <span>⭐ {rateUser(user)}</span>
                  </h4>
                  <ul>
                    {user.skills.map((role, idx) =>
                      role === "" ? <></> : <li key={idx}>{role}</li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="view">
                <Link
                  to={`/degen/${user._id}`}
                  className="btn"
                  onClick={showFundProp}
                >
                  View User
                </Link>
                <div className="btn" onClick={() => showFundProp(user._id)}>
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
      {userInfo && (
        <form className="userModal">
          <div className="box">
            <h2>
              ARE YOU SURE YOU WANT TO Delete{" "}
              {userInfo?.username ? userInfo?.username : userInfo?.email}
            </h2>
            <div className="btns">
              <button onClick={decline}>Decline</button>
              <button onClick={deleteUsernow}>Delete Now</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default Users;
