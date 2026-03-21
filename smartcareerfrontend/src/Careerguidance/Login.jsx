// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";   // 👈 ADD THIS AT TOP

// function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
//   const passwordPattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}$/;

//   const handleLogin = async () => {
//   if (!email || !password) {
//     alert("Please fill out all fields");
//     return;
//   }

//   if (!emailPattern.test(email)) {
//     alert("Email must be a valid Gmail address (example@gmail.com)");
//     return;
//   }

//   if (!passwordPattern.test(password)) {
//     alert(
//       "Password must be at least 8 characters and include uppercase, lowercase, and special character."
//     );
//     return;
//   }

//   try {
//     const response = await axios.post(
//       `http://localhost:8081/api/auth/login?email=${email}&password=${password}`
//     );

//     console.log(response.data);

//     alert("Login Successful 💖");

//     // navigate after success
//     navigate("/student-dashboard");

//   } catch (error) {
//     alert("Invalid Email or Password ❌");
//   }
// };
//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2>Smart Career Guidance Platform Using AI</h2>
//         <h3>Welcome Back!</h3>
//         <p>Please log in to your account.</p>

//         <input
//           style={styles.input}
//           type="email"
//           placeholder="Email Address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           style={styles.input}
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <div style={{ textAlign: "right", fontSize: "13px" }}>
//           <span style={{ color: "#00ffff", cursor: "pointer" }}>
//             Forgot Password?
//           </span>
//         </div>

//         <button style={styles.button} onClick={handleLogin}>
//           LOG IN
//         </button>

//         <p style={{ textAlign: "center", marginTop: "15px" }}>
//           Don't have an account?{" "}
//           <span
//             style={{ color: "#00ffff", cursor: "pointer" }}
//             onClick={() => navigate("/register")}
//           >
//             Register Now.
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "linear-gradient(135deg, #1e3a8a, #0f172a)"
//   },
//   card: {
//     width: "420px",
//     padding: "40px",
//     borderRadius: "20px",
//     background: "rgba(0,0,50,0.85)",
//     color: "white"
//   },
//   input: {
//     width: "100%",
//     padding: "12px",
//     margin: "10px 0",
//     borderRadius: "10px",
//     border: "none"
//   },
//   button: {
//     width: "100%",
//     padding: "12px",
//     marginTop: "20px",
//     borderRadius: "25px",
//     border: "none",
//     background: "linear-gradient(to right, #00ffff, #00ff99)",
//     cursor: "pointer"
//   }
// };

// export default Login;

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // ✅ NEW

  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}$/;

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill out all fields");
      return;
    }

    if (!emailPattern.test(email)) {
      alert("Enter valid email");
      return;
    }

    if (!passwordPattern.test(password)) {
      alert("Password must be strong");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8081/api/auth/login?email=${email}&password=${password}`
      );

      console.log(response.data);

      alert("Login Successful 💖");

      // ✅ SAVE ROLE
      localStorage.setItem("role", role);

      // ✅ ROLE-BASED NAVIGATION
      if (role === "student") {
        navigate("/student-dashboard");
      } else if (role === "recruiter") {
        navigate("/recruiter-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/jobseeker-dashboard");
      }

    } catch (error) {
      alert("Invalid Email or Password ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Smart Career Guidance Platform Using AI</h2>
        <h3>Welcome Back!</h3>
        <p>Please log in to your account.</p>

        {/* ✅ ROLE SELECT */}
        <select
          style={styles.input}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="recruiter">Recruiter</option>
          <option value="admin">Admin</option>
          <option value="jobseeker">Job Seeker</option>
        </select>

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