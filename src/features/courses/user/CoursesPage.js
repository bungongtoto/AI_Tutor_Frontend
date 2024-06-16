import React from "react";
import { useParams } from "react-router-dom";
import { useGetCoursesQuery } from "../coursesApiSlice";
import { PulseLoader } from "react-spinners";
import CourseTile from "./CourseTile";

const CoursesPage = () => {
  const { examId, examtitle } = useParams();

  const {
    data: courses,
    isLoading: isLoadingCourses,
    isSuccess: isSuccessCourses,
    isError: isErrorCourse,
    error: errorCourse,
  } = useGetCoursesQuery("coursesList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let coursesListContent;
  if (isLoadingCourses) coursesListContent = <PulseLoader color={"blue"} />;

  if (isErrorCourse) {
    coursesListContent = <p className="errmsg">{errorCourse?.data?.message}</p>;
  }
  if (isSuccessCourses) {
    const { ids } = courses;
    const coursesObj =
      ids?.length && ids.map((courseId) => courses?.entities[courseId]);
    coursesListContent =
      coursesObj?.length &&
      coursesObj
        .filter((courseObj) => {
          // Filter based on selectedExam if it has a value
          if (examId) {
            return courseObj.examId === examId;
          }
          return true; // Return all classes if sectionId is not provided
        })
        .map((courseObj) => (
          <CourseTile key={courseObj.id} courseId={courseObj.id} />
        ));
  }
  return (
    <div className="content_container">
      <h1 className="blue_color_h1">{examtitle} Courses</h1>
      <div className="exam-tiles-container">
        {coursesListContent}
      </div>
    </div>
  );
};

export default CoursesPage;
