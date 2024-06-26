import React from "react";
import { useGetExamsQuery } from "../examsApiSlice";
import useAuth from "../../../hooks/useAuth";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../../../assets/images/achievementPage_lion.png";
import { PulseLoader } from "react-spinners";
import ExamTile from "./ExamTile";
import HeadingTile from "../../../components/HeadingTile";

const ExamPage = () => {
  const { email } = useAuth();
  const {
    data: exams,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetExamsQuery("examsList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <PulseLoader color={"blue"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = exams;

    content =
      ids?.length &&
      ids.map((examId) => <ExamTile key={examId} examId={examId} />);
  }
  return (
    <>
      <div className="content_container">
        <HeadingTile title={"AI Tutor's Exams Page"} />
        <div className="two_side_grid">
          <div className="content_container gap">
            <h1 className="blue_color_h1">Hello ...</h1>
            <h2>User: {email}.</h2>
            <h2>AI Tutor Exams</h2>
          </div>
          <LazyLoadImage
            src={logo}
            className="floating-image home-image"
            width={"359px"}
            height={"550px"}
            alt=""
          />
        </div>
        <hr />
        <h2>Here are the List of Exams Available in AI Tutor</h2>
        <div className="exam-tiles-container">{content}</div>
      </div>
    </>
  );
};

export default ExamPage;
