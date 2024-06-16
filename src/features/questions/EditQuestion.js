import React from 'react';
import { useGetQuestionsQuery } from './questionsApiSlice';
import { useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import EditQuestionForm from './EditQuestionForm';

const EditQuestion = () => {
  const { id } = useParams();

    const {question } = useGetQuestionsQuery("questionsList", {
      selectFromResult: ({ data }) => ({
        question: data?.entities[id],
      }),
    });
  
    if (!question) return <PulseLoader color={"blue"} />;
  
    const content = <EditQuestionForm question={question} />;
  
    return content;
}

export default EditQuestion