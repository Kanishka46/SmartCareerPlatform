import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../auth";
import "./auth-pages.css";

const roles = [
  { label: "Student", value: "STUDENT", description: "Upload resumes, view internships, and track skill analysis." },
  { label: "Job Seeker", value: "JOB_SEEKER", description: "Get job recommendations, career path suggestions, and application tracking." },
  { label: "Recruiter", value: "RECRUITER", description: "Post jobs or internships and manage incoming applications." },
];

const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (!passwordPattern.test(form.password)) {
      nextErrors.password = "Use 8+ characters with uppercase, lowercase, number, and special character.";
    }

    if (!form.role) {
      nextErrors.role = "Select a role.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await axios.post(`${API_BASE_URL}/auth/register`, {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });

      setStatus({ type: "success", message: "Registration successful. Please log in with the same email." });
      navigate("/login");
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed. Please try again.";
      setStatus({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-copy">
          <p className="eyebrow">Create Your Account</p>
          <h1>Start with your role</h1>
          <p>During registration you only need to choose the role. During login, the platform reads the email and redirects to the matching dashboard automatically.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            className="field-input"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name ? <p className="field-error">{errors.name}</p> : null}

          <label className="field-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="field-input"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email ? <p className="field-error">{errors.email}</p> : null}

          <label className="field-label" htmlFor="password">
            Password
          </label>
          <div className="password-field">
            <input
              id="password"
              className="field-input password-input"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a secure password"
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              👁
            </button>
          </div>
          {errors.password ? <p className="field-error">{errors.password}</p> : null}

          <div className="role-section">
            <label className="field-label">Select Role</label>
            <div className="role-grid">
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  className={form.role === role.value ? "role-card role-card-active" : "role-card"}
                  onClick={() => setForm((current) => ({ ...current, role: role.value }))}
                >
                  <strong>{role.label}</strong>
                  <span>{role.description}</span>
                </button>
              ))}
            </div>
            {errors.role ? <p className="field-error">{errors.role}</p> : null}
          </div>

          {status.message ? (
            <p className={status.type === "error" ? "status-message status-error" : "status-message status-success"}>
              {status.message}
            </p>
          ) : null}

          <button className="primary-button auth-submit" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>

          <p className="auth-footer-text">
            Already registered? <span onClick={() => navigate("/login")}>Login here</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
