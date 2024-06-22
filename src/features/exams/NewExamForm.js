import React from "react";
import { useState, useEffect } from "react";
import { useAddNewExamMutation } from "./examsApiSlice";
import { useNavigate } from "react-router-dom";
import { IoIosSave } from "react-icons/io";
import { PulseLoader } from "react-spinners";
import { useSnackbar } from "notistack";

const NewExamForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [addNewExam, { isLoading, isSuccess, isError, error }] =
    useAddNewExamMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      enqueueSnackbar("Added Exam Seccessfully!", { variant: "success" });
      navigate("/dash/admin/exams");
    }
  }, [isSuccess, navigate, enqueueSnackbar]);

  useEffect(()=> {
    if(isError){
      enqueueSnackbar("Could not add exams!", { variant: "error" });
    }
  },[isError, enqueueSnackbar])

  const onTitleChanged = (e) => setTitle(e.target.value);


  const canSave = !isLoading;

  const onSaveExamClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewExam({  title});
    }
  };

  

  const errClass = isError ? "errmsg" : "offscreen";

  const content = (
    <div className="content_container create_form">
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveExamClicked}>
        <div className="form__title-row">
          <h2>New Exam</h2>
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
      </form>
    </div>
  );

  return <>{isLoading ? <PulseLoader color="blue" /> : content}</>;
};

export default NewExamForm;
