import React, { useEffect } from "react";
import { useGetCoursesQuery } from "../courses/coursesApiSlice";
import { useDeleteEnrollmentMutation } from "../enrollments/enrollmentsApiSlice";
import { AiFillBook } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const MyCourseTile = ({ courseId, enrollmentId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { course } = useGetCoursesQuery("coursesList", {
    selectFromResult: ({ data }) => ({
      course: data?.entities[courseId],
    }),
  });

  const [
    deleteEnrollment,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteEnrollmentMutation();

  const onAdd = () => {
    if (courseId) {
      navigate(`/dash/mycourses/papers/${courseId}/${course.title}`);
    }
  };

  useEffect(() => {
    if (isDelSuccess) {
      enqueueSnackbar("Course removed from your list!", { variant: "success" });
    }
  }, [isDelSuccess, enqueueSnackbar]);
  
  useEffect(() => {
    if (isDelError) {
      enqueueSnackbar("An Error Occured!", { variant: "error" });
    }
  }, [isDelError, enqueueSnackbar]);

  const errClass = isDelError ? "errmsg" : "offscreen";

  const onRemove = async () => {
    await deleteEnrollment({ id: enrollmentId });
  };

  return (
    <div className="course-card">
      <div className="icon-container">
        <AiFillBook />
      </div>
      <div className="info-container">
        <h2 className="title">{course.title}</h2>
        <p className="structure">{course.structure}</p>
        <p className="years">{course.years}</p>
      </div>
      <p className={errClass}>{delerror?.data?.message}</p>
      <div className="button-container">
        <button onClick={onAdd} className="add-button">
          Get to Work
        </button>
      </div>
      <div className="button-container">
        <button onClick={onRemove} className="add-button delete-button">
          Remove
        </button>
      </div>
    </div>
  );
};

export default MyCourseTile;
