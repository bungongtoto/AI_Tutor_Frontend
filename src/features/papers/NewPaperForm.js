import React from "react";
import { useState, useEffect } from "react";
import { useAddNewPaperMutation } from "./papersApiSlice";
import { useGetExamsQuery } from "../exams/examsApiSlice";
import { useGetCoursesQuery } from "../courses/coursesApiSlice";
import { useNavigate } from "react-router-dom";
import { IoIosSave } from "react-icons/io";
import { PulseLoader } from "react-spinners";

const NewPaperForm = () => {
  const [addNewPaper, { isLoading, isSuccess, isError, error }] =
    useAddNewPaperMutation();
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
  } = useGetCoursesQuery("classesList", {
    pollingInterval: 600000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const navigate = useNavigate();

  const [year, setYear] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");


  useEffect(() => {
    if (isSuccess) {
      setYear("");
      setSelectedExam("");
      setSelectedCourse("");
      navigate("/dash/admin/courses");
    }
  }, [isSuccess, navigate]);

  const onYearChanged = (e) => setYear(e.target.value);
  const handleExamChange = (e) => setSelectedExam(e.target.value);
  const handleCourseChange = (e) => setSelectedCourse(e.target.value);

  const canSave = !isLoading && !isLoadingExams && !isLoadingCourses;

  const onSaveCourseClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewPaper({ year, courseId: selectedCourse });
    }
  };

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
      coursesObj.filter((courseObj) => {
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

  const errClass = isError || isErrorExam || isErrorCourse ? "errmsg" : "offscreen";
  const errContent = (error?.data?.message || errorExam?.data?.message || errorCourse?.data?.message) ?? "";

  const content = (
    <div className="content_container create_form">
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={onSaveCourseClicked}>
        <div className="form__title-row">
          <h2>New Paper</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <IoIosSave />
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
    </div>
  );

  return <>{isLoading ? <PulseLoader color="blue" /> : content}</>;
};

export default NewPaperForm;
