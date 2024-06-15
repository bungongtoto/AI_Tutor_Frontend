import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetQuestionsQuery } from "./questionsApiSlice";
import { memo } from "react";
import { IoMdCreate } from "react-icons/io";
import "react-quill/dist/quill.snow.css";

const Question = ({ questionId }) => {
  const { question } = useGetQuestionsQuery("questionsList", {
    selectFromResult: ({ data }) => ({
      question: data?.entities[questionId],
    }),
  });

  // Function to extract HTML from React Quill's content object
  const getHtmlContent = (editorHtml) => {
    // Check if editorHtml is an object (as returned by React Quill)
    if (typeof editorHtml === "object" && editorHtml.ops) {
      return editorHtml.ops.map((op) => op.insert).join("");
    }
    return editorHtml; // Fallback if not an object
  };

  const navigate = useNavigate();

  if (question) {
    const handleEdit = () => navigate(`/dash/admin/questions/${questionId}`);
    let questText = question.text;
    const questAnsw = question.answer;
    return (
      <tr className="table__row user">
        <td className={`table__cell `}>{question.number}</td>
        <td className={`table__cell `}>{question.paperyear}</td>
        <td className={`table__cell `}>
          <div dangerouslySetInnerHTML={{ __html: getHtmlContent(questText) }} />
        </td>
        <td className={`table__cell `}>
          <div dangerouslySetInnerHTML={{ __html: getHtmlContent(questAnsw) }} />
        </td>
        <td className={`table__cell `}>
          <button className="icon-button table__button" onClick={handleEdit}>
            <IoMdCreate />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedQuestion = memo(Question);

export default memoizedQuestion;
