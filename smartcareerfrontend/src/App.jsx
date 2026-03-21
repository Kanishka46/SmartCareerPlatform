// import { Routes, Route } from "react-router-dom";

// import Landing from "./Careerguidance/Landing";
// import Login from "./Careerguidance/Login";
// import Register from "./Careerguidance/Register";

// import StudentDashboard from "./Careerguidance/StudentDashboard";
// import RecruiterDashboard from "./Careerguidance/RecruiterDashboard";

// function App() {

//   return (
//     <Routes>

//       <Route path="/" element={<Landing />} />

//       <Route path="/login" element={<Login />} />

//       <Route path="/register" element={<Register />} />

//       <Route path="/student-dashboard" element={<StudentDashboard />} />

//       <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />

//     </Routes>
//   );

// }

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./Careerguidance/Landing";
import Login from "./Careerguidance/Login";
import Register from "./Careerguidance/Register";

import StudentDashboard from "./Careerguidance/StudentDashboard";
import RecruiterDashboard from "./Careerguidance/RecruiterDashboard";

import AdminDashboard from "./Careerguidance/AdminDashboard";
import JobSeekerDashboard from "./Careerguidance/JobseekerDashboard"; // ✅ keep file name same

// 🔐 Get role safely
const getRole = () => localStorage.getItem("role");

function App() {

  const role = getRole();

  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* STUDENT */}
      <Route
        path="/student-dashboard"
        element={
          role === "student"
            ? <StudentDashboard />
            : <Navigate to="/login" replace />
        }
      />

      {/* RECRUITER */}
      <Route
        path="/recruiter-dashboard"
        element={
          role === "recruiter"
            ? <RecruiterDashboard />
            : <Navigate to="/login" replace />
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin-dashboard"
        element={
          role === "admin"
            ? <AdminDashboard />
            : <Navigate to="/login" replace />
        }
      />

      {/* JOB SEEKER */}
      <Route
        path="/jobseeker-dashboard"
        element={
          role === "jobseeker"
            ? <JobSeekerDashboard />
            : <Navigate to="/login" replace />
        }
      />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;