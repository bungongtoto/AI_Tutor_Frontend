import React from "react";
import StatTile from "./StatTile";
import { FaChartLine, FaUsers, FaBook } from "react-icons/fa";
import { AiFillBook } from "react-icons/ai";
import { RiQuestionnaireLine } from "react-icons/ri";
import { useGetExamsQuery } from "../exams/examsApiSlice";
import { useGetQuestionsQuery } from "../questions/questionsApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { useGetEnrollmentsQuery } from "../enrollments/enrollmentsApiSlice";
import { PulseLoader } from "react-spinners";
import { useGetCoursesQuery } from "../courses/coursesApiSlice";
import useAuth from "../../hooks/useAuth";

const GeneralStats = () => {
  const {isAdmin} = useAuth();

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
  return (
    <div className="general_stats_container">
      {isAdmin && <StatTile title="Users" icon={<FaUsers />} number={numUsers} />}
      <StatTile title="Exams" icon={<FaBook />} number={numExams} />
      <StatTile title="Courses" icon={<AiFillBook />} number={numCourses} />
      <StatTile title="Questions" icon={<RiQuestionnaireLine />} number={numQuestions} />
      {isAdmin && <StatTile title="Enrollment" icon={<FaChartLine />} number={numEnrollments} />}
    </div>
  );
};

export default GeneralStats;
