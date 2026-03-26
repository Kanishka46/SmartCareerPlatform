import { Navigate } from "react-router-dom";
import { getDashboardPath, getStoredRole } from "./auth";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const role = getStoredRole();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to={getDashboardPath(role)} replace />;
  }

  return children;
}

export default ProtectedRoute;
