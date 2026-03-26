import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, getDashboardPath, persistAuthSession } from "../auth";
import "./auth-pages.css";

const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
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

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
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
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: form.email.trim(),
        password: form.password,
      });

      persistAuthSession(response.data);
      setStatus({ type: "success", message: `Login successful. Redirecting as ${response.data.role}.` });
      navigate(getDashboardPath(response.data.role));
    } catch (error) {
      const message = error.response?.data?.message || "Invalid email or password.";
      setStatus({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-copy">
          <p className="eyebrow">Secure Sign In</p>
          <h1>Welcome back</h1>
          <p>Sign in with your registered email. We will identify the role from that account and send you to the correct dashboard.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
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

          {status.message ? (
            <p className={status.type === "error" ? "status-message status-error" : "status-message status-success"}>
              {status.message}
            </p>
          ) : null}

          <button className="primary-button auth-submit" type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Login"}
          </button>

          <p className="auth-footer-text">
            New here? <span onClick={() => navigate("/register")}>Create an account</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
