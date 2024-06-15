import { React, useState } from "react";
import { useGetQuestionsQuery } from "./questionsApiSlice";
import { useGetExamsQuery } from "../exams/examsApiSlice";
import { useGetCoursesQuery } from "../courses/coursesApiSlice";
import { useGetPapersQuery } from "../papers/papersApiSlice";
import { PulseLoader } from "react-spinners";
import Question from "./Question";

const QuestionsList = () => {
  const {
    data: questions,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetQuestionsQuery("questionsList", {
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

  const {
    data: papers,
    isLoading: isLoadingPapers,
    isSuccess: isSuccessPapers,
    isError: isErrorPaper,
    error: errorPaper,
  } = useGetPapersQuery("papersList");

  const [selectedExam, setSelectedExam] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedPaper, setSelectedPaper] = useState("");

  const handleExamChange = (e) => setSelectedExam(e.target.value);
  const handleCourseChange = (e) => setSelectedCourse(e.target.value);
  const handlePaperChange = (e) => setSelectedPaper(e.target.value);

  let content;

  if (isLoading || isLoadingExams || isLoadingCourses || isLoadingPapers)
    content = <PulseLoader color={"blue"} />;

  if (isError || isErrorExam || isErrorCourse || isErrorPaper) {
    content = (
      <p className="errmsg">
        {error?.data?.message ||
          errorExam?.data?.message ||
          errorCourse?.data?.message ||
          errorPaper?.data?.message}
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

  let papersListOptions;
  if (isSuccessPapers) {
    const { ids } = papers;
    const papersObj =
      ids?.length && ids.map((papersId) => papers?.entities[papersId]);
    papersListOptions =
      papersObj?.length &&
      papersObj
        .filter((paperObj) => {
          // Filter based on selectedExam if it has a value
          if (selectedCourse) {
            return paperObj.courseId === selectedCourse;
          }
          return true; // Return all classes if sectionId is not provided
        })
        .map((paperObj) => (
          <option key={paperObj.id} value={paperObj.id}>
            {paperObj.year}
          </option>
        ));
  }

  if (isSuccess && !isLoadingPapers) {
    let tableContent;
    const { ids } = questions;
    
    const questionsObj =
      ids?.length && ids.map((questionId) => questions?.entities[questionId]);
    tableContent =
      questionsObj?.length &&
      questionsObj
        .filter((questionObj) => {
          // Filter based on paperId if it has a value
          if (selectedPaper) {
           
            return questionObj.paperId === selectedPaper;
          }
          
          return true; // Return all classes if sectionId is not provided
        })
        .map((questionObj) => (
          <Question key={questionObj.id} questionId={questionObj.id} />
        ));

    content = (
      <table className="table_questions ">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Number
            </th>
            <th scope="col" className="table__th user__username">
              Year
            </th>
            <th scope="col" className="table__th user__username">
              Question
            </th>
            <th scope="col" className="table__th user__username">
              Answer
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
              <div className="input-container">
                <label htmlFor="courseName" className="dropdown">
                  {" "}
                  Paper:{" "}
                </label>
                <select
                  id="courseName"
                  placeholder="Select the Paper Year"
                  required
                  value={selectedPaper}
                  onChange={handlePaperChange}
                >
                  <option>Select A Course</option>
                  {papersListOptions}
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

export default QuestionsList;
