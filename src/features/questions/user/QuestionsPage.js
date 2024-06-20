import React from "react";
import { useState } from "react";
import AIContainer from "../../ai/AIContainer";
import MathJax from "react-mathjax-preview";

const QuestionsPage = ({ questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Function to extract HTML from React Quill's content object
  const getHtmlContent = (editorHtml) => {
    // Check if editorHtml is an object (as returned by React Quill)
    if (typeof editorHtml === "object" && editorHtml.ops) {
      return editorHtml.ops.map((op) => op.insert).join("");
    }
    return editorHtml; // Fallback if not an object
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="container">
      <div className="question-navigation">
        <button
          className="nav-button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          className="nav-button"
          onClick={handleNext}
          disabled={currentIndex === questions.length - 1}
        >
          Next
        </button>
      </div>
      <div className="content">
        <div className="question">
          <h2>Question {questions[currentIndex].number}</h2>
          <div className="display_box">
            <MathJax
              className="text"
              math={getHtmlContent(questions[currentIndex].text)}
            />
          </div>
          {/* <div
            dangerouslySetInnerHTML={{
              __html: getHtmlContent(questions[currentIndex].text),
            }}
          /> */}
        </div>
        <div className="answer">
          <h2>Answer</h2>
          <div className="display_box">
            <MathJax
              className="text"
              math={getHtmlContent(questions[currentIndex].answer)}
            />
          </div>
          {/* <div
            dangerouslySetInnerHTML={{
              __html: getHtmlContent(questions[currentIndex].answer),
            }}
          /> */}
        </div>
      </div>
      <button className="ai-chat-button" onClick={toggleSidebar}>
        AI Tutor
      </button>
      <div className={`ai-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <AIContainer closeSidebar={closeSidebar} question={questions[currentIndex].text} />
      </div>
    </div>
  );
};

export default QuestionsPage;
