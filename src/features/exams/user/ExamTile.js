import React from "react";
import { FaBook } from "react-icons/fa";
import { useGetExamsQuery } from "../examsApiSlice";
import { useNavigate } from "react-router-dom";

const ExamTile = ({ examId }) => {
  const navigate = useNavigate();
  const { exam } = useGetExamsQuery("examsList", {
    selectFromResult: ({ data }) => ({
      exam: data?.entities[examId],
    }),
  });
  const handleViewCourses = () => {
    if (exam) {
        navigate(`/dash/exam/courses/${examId}/${exam.title}`)
    }
  };
  return (
    <div className="exam-tile">
      <div className="exam-tile-content">
        <FaBook className="exam-icon" />
        <h3 className="exam-title">{exam.title}</h3>
      </div>
      <button className="view-courses-button" onClick={handleViewCourses}>
        View Courses
      </button>
    </div>
  );
};

export default ExamTile;
