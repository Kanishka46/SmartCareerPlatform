import { Routes, Route } from "react-router-dom";

import Landing from "./Careerguidance/Landing";
import Login from "./Careerguidance/Login";
import Register from "./Careerguidance/Register";

import StudentDashboard from "./Careerguidance/StudentDashboard";
import RecruiterDashboard from "./Careerguidance/RecruiterDashboard";

function App() {

  return (
    <Routes>

      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/student-dashboard" element={<StudentDashboard />} />

      <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />

    </Routes>
  );

}

export default App;