import React, { useState, useRef, useEffect } from "react";
import "../../assets/css/faq.css";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="faq-heading">Frequently Asked Questions</h2>
      <div className="faq-container">
        {questions.map((question, index) => (
          <AccordionItem
            key={index}
            question={question.question}
            answer={question.answer}
            isActive={activeIndex === index}
            onClick={() => toggleAccordion(index)}
          />
        ))}
      </div>
    </section>
  );
}

const AccordionItem = ({ question, answer, isActive, onClick }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current.style.maxHeight = isActive
      ? `${contentRef.current.scrollHeight}px`
      : "0px";
  }, [isActive]);

  return (
    <div className="faq-item">
      <button
        className={`faq-question ${isActive ? "active" : ""}`}
        onClick={onClick}
      >
        <div className="question-align">
          <h4
            className="question-text"
            style={{ color: isActive ? "white" : "" }}
          >
            {question}
          </h4>
          {isActive ? (
            <FiMinus className="icon minus-icon" />
          ) : (
            <FiPlus className="icon plus-icon" />
          )}
        </div>
      </button>
      <div ref={contentRef} className={`faq-answer ${isActive ? "open" : ""}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

const questions = [
  {
    question: "What is web3jobPortal ?",
    answer:
      "web3jobPortal is a specialized job portal focused on connecting talent with opportunities in the Web3 space, including blockchain, DeFi, NFTs, and other decentralized technologies.",
  },
  {
    question: "How do I create a profile?",
    answer:
      "To create a profile, click on the Sign Up button at the top right corner of the homepage. You can sign up using your email, Google account. Once registered, you can complete your profile by adding your skills, experience, and preferences",
  },
  {
    question: "Is it free to create a profile and apply for jobs?",
    answer:
      "Yes, creating a profile and applying for jobs is completely free.",
  },
  {
    question: "How do I post a job listing?",
    answer: "To post a job, click on the Post a Job button on the homepage. You’ll be guided through a form to fill out the job details, select the features you want (e.g., featured listing, premium placement), and proceed to payment.",
  },
];
