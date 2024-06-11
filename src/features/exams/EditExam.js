import React from 'react'
import { useParams } from "react-router-dom";
import { useGetExamsQuery } from './examsApiSlice';
import PulseLoader from "react-spinners/PulseLoader";
import EditExamForm from "./EditExamForm";

const EditExam = () => {
    const { id } = useParams();

    const { exam } = useGetExamsQuery("examsList", {
      selectFromResult: ({ data }) => ({
        exam: data?.entities[id],
      }),
    });
  
    if (!exam) return <PulseLoader color={"blue"} />;
  
    const content = <EditExamForm exam={exam} />;
  
    return content;
}

export default EditExam