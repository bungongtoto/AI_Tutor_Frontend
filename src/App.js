import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./features/welcome/Home";
import Login from "./features/auth/Login";
import SignUp from "./features/auth/SignUp";
import ResestPWD from "./features/auth/ResestPWD";
import DashLayout from "./components/DashLayout";
import Dashboard from "./features/dashboard/Dashboard";
import PersistLogin from "./features/auth/PersistLogin";
import Prefetch from "./features/auth/Prefetch";
import Admin from "./features/admin/Admin";
import ExamsList from "./features/exams/ExamsList";
import NewExamForm from "./features/exams/NewExamForm";
import Users from "./features/users/Users";
import NewUserForm from "./features/users/NewUserForm";
import EditUser from "./features/users/EditUser";
import EditExam from "./features/exams/EditExam";
import CoursesList from "./features/courses/CoursesList";
import NewCourseForm from "./features/courses/NewCourseForm";
import EditCourse from "./features/courses/EditCourse";
import PapersList from "./features/papers/PapersList";
import NewPaperForm from "./features/papers/NewPaperForm";
import EditPaper from "./features/papers/EditPaper";
import QuestionsList from "./features/questions/QuestionsList";
import NewQuestionForm from "./features/questions/NewQuestionForm";
import EditQuestion from "./features/questions/EditQuestion";
import ExamPage from "./features/exams/user/ExamPage";
import Achievement from "./features/achievements/Achievement";
import CoursesPage from "./features/courses/user/CoursesPage";

function App() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="auth">
            <Route index element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="resetpassword" element={<ResestPWD />} />
          </Route>
        </Route>
        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route path="/dash" element={<DashLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="admin">
                <Route index element={<Admin />} />
                <Route path="users">
                  <Route index element={<Users />} />
                  <Route path=":id" element={<EditUser />} />
                  <Route path="new" element={<NewUserForm />} />
                </Route>
                <Route path="exams">
                  <Route index element={<ExamsList />} />
                  <Route path=":id" element={<EditExam />} />
                  <Route path="new" element={<NewExamForm />} />
                </Route>
                <Route path="courses">
                  <Route index element={<CoursesList />} />
                  <Route path=":id" element={<EditCourse />} />
                  <Route path="new" element={<NewCourseForm />} />
                </Route>
                <Route path="papers">
                  <Route index element={<PapersList />} />
                  <Route path=":id" element={<EditPaper />} />
                  <Route path="new" element={<NewPaperForm />} />
                </Route>
                <Route path="questions">
                  <Route index element={<QuestionsList />} />
                  <Route path=":id" element={<EditQuestion />} />
                  <Route path="new/:paperId" element={<NewQuestionForm />} />
                </Route>
              </Route>
              <Route path="exam">
                <Route index element={<ExamPage />} />
                <Route path="courses/:examId/:examtitle"  element={<CoursesPage />} />
              </Route>
              <Route path="achievement">
                <Route index element={<Achievement />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
