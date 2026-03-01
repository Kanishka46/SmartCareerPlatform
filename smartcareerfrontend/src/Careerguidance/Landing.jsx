import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <div style={styles.logo}>CareerAI</div>
        <div>
          <button style={styles.outlineBtn} onClick={() => navigate("/login")}>
            Login
          </button>
          <button style={styles.primaryBtn} onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </div>

      <div style={styles.hero}>
        <h1>
          Smart Career Guidance Platform <br />
          <span style={{ color: "#38bdf8" }}>Using AI</span>
        </h1>
        <p>
          AI-powered job matching, skill gap analysis,
          and career prediction tailored for you.
        </p>
        <button
          style={{ ...styles.primaryBtn, marginTop: "20px" }}
          onClick={() => navigate("/register")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100%",
    background: "linear-gradient(to right, #0f172a, #1e3a8a)",
    color: "white",
    display: "flex",
    flexDirection: "column"
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 60px"
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#38bdf8"
  },
  hero: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  outlineBtn: {
    background: "transparent",
    border: "1px solid #38bdf8",
    color: "#38bdf8",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px"
  },
  primaryBtn: {
    background: "linear-gradient(135deg, #2563eb, #38bdf8)",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Landing;