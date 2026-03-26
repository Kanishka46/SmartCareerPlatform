import { useNavigate } from "react-router-dom";
import { getDashboardPath, getStoredRole } from "../auth";
import "./auth-pages.css";

function Landing() {
  const navigate = useNavigate();
  const savedRole = getStoredRole();

  const handlePrimaryAction = () => {
    if (savedRole) {
      navigate(getDashboardPath(savedRole));
      return;
    }

    navigate("/register");
  };

  return (
    <div className="auth-shell landing-shell">
      <header className="landing-header">
        <div>
          <p className="landing-badge">Smart Career Guidance Platform Using AI</p>
          <h1 className="landing-logo">SmartCareer AI</h1>
        </div>

        <div className="landing-actions">
          <button className="ghost-button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="primary-button" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </header>

      <section className="landing-hero">
        <div className="hero-copy">
          <p className="eyebrow">Career Twin + Skill Intelligence</p>
          <h2>Match the right role, uncover the skill gap, and plan the next move with AI.</h2>
          <p className="hero-text">
            A full-stack career guidance workspace for students, job seekers, recruiters, and admins.
            Upload resumes, compare skills with market demand, and route every user to the right dashboard.
          </p>

          <div className="hero-cta-row">
            <button className="primary-button large-button" onClick={handlePrimaryAction}>
              {savedRole ? "Go to Dashboard" : "Create Account"}
            </button>
            <button className="secondary-button large-button" onClick={() => navigate("/login")}>
              Sign In
            </button>
          </div>
        </div>

        <div className="hero-panel">
          <div className="metric-card">
            <span>AI Resume Parsing</span>
            <strong>Skill extraction and role fit scoring</strong>
          </div>
          <div className="metric-card">
            <span>Explainable Matching</span>
            <strong>See why a job was recommended</strong>
          </div>
          <div className="metric-card">
            <span>Role-Based Platform</span>
            <strong>Student, Job Seeker, Recruiter, Admin</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
