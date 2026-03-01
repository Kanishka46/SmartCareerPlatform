import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}$/;

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill out all fields");
      return;
    }

    if (!gmailPattern.test(email)) {
      alert("Email must be a valid Gmail address (example@gmail.com)");
      return;
    }

    if (!passwordPattern.test(password)) {
      alert(
        "Password must be at least 8 characters and include uppercase, lowercase, and special character."
      );
      return;
    }

    navigate("/student-dashboard");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Smart Career Guidance Platform Using AI</h2>
        <h3>Welcome Back!</h3>
        <p>Please log in to your account.</p>

        <input
          style={styles.input}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div style={{ textAlign: "right", fontSize: "13px" }}>
          <span style={{ color: "#00ffff", cursor: "pointer" }}>
            Forgot Password?
          </span>
        </div>

        <button style={styles.button} onClick={handleLogin}>
          LOG IN
        </button>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "#00ffff", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register Now.
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e3a8a, #0f172a)"
  },
  card: {
    width: "420px",
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(0,0,50,0.85)",
    color: "white"
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "none"
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    borderRadius: "25px",
    border: "none",
    background: "linear-gradient(to right, #00ffff, #00ff99)",
    cursor: "pointer"
  }
};

export default Login;