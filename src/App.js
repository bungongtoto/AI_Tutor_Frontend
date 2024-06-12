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
                  <Route path=":id" element={<EditExam />} />
                  <Route path="new" element={<NewExamForm />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
