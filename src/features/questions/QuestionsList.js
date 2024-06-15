import React from 'react';
import { useGetQuestionsQuery } from './questionsApiSlice';
import { PulseLoader } from "react-spinners";
import Question from "./Question";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const QuestionsList = () => {
    const {
        data: questions,
        isLoading,
        isSuccess,
        isError,
        error,
      } = useGetQuestionsQuery("questionsList", {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
      });
      
      const navigate = useNavigate();
    
      const onAddPaperClicked = () => {
        navigate("/dash/admin/questions/new");
      }
    
      let content;
    
      if (isLoading) content = <PulseLoader color={"blue"} />;
    
      if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>;
      }
    
      if (isSuccess) {
        const { ids } = questions;
    
        const tableContent =
          ids?.length && ids.map((questionId) => <Question key={questionId} questionId={questionId} />);
    
        content = (
          <table className="table_questions ">
            <thead className="table__thead">
              <tr>
                <th scope="col" className="table__th user__username">
                  Number
                </th>
                <th scope="col" className="table__th user__username">
                  Year
                </th>
                <th scope="col" className="table__th user__username">
                  Question
                </th>
                <th scope="col" className="table__th user__username">
                  Answer
                </th>
                <th scope="col" className="table__th user__edit">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>{tableContent}</tbody>
          </table>
        );
      }
      return (
        <>
          <div className="content_container">
            <div className="top_buttons_container">
              <button onClick={onAddPaperClicked}>
                <IoMdAddCircleOutline className="icon" />
              </button>
            </div>
            {content}
          </div>
        </>
      );
}

export default QuestionsList