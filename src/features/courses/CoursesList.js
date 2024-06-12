import React from 'react';
import { useGetCoursesQuery } from './coursesApiSlice';
import { PulseLoader } from "react-spinners";
import Course from "./Course";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CoursesList = () => {
  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCoursesQuery("coursesList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  
  const navigate = useNavigate();

  const onAddCourseClicked = () => {
    navigate("/dash/admin/courses/new");
  }

  let content;

  if (isLoading) content = <PulseLoader color={"blue"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = courses;

    const tableContent =
      ids?.length && ids.map((courseId) => <Course key={courseId} courseId={courseId} />);

    content = (
      <table className="table_courses ">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Title
            </th>
            <th scope="col" className="table__th user__username">
              Exam Title
            </th>
            <th scope="col" className="table__th user__username">
              Structure
            </th>
            <th scope="col" className="table__th user__username">
              Years
            </th>
            <th scope="col" className="table__th user__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }
  return (
    <>
      <div className="content_container">
        <div className="top_buttons_container">
          <button onClick={onAddCourseClicked}>
            <IoMdAddCircleOutline className="icon" />
          </button>
        </div>
        {content}
      </div>
    </>
  );
}

export default CoursesList