import React from 'react'
import useAuth from "../../hooks/useAuth";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../../assets/images/achievementPage_lion.png";
import AchievementTile from './AchievementTile';
import { useGetEnrollmentsQuery } from '../enrollments/enrollmentsApiSlice';
import { PulseLoader } from 'react-spinners';

const Achievement = () => {
  const { userId, email } = useAuth();
  const {
    data: enrollments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEnrollmentsQuery("enrollmentsList");
 
  let content;
  if (isSuccess) {
    const { ids } = enrollments;
    const enrollmentsObj =
      ids?.length &&
      ids.map((enrollmentId) => enrollments?.entities[enrollmentId]);
    content  =
      enrollmentsObj?.length &&
      enrollmentsObj.filter((enrollmentObj) => {
        // Filter based on selectedExam if it has a value
        if (userId) {
          return enrollmentObj.userId === userId;
        }
        return true; // Return all classes if sectionId is not provided
      });
  }
    
    return (
        <>
          <div className="content_container">
            <div className="two_side_grid">
              <div className="content_container">
                <h1 className="blue_color_h1">
                  Hello Welcome...
                </h1>
                <p>User: {email}.</p>
                <h2>To Your Achievements</h2>
              </div>
              <LazyLoadImage
                src={logo}
                className="floating-image"
                width={"400px"}
                height={"490px"}
                alt=""
              />
            </div>
            <hr />
            {isError && <p className="errmsg">{error?.data?.message}</p>}
            {isLoading && <PulseLoader color='blue' />}
            {content?.length ? <AchievementTile number={content.length} />: <><h1>No Achievements Yet</h1></>}
          </div>
        </>
      );
}

export default Achievement