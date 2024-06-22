import React from "react";
import { Bar } from "react-chartjs-2";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { useGetEnrollmentsQuery } from "../enrollments/enrollmentsApiSlice";
import { PulseLoader } from "react-spinners";

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

const UserEnrollmentStats = () => {
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

  const isLoading = isLoadingUsers || isLoadingEnrollments;
  const isError = isErrorUsers || isErrorEnrollments;
  const isSuccess = isSuccessUsers && isSuccessEnrollments;

  if (isLoading) return <PulseLoader color="blue" />;
  if (isError)
    return (
      <p className="errmsg">
        {errorUsers?.data?.message || errorEnrollments?.data?.message}
      </p>
    );

  let chartLabels = [];
  let chartNumData = [];

  if (isSuccess) {
    const { ids: userIds } = users;
    const usersObj =
      userIds?.length && userIds.map((userId) => users?.entities[userId]);
    const { ids: enrollmentIds } = enrollments;
    const enrollmentsObj =
      enrollmentIds?.length &&
      enrollmentIds.map((enrollmentId) => enrollments?.entities[enrollmentId]);

    usersObj.forEach((user) => {
      chartLabels = [...chartLabels, user.email];
      let enrollmentCount = 0;

      enrollmentsObj.forEach((enrollment) => {
        if (enrollment.userId === user.id) {
          enrollmentCount = enrollmentCount + 1;
        }
      });
      chartNumData = [...chartNumData, enrollmentCount];
    });
  }

  const data = {
    labels: [...chartLabels],
    datasets: [
      {
        label: "Enrollments",
        data: [...chartNumData],
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
        text: "Enrollment Per User",
      },
    },
  };

  return (
    <div className="barchart_user">
      <Bar data={data} options={options} />
    </div>
  );
};

export default UserEnrollmentStats;
