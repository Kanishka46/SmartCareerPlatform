import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "./Careerguidance/AdminDashboard";
import JobseekerDashboard from "./Careerguidance/JobseekerDashboard";
import Landing from "./Careerguidance/Landing";
import Login from "./Careerguidance/Login";
import RecruiterDashboard from "./Careerguidance/RecruiterDashboard";
import Register from "./Careerguidance/Register";
import StudentDashboard from "./Careerguidance/StudentDashboard";
import { getDashboardPath, getStoredRole } from "./auth";

function DefaultRedirect() {
  const role = getStoredRole();
  return <Navigate to={role ? getDashboardPath(role) : "/"} replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/jobseeker-dashboard"
        element={
          <ProtectedRoute allowedRoles={["JOB_SEEKER"]}>
            <JobseekerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter-dashboard"
        element={
          <ProtectedRoute allowedRoles={["RECRUITER"]}>
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<DefaultRedirect />} />
    </Routes>
  );
}

export default App;
