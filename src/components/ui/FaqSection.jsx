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
    question: "Why do you like web development?",
    answer:
      "I enjoy web development because it allows me to create interactive, functional, and visually appealing websites that can make a real impact on users.",
  },
  {
    question: "What is your favorite programming language?",
    answer:
      "JavaScript is my favorite language due to its versatility and the vast ecosystem that allows me to build everything from front-end interfaces to back-end services.",
  },
  {
    question: "How long have you been coding?",
    answer:
      "I've been coding for over 5 years, starting with basic HTML/CSS and progressing to full-stack development.",
  },
  {
    question: "What projects are you most proud of?",
    answer:
      "I'm particularly proud of a recent project where I developed a complete e-commerce platform using Next.js, integrating it with various APIs for payment processing and inventory management.",
  },
];
