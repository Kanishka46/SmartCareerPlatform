export const API_BASE_URL = "http://localhost:8081/api";

export function getDashboardPath(role) {
  const roleRouteMap = {
    STUDENT: "/student-dashboard",
    JOB_SEEKER: "/jobseeker-dashboard",
    RECRUITER: "/recruiter-dashboard",
    ADMIN: "/admin-dashboard",
  };

  return roleRouteMap[role] || "/";
}

export function persistAuthSession(user) {
  localStorage.setItem("smartCareerUser", JSON.stringify(user));
  localStorage.setItem("role", user.role);
}

export function clearAuthSession() {
  localStorage.removeItem("smartCareerUser");
  localStorage.removeItem("role");
  localStorage.removeItem("isLoggedIn");
}

export function getStoredUser() {
  const rawUser = localStorage.getItem("smartCareerUser");

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    clearAuthSession();
    return null;
  }
}

export function getStoredRole() {
  return getStoredUser()?.role || localStorage.getItem("role");
}
