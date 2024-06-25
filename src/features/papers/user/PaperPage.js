import React from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../../../assets/images/education_lion.png";
import { useParams } from "react-router-dom";
import { useGetPapersQuery } from "../papersApiSlice";
import { PulseLoader } from "react-spinners";
import PaperTile from "./PaperTile";
import HeadingTile from "../../../components/HeadingTile";

const PaperPage = () => {
  const { courseId, coursetitle } = useParams();
  const {
    data: papers,
    isLoading: isLoadingPapers,
    isSuccess: isSuccessPapers,
    isError: isErrorPaper,
    error: errorPaper,
  } = useGetPapersQuery("papersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoadingPapers) return <PulseLoader color={"blue"} />;

  let papersListContent;
  if (isSuccessPapers) {
    const { ids } = papers;
    const papersObj =
      ids?.length && ids.map((paperId) => papers?.entities[paperId]);
    papersListContent =
      papersObj?.length &&
      papersObj
        .filter((paperObj) => {
          // Filter based on selectedExam if it has a value
          if (courseId) {
            return paperObj.courseId === courseId;
          }
          return true; // Return all classes if sectionId is not provided
        })
        .map((paperObj) => (
          <PaperTile key={paperObj.id} paperId={paperObj.id} />
        ));
  }
  return (
    <>
      <div className="content_container">
        <div className="two_side_grid">
          <div className="content_container">
            <HeadingTile title={`${coursetitle} Papers`} />
            {isErrorPaper && (
              <p className="errmsg">{errorPaper?.data?.message}</p>
            )}
            {papersListContent?.length ? (
              <>
                <div className="two_side_grid">{papersListContent}</div>
              </>
            ) : (
              <>
                <h2 className="color_red">No Papers For this Course Yet</h2>
              </>
            )}
          </div>
          <LazyLoadImage
            src={logo}
            className="floating-image home-image"
            width={"400px"}
            height={"490px"}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default PaperPage;
