import React from "react";
import { useParams } from "react-router-dom";
import { useGetQuestionsQuery } from "../questionsApiSlice";
import { PulseLoader } from "react-spinners";
import QuestionsPage from "./QuestionsPage";

const PaperQuestions = () => {
  const { paperId } = useParams();
  const {
    data: questions,
    isLoading: isLoadingQuestions,
    isSuccess: isSuccessQuestions,
    isError: isErrorQuestion,
    error: errorQuestion,
  } = useGetQuestionsQuery("papersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoadingQuestions) return <PulseLoader color={"blue"} />;

  let questionsListContent;
  if (isSuccessQuestions) {
    const { ids } = questions;
    const questionsObj =
      ids?.length && ids.map((questionId) => questions?.entities[questionId]);
    questionsListContent =
      questionsObj?.length &&
      questionsObj.filter((questionObj) => {
        // Filter based on paperId if it has a value
        if (paperId) {
          return questionObj.paperId === paperId;
        }
        return true; // Return all classes if sectionId is not provided
      });
  }

  return (
    <div className="">
      {isErrorQuestion && (
        <p className="errmsg">{errorQuestion?.data?.message}</p>
      )}
      {questionsListContent?.length ? (
        <QuestionsPage questions={questionsListContent} />
      ) : (
        <>
          <h2 className="color_red">No Questions For this Paper Yet</h2>
        </>
      )}
    </div>
  );
};

export default PaperQuestions;
