import {
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} from "./questionsApiSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdTrash, IoIosSave } from "react-icons/io";
import { PulseLoader } from "react-spinners";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSnackbar } from "notistack";

const EditQuestionForm = ({ question }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [updateQuestion, { isLoading, isSuccess, isError, error }] =
    useUpdateQuestionMutation();

  const [
    deleteQuestion,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteQuestionMutation();

  const [number, setNumber] = useState(question.number);
  const [text, setText] = useState(question.text);
  const [answer, setAnswer] = useState(question.answer);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setNumber("");
      setText("");
      setAnswer("");
      enqueueSnackbar("Seccessfull!", { variant: "success" });
      navigate("/dash/admin/questions");
    }
  }, [isSuccess, isDelSuccess, navigate, enqueueSnackbar]);

  useEffect(() => {
    if (isError || isDelError) {
      enqueueSnackbar("An Error Occured!", { variant: "error" });
    }
  }, [isDelError, isError, enqueueSnackbar]);

  const onSaveExamClicked = async (e) => {
    await updateQuestion({
      id: question.id, number, paperId: question.paperId, text, answer
    });
  };

  const onDeleteExamClicked = async () => {
    await deleteQuestion({ id: question.id });
  };

  const canSave = !isLoading;

  const errClass = isError || isDelError ? "errmsg" : "offscreen";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Question</h2>
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
        <label className="form__label" htmlFor="number">
          Question Number:
        </label>
        <input
          className={`form__input big_input`}
          id="number"
          name="number"
          type="number"
          autoComplete="off"
          disabled={true}
          value={number}
          required
        />
        <label className="form__label" htmlFor="text">
          Question:
        </label>
        <ReactQuill
          className={`form__input big_input`}
          placeholder="Enter Question Content Here"
          id="text"
          name="text"
          type="text"
          autoComplete="off"
          value={text}
          onChange={setText}
          required
        />
        <label className="form__label" htmlFor="answer">
          Answer:
        </label>
        <ReactQuill
          className={`form__input big_input`}
          placeholder="Enter Answer Content Here"
          id="answer"
          name="answer"
          type="text"
          autoComplete="off"
          value={answer}
          onChange={setAnswer}
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

export default EditQuestionForm;
