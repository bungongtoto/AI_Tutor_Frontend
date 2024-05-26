import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./features/welcome/Home";
import Login from "./features/auth/Login";
import SignUp from "./features/auth/SignUp";
import ResestPWD from "./features/auth/ResestPWD";
import DashLayout from "./components/DashLayout";
import Dashboard from "./features/dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="auth">
          <Route index element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="resetpassword" element={<ResestPWD />} />
        </Route>
      </Route>

      <Route path="/dash" element={<DashLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
