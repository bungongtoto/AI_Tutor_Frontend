import React from 'react';
import { useNavigate } from "react-router-dom";
import { useGetCoursesQuery } from './coursesApiSlice';
import { memo } from "react";
import { IoMdCreate } from "react-icons/io";

const Course = ({courseId}) => {
  const { course } = useGetCoursesQuery("coursesList", {
    selectFromResult: ({ data }) => ({
      course: data?.entities[courseId],
    }),
  });

  const navigate = useNavigate();

  if (course) {
    const handleEdit = () => navigate(`/dash/admin/courses/${courseId}`);

    return (
      <tr className="table__row user">
        <td className={`table__cell `}>{course.title}</td>
        <td className={`table__cell `}>{course.examtitle}</td>
        <td className={`table__cell `}>{course.structure}</td>
        <td className={`table__cell `}>{course.years}</td>
        <td className={`table__cell `}>
          <button className="icon-button table__button" onClick={handleEdit}>
            <IoMdCreate />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedCourse = memo(Course);

export default memoizedCourse;