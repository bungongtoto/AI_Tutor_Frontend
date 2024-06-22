import { React, useState } from "react";
import { useGetCoursesQuery } from "./coursesApiSlice";
import { useGetExamsQuery } from "../exams/examsApiSlice";
import { PulseLoader } from "react-spinners";
import Course from "./Course";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import HeadingTile from "../../components/HeadingTile";

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

  const {
    data: exams,
    isLoading: isLoadingExams,
    isSuccess: isSuccessExams,
    isError: isErrorExam,
    error: errorExam,
  } = useGetExamsQuery("examsList");

  const [selectedExam, setSelectedExam] = useState("");

  const handleExamChange = (e) => setSelectedExam(e.target.value);

  const navigate = useNavigate();

  const onAddCourseClicked = () => {
    navigate("/dash/admin/courses/new");
  };

  let content;

  if (isLoading || isLoadingExams) content = <PulseLoader color={"blue"} />;

  if (isError || isErrorExam) {
    content = (
      <p className="errmsg">
        {error?.data?.message || errorExam?.data?.message}
      </p>
    );
  }

  let examsListOptions;
  if (isSuccessExams) {
    const { ids } = exams;
    const examsObject =
      ids?.length && ids.map((examId) => exams?.entities[examId]);
    examsListOptions =
      examsObject?.length &&
      examsObject.map((examObj) => (
        <option key={examObj.id} value={examObj.id}>
          {examObj.title}
        </option>
      ));
  }


  if (isSuccess && isSuccessExams) {
    let tableContent;
    const { ids } = courses;

    const coursesObj =
      ids?.length && ids.map((courseId) => courses?.entities[courseId]);

    tableContent =
    coursesObj?.length &&
    coursesObj.filter((courseObj) => {
        // Filter based on courseId if it has a value
        if (selectedExam) {
          return courseObj.examId === selectedExam;
        }

        return true; // Return all classes if sectionId is not provided
      }).map((courseObj) => <Course key={courseObj.id} courseId={courseObj.id} />);
    

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
        <HeadingTile title={"Courses Management"} />
        <div className="top_buttons_container" >
        <button onClick={onAddCourseClicked}>
            <IoMdAddCircleOutline className="icon" />
          </button>
        </div>
        <div className="top_buttons_container">
         
          {isSuccessExams && (
            <div className="class_container">
              <div className="input-container">
                <label htmlFor="exams" className="dropdown">
                  {" "}
                  Exams:{" "}
                </label>
                <select
                  id="exams"
                  placeholder="Select the Exam"
                  value={selectedExam}
                  onChange={handleExamChange}
                  required
                >
                  <option value="">Select the Exam</option>
                  {examsListOptions}
                </select>
              </div>
            </div>
          )}
        </div>
        {content}
      </div>
    </>
  );
};

export default CoursesList;
