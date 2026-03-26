import { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { clearAuthSession } from "../auth";

ChartJS.register(ArcElement, Tooltip, Legend);

function StudentDashboard() {

  const [activePage, setActivePage] = useState("dashboard");
  const [internships, setInternships] = useState([]);

  const [skills, setSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [matchScore, setMatchScore] = useState(0);

  const [fileName, setFileName] = useState("");

  // 🔥 LOGOUT FUNCTION
  const logout = () => {
    clearAuthSession();
    window.location.href = "/login";
  };

  // ✅ SAFE API
  useEffect(() => {
    axios.get("http://localhost:8081/api/internships")
      .then(res => setInternships(res.data))
      .catch(() => setInternships([]));
  }, []);

  // ✅ FAKE AI
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const extracted = ["Java", "React"];
    const jobSkills = ["Java", "Spring", "SQL"];

    const missing = jobSkills.filter(s => !extracted.includes(s));
    const match = Math.floor((extracted.length / jobSkills.length) * 100);

    setSkills(extracted);
    setMissingSkills(missing);
    setMatchScore(match);
  };

  const chartData = {
    labels: ["Matched", "Missing"],
    datasets: [
      {
        data: matchScore === 0 ? [0, 100] : [matchScore, 100 - matchScore]
      }
    ]
  };

  return (
    <div style={styles.container}>

      {/* Sidebar */}
      <div style={styles.sidebar}>

        {/* Top */}
        <div>
          <h2>🚀 CareerAI</h2>

          <div style={styles.menu} onClick={()=>setActivePage("dashboard")}>📊 Dashboard</div>
          <div style={styles.menu} onClick={()=>setActivePage("profile")}>👤 Profile</div>
          <div style={styles.menu} onClick={()=>setActivePage("internships")}>💼 Internships</div>
        </div>

        {/* 🔥 Logout Bottom */}
        <div style={styles.logout} onClick={logout}>
          🚪 Logout
        </div>

      </div>

      {/* Main */}
      <div style={styles.main}>

        <h1>🎓 Smart Career Dashboard</h1>

        {/* DASHBOARD */}
        {activePage === "dashboard" && (
          <>
            <div style={styles.section}>
              <h2>📄 Resume Upload</h2>
              <input type="file" onChange={handleFileChange} />
              {fileName && <p>Uploaded: {fileName}</p>}
            </div>

            <div style={styles.section}>
              <h2>🧠 Extracted Skills</h2>
              {skills.length === 0 ? <p>No skills yet</p> :
                <ul>{skills.map((s,i)=><li key={i}>{s}</li>)}</ul>}
            </div>

            <div style={styles.section}>
              <h2>📉 Skill Gap</h2>
              {missingSkills.length === 0 ? <p>No missing skills 🎉</p> :
                <ul>{missingSkills.map((s,i)=><li key={i}>{s}</li>)}</ul>}
            </div>

            <div style={styles.cardRow}>
              <div style={styles.scoreCard}>
                <h2>{matchScore}%</h2>
                <p>Match Score</p>
              </div>

              <div style={styles.chartCard}>
                <Doughnut data={chartData} />
              </div>
            </div>
          </>
        )}

        {/* PROFILE */}
        {activePage === "profile" && (
          <div style={styles.formCard}>
            <h2 style={styles.heading}>👤 Student Profile</h2>

            <div style={styles.inputGroup}><span>👤</span><input style={styles.input} placeholder="Full Name" /></div>
            <div style={styles.inputGroup}><span>📧</span><input style={styles.input} placeholder="Email" /></div>
            <div style={styles.inputGroup}><span>📱</span><input style={styles.input} placeholder="Phone Number" /></div>
            <div style={styles.inputGroup}><span>🏫</span><input style={styles.input} placeholder="College Name" /></div>
            <div style={styles.inputGroup}><span>🎓</span><input style={styles.input} placeholder="Degree" /></div>
            <div style={styles.inputGroup}><span>📘</span><input style={styles.input} placeholder="Branch" /></div>
            <div style={styles.inputGroup}><span>📊</span><input style={styles.input} placeholder="CGPA" /></div>
            <div style={styles.inputGroup}><span>🧠</span><input style={styles.input} placeholder="Skills" /></div>
            <div style={styles.inputGroup}><span>🔗</span><input style={styles.input} placeholder="LinkedIn URL" /></div>
            <div style={styles.inputGroup}><span>💻</span><input style={styles.input} placeholder="GitHub URL" /></div>

            <button style={styles.button}>Save Profile</button>
          </div>
        )}

        {/* INTERNSHIPS */}
        {activePage === "internships" && (
          <div style={styles.section}>
            <h2>💼 Internships</h2>

            {internships.length === 0 ? (
              <p>No internships available</p>
            ) : (
              internships.map((job, index) => (
                <div key={index} style={styles.jobCard}>
                  <h3>{job.title}</h3>
                  <p>🏢 {job.company}</p>
                  <p>📍 {job.location}</p>
                  <p>💰 {job.stipend}</p>

                  <button style={styles.button}>Apply</button>
                  <button style={styles.saveButton}>Save</button>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default StudentDashboard;


/* 🎨 STYLES */

const styles = {

  container: {
    display: "flex",
    height: "100vh",
    background: "#f1f5f9"
  },

  sidebar: {
    width: "230px",
    background: "#0f172a",
    color: "white",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between" // 🔥 keeps logout at bottom
  },

  menu: {
    marginBottom: "20px",
    cursor: "pointer"
  },

  logout: {
    cursor: "pointer",
    color: "#f87171",
    fontWeight: "bold"
  },

  main: {
    flex: 1,
    padding: "30px",
    overflow: "auto"
  },

  section: {
    background: "white",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "10px"
  },

  formCard: {
    background: "white",
    padding: "30px",
    marginTop: "20px",
    borderRadius: "12px",
    width: "600px",
    marginLeft: "20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
  },

  heading: {
    marginBottom: "20px",
    fontWeight: "600"
  },

  inputGroup: {
    display: "flex",
    alignItems: "center",
    background: "#f8fafc",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "12px",
    border: "1px solid #e2e8f0"
  },

  input: {
    border: "none",
    outline: "none",
    background: "transparent",
    marginLeft: "10px",
    width: "100%",
    fontSize: "14px"
  },

  cardRow: {
    display: "flex",
    gap: "20px",
    marginTop: "20px"
  },

  scoreCard: {
    background: "#2563eb",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "150px",
    textAlign: "center"
  },

  chartCard: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "250px"
  },

  button: {
    marginTop: "20px",
    padding: "12px",
    width: "100%",
    background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600"
  },

  saveButton: {
    padding: "8px 18px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginLeft: "10px"
  },

  jobCard: {
    background: "#f8fafc",
    padding: "20px",
    marginTop: "15px",
    borderRadius: "8px"
  }

};
