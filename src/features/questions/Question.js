import React from 'react';
import { useNavigate } from "react-router-dom";
import { useGetQuestionsQuery } from './questionsApiSlice';
import { memo } from "react";
import { IoMdCreate } from "react-icons/io";

const Question = ({ questionId}) => {
    const { question } = useGetQuestionsQuery("questionsList", {
        selectFromResult: ({ data }) => ({
            question: data?.entities[questionId],
        }),
      });
    
      const navigate = useNavigate();
    
      if (question) {
        const handleEdit = () => navigate(`/dash/admin/questions/${questionId}`);
    
        return (
          <tr className="table__row user">
            <td className={`table__cell `}>{question.number}</td>
            <td className={`table__cell `}>{question.paperyear}</td>
            <td className={`table__cell `}>{question.text}</td>
            <td className={`table__cell `}>{question.answer}</td>
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