import React from "react";
import { useState, useEffect } from "react";
import { useAddNewQuestionMutation } from "./questionsApiSlice";
import { useNavigate } from "react-router-dom";
import { IoIosSave } from "react-icons/io";
import { PulseLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { useGetQuestionsQuery } from "./questionsApiSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewQuestionForm = () => {
  const { paperId } = useParams();
  const [addNewQuestion, { isLoading, isSuccess, isError, error }] =
    useAddNewQuestionMutation();

  const {
    data: questions,
    isLoading: isLoadingQuestions,
    isSuccess: isSuccessQuestions,
    isError: isErrorQuestion,
    error: errorQuestion,
  } = useGetQuestionsQuery("questionsList");

  const navigate = useNavigate();

  const [number, setNumber] = useState(1);
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setNumber("");
      navigate("/dash/admin/questions");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isSuccessQuestions) {
      let questionsListOptions;
      const { ids } = questions;
      const questionsObj =
        ids?.length && ids.map((questionId) => questions?.entities[questionId]);
      questionsListOptions =
        questionsObj?.length &&
        questionsObj.filter((questionObj) => {
          // Filter based on paperId if it has a value
          if (paperId) {
            return questionObj.paperId === paperId;
          }
          return true; // Return all classes if sectionId is not provided
        });

        const numQuest = questionsListOptions.length;
        setNumber(numQuest + 1);

    }
  }, [isSuccessQuestions, questions, paperId]);

  const onNumberChanged = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setNumber(parseInt(value));
    }
  };

  const canSave = !isLoading && !isLoadingQuestions;

  const onSaveQuestionClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewQuestion({ number, paperId, text, answer });
    }
  };

  const errClass = isError || isErrorQuestion ? "errmsg" : "offscreen";
  const errContent =
    (error?.data?.message || errorQuestion?.data.message) ?? "";

  const content = (
    <div className="content_container create_form">
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={onSaveQuestionClicked}>
        <div className="form__title-row">
          <h2>New Question</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <IoIosSave />
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
          min={1}
          max={50}
          onChange={onNumberChanged}
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
    </div>
  );

  return <>{isLoading ? <PulseLoader color="blue" /> : content}</>;
};

export default NewQuestionForm;
