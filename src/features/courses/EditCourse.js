import React from 'react';
import { useParams } from "react-router-dom";
import { useGetCoursesQuery } from './coursesApiSlice';
import PulseLoader from "react-spinners/PulseLoader";
import EditCourseForm from "./EditCourseForm";


const EditCourse = () => {
    const { id } = useParams();

    const { course } = useGetCoursesQuery("coursesList", {
      selectFromResult: ({ data }) => ({
        course: data?.entities[id],
      }),
    });
  
    if (!course) return <PulseLoader color={"blue"} />;
  
    const content = <EditCourseForm course={course} />;
  
    return content;
}

export default EditCourse