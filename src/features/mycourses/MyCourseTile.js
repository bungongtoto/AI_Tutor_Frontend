import React from "react";
import { useGetCoursesQuery } from "../courses/coursesApiSlice";
import { AiFillBook } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const MyCourseTile = ({ courseId }) => {
  const navigate = useNavigate();
  const { course } = useGetCoursesQuery("coursesList", {
    selectFromResult: ({ data }) => ({
      course: data?.entities[courseId],
    }),
  });

  const onAdd = async () => {
    if (courseId) {
      navigate(`/dash/mycourses/papers/${courseId}/${course.title}`)
    }
  };

  return (
    <div className="course-card">
      <div className="icon-container">
        <AiFillBook />
      </div>
      <div className="info-container">
        <h2 className="title">{course.title}</h2>
        <p className="structure">{course.structure}</p>
        <p className="years">{course.years}</p>
      </div>
      <div className="button-container">
        <button onClick={onAdd} className="add-button">
          Get to Work
        </button>
      </div>
    </div>
  );
};

export default MyCourseTile;
