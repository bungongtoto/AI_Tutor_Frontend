import { useState, useEffect } from "react";
import {
  useUpdatePaperMutation,
  useDeletePaperMutation,
} from "./papersApiSlice";

import { useGetExamsQuery } from "../exams/examsApiSlice";
import { useGetCoursesQuery } from "../courses/coursesApiSlice";
import { useNavigate } from "react-router-dom";
import { IoMdTrash, IoIosSave } from "react-icons/io";
import { PulseLoader } from "react-spinners";

const EditPaperForm = ({ paper }) => {
  const [updatePaper, { isLoading, isSuccess, isError, error }] =
    useUpdatePaperMutation();

  const [
    deletePaper,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeletePaperMutation();

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

  const navigate = useNavigate();

  const [year, setYear] = useState(paper.year);
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(paper.courseId);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setYear("");
      setSelectedExam("");
      setSelectedCourse("");
      navigate("/dash/admin/papers");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onYearChanged = (e) => setYear(e.target.value);
  const handleExamChange = (e) => setSelectedExam(e.target.value);
  const handleCourseChange = (e) => setSelectedCourse(e.target.value);

  const onSaveExamClicked = async (e) => {
    await updatePaper({
      id: paper.id,
      year,
      courseId: selectedCourse,
      questions: paper.questions,
    });
  };

  const onDeleteExamClicked = async () => {
    await deletePaper({ id: paper.id });
  };

  const canSave = !isLoading && !isLoadingExams && !isLoadingCourses;

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

  const errClass =
    isError || isDelError || isErrorExam || isErrorCourse
      ? "errmsg"
      : "offscreen";

  const errContent =
    (error?.data?.message ||
      delerror?.data?.message ||
      errorExam?.data?.message ||
      errorCourse?.data?.message) ??
    "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Paper</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveExamClicked}
              disabled={!canSave}
            >
              <IoIosSave />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteExamClicked}
            >
              <IoMdTrash />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="year">
          Year:
        </label>
        <input
          className={`form__input big_input`}
          placeholder="Enter Exam Title"
          id="year"
          name="year"
          type="text"
          autoComplete="off"
          value={year}
          onChange={onYearChanged}
          required
        />

        { isSuccessCourses && (
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
      </form>
    </>
  );

  return (
    <div className="content_container">
      {isLoading || isLoadingCourses || isLoadingExams ? <PulseLoader color="blue" /> : content}
    </div>
  );
};

export default EditPaperForm;
