import React from 'react';
import { useParams } from "react-router-dom";
import { useGetPapersQuery } from './papersApiSlice';
import PulseLoader from "react-spinners/PulseLoader";
import EditPaperForm from "./EditPaperForm";

const EditPaper = () => {
    const { id } = useParams();

    const { paper } = useGetPapersQuery("papersList", {
      selectFromResult: ({ data }) => ({
        paper: data?.entities[id],
      }),
    });
  
    if (!paper) return <PulseLoader color={"blue"} />;
  
    const content = <EditPaperForm paper={paper} />;
  
    return content;
}

export default EditPaper