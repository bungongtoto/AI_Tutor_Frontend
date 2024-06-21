import React from "react";
import { useGetCoursesQuery } from "../courses/coursesApiSlice";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useGetExamsQuery } from "../exams/examsApiSlice";
import { useGetQuestionsQuery } from "../questions/questionsApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { useGetEnrollmentsQuery } from "../enrollments/enrollmentsApiSlice";
import { PulseLoader } from "react-spinners";

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
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
    labels: ["Exams", "Courses", "Questions", "Users", "Enrollments"],
    datasets: [
      {
        label: "Colors",
        data: [numExams, numCourses, numQuestions, numUsers, numEnrollments],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right", // Position legend on the right
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            return ` ${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
      title: {
        display: true,
        text: "Distribution of General Data",
        font: {
          size: 20,
        },
      },
    },
  };

  return (
    <div className="piechart">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
