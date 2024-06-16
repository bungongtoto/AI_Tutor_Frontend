import { useSnackbar } from "notistack";
import { useGetCoursesQuery } from "../coursesApiSlice";
import { useAddNewEnrollmentMutation } from "../../enrollments/enrollmentsApiSlice";
import { AiFillBook } from "react-icons/ai";
import { PulseLoader } from "react-spinners";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";

const CourseTile = ({ courseId }) => {
  const {userId} = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [addNewEnrollment, { isLoading, isSuccess, isError, error }] =
    useAddNewEnrollmentMutation();
  
  const { course } = useGetCoursesQuery("coursesList", {
    selectFromResult: ({ data }) => ({
      course: data?.entities[courseId],
    }),
  });

  const onAdd = async () => {
    enqueueSnackbar("Do you want to add this course to your list?", {
      variant: "info",
      action: (key) => (
        <>
          <button onClick={() => handleConfirm(key)}>Yes</button>
          <button onClick={() => closeSnackbar(key)}>No</button>
        </>
      ),
    });
  };

  const handleConfirm =  async (key) => {
    if(userId) {
      await addNewEnrollment({userId, courseId: course.id});
    }
    // Add course logic here
    closeSnackbar(key); // Close the snackbar after confirming
    
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("Course added to your list!", { variant: "success" });
    }
  }, [isSuccess, enqueueSnackbar])

  const errClass = isError ? "errmsg" : "offscreen";

  if (isLoading) {
    return <PulseLoader  color="blue" />
  }

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
      <p className={errClass}>{error?.data?.message}</p>
      <div className="button-container">
        <button onClick={onAdd} className="add-button">
          Add to My Courses
        </button>
      </div>
    </div>
  );
};

export default CourseTile;
