import { React, useState } from "react";
import { useGetPapersQuery } from "./papersApiSlice";
import { useGetExamsQuery } from "../exams/examsApiSlice";
import { useGetCoursesQuery } from "../courses/coursesApiSlice";
import { PulseLoader } from "react-spinners";
import Paper from "./Paper";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import HeadingTile from "../../components/HeadingTile";

const PapersList = () => {
  const {
    data: papers,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPapersQuery("papersList", {
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

  const {
    data: courses,
    isLoading: isLoadingCourses,
    isSuccess: isSuccessCourses,
    isError: isErrorCourse,
    error: errorCourse,
  } = useGetCoursesQuery("coursesList");

  const [selectedExam, setSelectedExam] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const handleExamChange = (e) => setSelectedExam(e.target.value);
  const handleCourseChange = (e) => setSelectedCourse(e.target.value);

  const navigate = useNavigate();

  const onAddPaperClicked = () => {
    navigate("/dash/admin/papers/new");
  };

  let content;

  if (isLoading || isLoadingExams || isLoadingCourses)
    content = <PulseLoader color={"blue"} />;

  if (isError || isErrorExam || isErrorCourse) {
    content = (
      <p className="errmsg">
        {error?.data?.message ||
          errorExam?.data?.message ||
          errorCourse?.data?.message}
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

  let coursesListOptions;
  if (isSuccessCourses) {
    const { ids } = courses;
    const coursesObj =
      ids?.length && ids.map((courseId) => courses?.entities[courseId]);
    coursesListOptions =
      coursesObj?.length &&
      coursesObj
        .filter((courseObj) => {
          // Filter based on selectedExam if it has a value
          if (selectedExam) {
            return courseObj.examId === selectedExam;
          }
          return true; // Return all classes if sectionId is not provided
        })
        .map((courseObj) => (
          <option key={courseObj.id} value={courseObj.id}>
            {courseObj.title}
          </option>
        ));
  }

  if (isSuccess && isSuccessCourses) {
    let tableContent;
    const { ids } = papers;

    const papersObj =
      ids?.length && ids.map((paperId) => papers?.entities[paperId]);

    tableContent =
      papersObj?.length &&
      papersObj
        .filter((paperObj) => {
          // Filter based on courseId if it has a value
          if (selectedCourse) {
            return paperObj.courseId === selectedCourse;
          }

          return true; // Return all classes if sectionId is not provided
        })
        .map((paperObj) => <Paper key={paperObj.id} paperId={paperObj.id} />);
    content = (
      <table className="table_papers ">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Year
            </th>
            <th scope="col" className="table__th user__username">
              Course Title
            </th>
            <th scope="col" className="table__th user__edit">
              Actions
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
        <HeadingTile title={"Papers Management"} />
        <div className="top_buttons_container">
          <button onClick={onAddPaperClicked}>
            <IoMdAddCircleOutline className="icon" />
          </button>
        </div>
        <div className="top_buttons_container">
          {isSuccessCourses && (
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

              <div className="input-container">
                <label htmlFor="courseName" className="dropdown">
                  {" "}
                  Course:{" "}
                </label>
                <select
                  id="courseName"
                  placeholder="Select the courseName"
                  required
                  value={selectedCourse}
                  onChange={handleCourseChange}
                >
                  <option>Select A Course</option>
                  {coursesListOptions}
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

export default PapersList;
