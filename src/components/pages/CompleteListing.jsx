import React, { useState, useEffect } from "react";
import "../../assets/css/completeListing.css";
import { FaCheck } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

function CompleteListing() {
  const [activeStep, setActiveStep] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("token");

  useEffect(() => {
    // console.log(orderId);
    async function captureOrder() {
      setActiveStep(2);
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BASE_URL}/api/jobs/capturepayment`,
          { orderId }
        );
        setActiveStep(3); // 2 seconds delay for third step
        setActiveStep(4);
        if (response.data.msg === "Payment made successfully") {
          setTimeout(() => {
            navigate("/");
          }, 5000);
        }
      } catch (error) {
        console.error("Payment capture failed", error);
        setPaymentStatus("Payment failed. Please try again.");
        setTimeout(() => {
          navigate("/user/list/");
        }, 5000);
      }
    }
    if (orderId) {
      captureOrder();
    }
  }, [orderId]);
  //

  return (
    <div className="completeListing">
      <span className="loader"></span>
      <ul>
        <h1>Processing:</h1>
        {!paymentStatus ? (
          <>
            <li className={activeStep >= 1 ? "active" : ""}>
              <FaCheck className="icon" />
              Confirmed the token and sending to our server
            </li>
            <li className={activeStep >= 2 ? "active" : ""}>
              <FaCheck className="icon" />
              Server currently Processing the information
            </li>
            <li className={activeStep >= 3 ? "active" : ""}>
              <FaCheck className="icon" />
              Server successfully processed
            </li>
            <li className={activeStep >= 4 ? "active" : ""}>
              <FaCheck className="icon" />
              Payment successfully processed, you will be redirected shortly
            </li>
          </>
        ) : (
          <li className={paymentStatus ? "active failed" : ""}>
            <FaTimes className="icon" />
            Payment failed
          </li>
        )}
      </ul>
    </div>
  );
}

export default CompleteListing;
