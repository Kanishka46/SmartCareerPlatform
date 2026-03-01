import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Student");
  const [agree, setAgree] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}$/;

const handleRegister = async () => {
  if (!username || !email || !password) {
    alert("Please fill out all fields");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  if (!passwordPattern.test(password)) {
    alert(
      "Password must be at least 8 characters and include uppercase, lowercase, and special character."
    );
    return;
  }

  if (!agree) {
    alert("You must agree to Terms & Privacy Policy");
    return;
  }

  const roleMap = {
    Student: "STUDENT",
    Jobseeker: "JOB_SEEKER",
    Recruiter: "RECRUITER"
  };

  try {
    await axios.post("http://localhost:8081/api/auth/register", {
      name: username,
      email: email,
      password: password,
      role: roleMap[role]
    });

    alert("Registration Successful 💖");
    navigate("/login");

  } catch (error) {
    console.error(error.response?.data || error.message);
    alert("Registration Failed ❌");
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Smart Career Guidance Platform Using AI</h2>
        <h3>Create Your Account.</h3>
        <p>Start your personalized career path today.</p>

        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <p>Choose Your Role:</p>

        <div style={styles.roleContainer}>
          {["Student", "Jobseeker", "Recruiter"].map((r) => (
            <button
              key={r}
              style={{
                ...styles.roleBtn,
                background: role === r ? "#00ffff" : "transparent",
                color: role === r ? "black" : "white"
              }}
              onClick={() => setRole(r)}
            >
              {r}
            </button>
          ))}
        </div>

        <div style={styles.termsContainer}>
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          <p style={styles.termsText}>
            I agree to the Terms of Service & Privacy Policy.
          </p>
        </div>

        <button style={styles.mainBtn} onClick={handleRegister}>
          REGISTER
        </button>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#00ffff", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Log In.
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
  roleContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  },
  roleBtn: {
    flex: 1,
    padding: "8px",
    borderRadius: "10px",
    border: "1px solid #00ffff",
    cursor: "pointer"
  },
  termsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "15px",
    fontSize: "13px"
  },
  termsText: {
    lineHeight: "1.5"
  },
  mainBtn: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    borderRadius: "25px",
    border: "none",
    background: "linear-gradient(to right, #00ffff, #00ff99)",
    cursor: "pointer"
  }
};

export default Register;