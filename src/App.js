import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./features/welcome/Home";
import Login from "./features/auth/Login";
import SignUp from "./features/auth/SignUp";
import ResestPWD from "./features/auth/ResestPWD";

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
    </Routes>
  );
}

export default App;
