import React from "react";
import { useState, useEffect } from "react";
import { useAddNewCourseMutation } from "./coursesApiSlice";
import { useGetExamsQuery } from "../exams/examsApiSlice";
import { useNavigate } from "react-router-dom";
import { IoIosSave } from "react-icons/io";
import { PulseLoader } from "react-spinners";

const NewCourseForm = () => {
  const [addNewCourse, { isLoading, isSuccess, isError, error }] =
    useAddNewCourseMutation();
  const {
    data: exams,
    isLoading: isLoadingExams,
    isSuccess: isSuccessExams,
    isError: isErrorExam,
    error: errorExam,
  } = useGetExamsQuery("examsList");

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [structure, setStructure] = useState("");
  const [years, setYears] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setSelectedExam("");
      setStructure("");
      setYears("");
      navigate("/dash/admin/courses");
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const handleExamChange = (e) => setSelectedExam(e.target.value);
  const onStructureChanged = (e) => setStructure(e.target.value);
  const onYearsChanged = (e) => setYears(e.target.value);

  const canSave = !isLoading && !isLoadingExams;

  const onSaveCourseClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewCourse({ title, examId: selectedExam, structure, years });
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

  const errClass = isError || isErrorExam ? "errmsg" : "offscreen";
  const errContent = (error?.data?.message || errorExam?.data?.message) ?? "";

  const content = (
    <div className="content_container create_form">
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={onSaveCourseClicked}>
        <div className="form__title-row">
          <h2>New Course</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <IoIosSave />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="email">
          Title:
        </label>
        <input
          className={`form__input big_input`}
          placeholder="Enter Exam Title"
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
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
                <option value="">Select the section</option>
                {examsListOptions}
              </select>
            </div>
          </div>
        )}

        <div className="input-container">
          <label>Structure:</label>
          <div className="radio-container">
            <div>
              <input
                type="radio"
                id="check-mcq"
                name="mcq"
                value="MCQ"
                checked={structure === "MCQ"}
                onChange={onStructureChanged}
                style={{ height: "16px", width: "30px" }}
              />
              <label htmlFor="check-mcq" style={{ fontWeight: "100" }}>
                {" "}
                MCQ{" "}
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="check-structural"
                name="structure"
                value="Structural"
                checked={structure === "Structural"}
                onChange={onStructureChanged}
                style={{ height: "16px", width: "30px" }}
              />
              <label htmlFor="check-structural" style={{ fontWeight: "100" }}>
                {" "}
                Structural{" "}
              </label>
            </div>
          </div>
        </div>

        <label className="form__label" htmlFor="email">
          Years:
        </label>
        <input
          className={`form__input big_input`}
          placeholder="Enter Exam Title"
          id="years"
          name="years"
          type="text"
          autoComplete="off"
          value={years}
          onChange={onYearsChanged}
          required
        />
      </form>
    </div>
  );

  return <>{isLoading ? <PulseLoader color="blue" /> : content}</>;
};

export default NewCourseForm;
