import { useState, useEffect } from "react";
import { useUpdateExamMutation, useDeleteExamMutation } from "./examsApiSlice";
import { useNavigate } from "react-router-dom";
import { IoMdTrash, IoIosSave } from "react-icons/io";
import { PulseLoader } from "react-spinners";
import { useSnackbar } from "notistack";

const EditExamForm = ({ exam }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [updateExam, { isLoading, isSuccess, isError, error }] =
    useUpdateExamMutation();

  const [
    deleteExam,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteExamMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(exam.title);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setTitle("");
      enqueueSnackbar("Seccessfull!", { variant: "success" });
      navigate("/dash/admin/exams");
    }
  }, [isSuccess, isDelSuccess, navigate, enqueueSnackbar]);

  useEffect(() => {
    if (isError || isDelError) {
      enqueueSnackbar("An Error Occured!", { variant: "error" });
    }
  }, [isDelError, isError, enqueueSnackbar]);

  const onTitleChanged = (e) => setTitle(e.target.value);

  const onSaveExamClicked = async (e) => {
    await updateExam({ id: exam.id, title });
  };

  const onDeleteExamClicked = async () => {
    await deleteExam({ id: exam.id });
  };

  const canSave = !isLoading;

  const errClass = isError || isDelError ? "errmsg" : "offscreen";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Exam</h2>
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
      </form>
    </>
  );

  return (
    <div className="content_container">
      {isLoading ? <PulseLoader color="blue" /> : content}
    </div>
  );
};

export default EditExamForm;
