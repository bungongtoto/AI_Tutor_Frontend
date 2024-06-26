import React from "react";
import { Bar } from "react-chartjs-2";
import { useGetExamsQuery } from "../exams/examsApiSlice";
import { useGetQuestionsQuery } from "../questions/questionsApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { useGetEnrollmentsQuery } from "../enrollments/enrollmentsApiSlice";
import { PulseLoader } from "react-spinners";
import { useGetCoursesQuery } from "../courses/coursesApiSlice";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const {
    data: users,
    isLoading: isLoadingUsers,
    isSuccess: isSuccessUsers,
    isError: isErrorUsers,
    error: errorUsers,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: exams,
    isLoading: isLoadingExams,
    isSuccess: isSuccessExams,
    isError: isErrorExams,
    error: errorExams,
  } = useGetExamsQuery("examsList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const {
    data: courses,
    isLoading: isLoadingCourses,
    isSuccess: isSuccessCourses,
    isError: isErrorCourses,
    error: errorCourses,
  } = useGetCoursesQuery("coursesList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: questions,
    isLoading: isLoadingQuestions,
    isSuccess: isSuccessQuestions,
    isError: isErrorQuestions,
    error: errorQuestions,
  } = useGetQuestionsQuery("questionsList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: enrollments,
    isLoading: isLoadingEnrollments,
    isSuccess: isSuccessEnrollments,
    isError: isErrorEnrollments,
    error: errorEnrollments,
  } = useGetEnrollmentsQuery("enrollmentsList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const isLoading =
    isLoadingExams ||
    isLoadingCourses ||
    isLoadingQuestions ||
    isLoadingUsers ||
    isLoadingEnrollments;
  const isError =
    isErrorExams ||
    isErrorCourses ||
    isErrorQuestions ||
    isErrorUsers ||
    isErrorEnrollments;
  const isSuccess =
    isSuccessExams &&
    isSuccessCourses &&
    isSuccessQuestions &&
    isSuccessUsers &&
    isSuccessEnrollments;

  if (isLoading) return <PulseLoader color="blue" />;
  if (isError)
    return (
      <p className="errmsg">
        {errorExams?.data?.message ||
          errorCourses?.data?.message ||
          errorQuestions?.data?.message ||
          errorUsers?.data?.message ||
          errorEnrollments?.data?.message}
      </p>
    );

  let numExams;
  let numCourses;
  let numQuestions;
  let numUsers;
  let numEnrollments;

  if (isSuccess) {
    const { ids: examIds } = exams;
    numExams = examIds?.length;
    const { ids: courseIds } = courses;
    numCourses = courseIds?.length;
    const { ids: questionIds } = questions;
    numQuestions = questionIds?.length;
    const { ids: userIds } = users;
    numUsers = userIds?.length;
    const { ids: enrollmentIds } = enrollments;
    numEnrollments = enrollmentIds?.length;
  }

  const data = {
    labels: ["Exams", "Courses", "Question", "Users", "Enrollments"],
    datasets: [
      {
        label: "Quantity",
        data: [numExams, numCourses, numQuestions, numUsers, numEnrollments],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distribution of General Data",
      },
    },
  };

  return (
    <div className="barchart">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
