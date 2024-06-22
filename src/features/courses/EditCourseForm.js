import React from "react";
import { useState, useEffect } from "react";
import { useGetExamsQuery } from "../exams/examsApiSlice";
import {
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} from "./coursesApiSlice";
import { useNavigate } from "react-router-dom";
import { IoMdTrash, IoIosSave } from "react-icons/io";
import { PulseLoader } from "react-spinners";
import { useSnackbar } from "notistack";

const EditCourseForm = ({ course }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [updateCourse, { isLoading, isSuccess, isError, error }] =
    useUpdateCourseMutation();

  const [
    deleteCourse,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteCourseMutation();

  const {
    data: exams,
    isLoading: isLoadingExams,
    isSuccess: isSuccessExams,
    isError: isErrorExam,
    error: errorExam,
  } = useGetExamsQuery("examsList");

  const navigate = useNavigate();

  const [title, setTitle] = useState(course.title);
  const [selectedExam, setSelectedExam] = useState(course.examId);
  const [structure, setStructure] = useState(course.structure);
  const [years, setYears] = useState(course.years);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setSelectedExam("");
      setStructure("");
      setYears("");
      enqueueSnackbar("Seccessfull!", { variant: "success" });
      navigate("/dash/admin/courses");
    }
  }, [isSuccess, isDelSuccess, navigate, enqueueSnackbar]);

  useEffect(() => {
    if (isError || isDelError) {
      enqueueSnackbar("An Error Occured!", { variant: "error" });
    }
  }, [isDelError, isError, enqueueSnackbar]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const handleExamChange = (e) => setSelectedExam(e.target.value);
  const onStructureChanged = (e) => setStructure(e.target.value);
  const onYearsChanged = (e) => setYears(e.target.value);

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

  const onSaveExamClicked = async (e) => {
    await updateCourse({ id: course.id, title, examId: selectedExam, structure, years });
  };

  const onDeleteExamClicked = async () => {
    await deleteCourse({ id: course.id });
  };

  const canSave = !isLoading && !isLoadingExams;

  const errClass =
    isError || isDelError || isErrorExam ? "errmsg" : "offscreen";

  const errContent =
    (error?.data?.message ||
      delerror?.data?.message ||
      errorExam?.data?.message) ??
    "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Course</h2>
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
        <label className="form__label" htmlFor="title">
          Title:
        </label>
        <input
          className={`form__input big_input`}
          placeholder="Enter your Title"
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
                value="STRUCTURAL"
                checked={structure === "STRUCTURAL"}
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
    </>
  );

  return (
    <div className="content_container">
      {isLoading || isLoadingExams ? <PulseLoader color="blue" /> : content}
    </div>
  );
};

export default EditCourseForm;
