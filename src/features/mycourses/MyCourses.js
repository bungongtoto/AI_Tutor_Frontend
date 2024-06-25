import React from "react";
import useAuth from "../../hooks/useAuth";
import { useGetEnrollmentsQuery } from "../enrollments/enrollmentsApiSlice";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../../assets/images/education_lion.png";
import { PulseLoader } from "react-spinners";
import MyCourseTile from "./MyCourseTile";
import HeadingTile from "../../components/HeadingTile";

const MyCourses = () => {
  const { userId, email } = useAuth();
  const {
    data: enrollments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEnrollmentsQuery("enrollmentsList");

  if (isLoading) return <PulseLoader color={"blue"} />;

  if (isSuccess) {
    let content;
    const { ids } = enrollments;
    const enrollmentsObj =
      ids?.length &&
      ids.map((enrollmentId) => enrollments?.entities[enrollmentId]);
    const contentobj =
      enrollmentsObj?.length &&
      enrollmentsObj.filter((enrollmentObj) => {
        // Filter based on selectedExam if it has a value
        if (userId) {
          return enrollmentObj.userId === userId;
        }
        return true; // Return all classes if sectionId is not provided
      });
    content =
      contentobj?.length &&
      contentobj.map((contentObj) => (
        <MyCourseTile key={contentObj.courseId} courseId={contentObj.courseId} enrollmentId={contentObj.id} />
      ));

    return (
      <>
        <div className="content_container">
          <HeadingTile title={"My Enrolled Courses"} />
          <div className="two_side_grid">
            <div className="content_container gap">
              <h1 className="blue_color_h1">Welcome...</h1>
              <h2>User: {email}.</h2>
              <h2>To Your Courses</h2>
            </div>
            <LazyLoadImage
              src={logo}
              className="floating-image home-image"
              width={"400px"}
              height={"490px"}
              alt=""
            />
          </div>
          <hr />
          <h2>Here are the List of Your Courses </h2>
          {isError && <p className="errmsg">{error?.data?.message}</p>}
          <div className="exam-tiles-container">
            {content?.length ? (
              content
            ) : (
              <>
                <h2>You are not current Enrolled to any course</h2>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
};

export default MyCourses;
