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
const [profile, setProfile] = useState({
  phone: "",
  address: "",
  linkedinUrl: "",
  githubUrl: "",
  bio: "",
  resumeUrl: ""
});
  // 🔥 LOGOUT FUNCTION
  const logout = () => {
    clearAuthSession();
    window.location.href = "/login";
  };
const [appliedJobs, setAppliedJobs] = useState([]);
const [applyForm, setApplyForm] = useState({
  jobId: null,
  coverLetter: "",
  resumeUrl: ""
});
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
  const handleChange = (field, value) => {
  setProfile({
    ...profile,
    [field]: value
  });
};
const saveProfile = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8081/api/student/profile",
      profile
    );

    alert("Profile saved successfully ✅");
    console.log(response.data);

  } catch (error) {
    console.error("FULL ERROR 👉", error);
    alert("Error: " + error.message);
  }
};
const openApplyForm = (jobId) => {
  setApplyForm({
    jobId,
    coverLetter: "",
    resumeUrl: profile.resumeUrl || ""
  });
};
const cancelApply = () => {
  setApplyForm({
    jobId: null,
    coverLetter: "",
    resumeUrl: ""
  });
};
const applyForJob = async () => {
  try {
    await axios.post(
      `http://localhost:8081/api/jobseeker/jobs/${applyForm.jobId}/apply`,
      {
        jobSeekerId: 1, // 🔥 TEMP (replace with logged-in user later)
        coverLetter: applyForm.coverLetter,
        resumeUrl: applyForm.resumeUrl
      }
    );

    setAppliedJobs([...appliedJobs, applyForm.jobId]);
    alert("Applied successfully ✅");

    cancelApply();

  } catch (error) {
    console.error(error);
    alert("Error applying ❌");
  }
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

       
        {activePage === "profile" && (
  <div style={styles.formCard}>
    <h2 style={styles.heading}>👤 Student Profile</h2>

    <div style={styles.inputGroup}>
      <span>📱</span>
      <input
        style={styles.input}
        placeholder="Phone Number"
        value={profile.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
      />
    </div>

    <div style={styles.inputGroup}>
      <span>🏠</span>
      <input
        style={styles.input}
        placeholder="Address"
        value={profile.address}
        onChange={(e) => handleChange("address", e.target.value)}
      />
    </div>

    <div style={styles.inputGroup}>
  <span>🔗</span>
  <input
    style={{
      ...styles.input,
      color: profile.linkedinUrl ? "blue" : "black",
      textDecoration: profile.linkedinUrl ? "underline" : "none",
      cursor: profile.linkedinUrl ? "pointer" : "text"
    }}
    placeholder="LinkedIn URL"
    value={profile.linkedinUrl}
    onChange={(e) => handleChange("linkedinUrl", e.target.value)}
    onClick={() => {
      if (profile.linkedinUrl) {
        window.open(profile.linkedinUrl, "_blank");
      }
    }}
  />
</div>

   <div style={styles.inputGroup}>
  <span>💻</span>
  <input
    style={{
      ...styles.input,
      color: profile.githubUrl ? "blue" : "black",
      textDecoration: profile.githubUrl ? "underline" : "none",
      cursor: profile.githubUrl ? "pointer" : "text"
    }}
    placeholder="GitHub URL"
    value={profile.githubUrl}
    onChange={(e) => handleChange("githubUrl", e.target.value)}
    onClick={() => {
      if (profile.githubUrl) {
        window.open(profile.githubUrl, "_blank");
      }
    }}
  />
</div>

<div style={styles.inputGroup}>
  <span>🧾</span>
  <input
    style={{
      ...styles.input,
      color: profile.resumeUrl ? "blue" : "black",
      textDecoration: profile.resumeUrl ? "underline" : "none",
      cursor: profile.resumeUrl ? "pointer" : "text"
    }}
    placeholder="Resume URL"
    value={profile.resumeUrl}
    onChange={(e) => handleChange("resumeUrl", e.target.value)}
    onClick={() => {
      if (profile.resumeUrl) {
        window.open(profile.resumeUrl, "_blank");
      }
    }}
  />
</div>

    <div style={styles.inputGroup}>
      <span>🧠</span>
      <input
        style={styles.input}
        placeholder="Bio"
        value={profile.bio}
        onChange={(e) => handleChange("bio", e.target.value)}
      />
    </div>

    <button style={styles.button} onClick={saveProfile}>
      Save Profile
    </button>
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
    
    {/* 🔹 Job Info */}
    <div style={{ marginBottom: "10px" }}>
      <h3 style={{ marginBottom: "5px" }}>{job.title}</h3>
      <p style={{ margin: "4px 0" }}>🏢 {job.company}</p>
      <p style={{ margin: "4px 0" }}>📍 {job.location}</p>
      <p style={{ margin: "4px 0" }}>💰 {job.stipend}</p>
    </div>

    {/* 🔹 Apply Button */}
    <button
      style={{
        ...styles.button,
        width: "150px",
        marginTop: "10px"
      }}
      onClick={() => openApplyForm(job.id)}
      disabled={appliedJobs.includes(job.id)}
    >
      {appliedJobs.includes(job.id) ? "Applied" : "Apply"}
    </button>

    {/* 🔥 APPLY FORM */}
    {applyForm.jobId === job.id && (
      <div
        style={{
          marginTop: "15px",
          padding: "15px",
          borderRadius: "10px",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
      >

        {/* Resume Input */}
        <input
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
            width: "100%"
          }}
          placeholder="Resume URL"
          value={applyForm.resumeUrl}
          onChange={(e) =>
            setApplyForm({ ...applyForm, resumeUrl: e.target.value })
          }
        />

        {/* Cover Letter */}
        <textarea
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
            width: "100%",
            minHeight: "80px",
            resize: "vertical"
          }}
          placeholder="Write your cover letter..."
          value={applyForm.coverLetter}
          onChange={(e) =>
            setApplyForm({ ...applyForm, coverLetter: e.target.value })
          }
        />

        {/* Buttons Row */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          
          <button
            style={{
              ...styles.button,
              flex: 1
            }}
            onClick={applyForJob}
          >
            Submit
          </button>

          {/* <button
            style={{
              ...styles.saveButton,
              flex:1
            }}
            onClick={cancelApply}
          >
            Cancel
          </button> */}

        </div>

      </div>
    )}

  </div>
))
              // internships.map((job, index) => (
              //   <div key={index} style={styles.jobCard}>
              //     <h3>{job.title}</h3>
              //     <p>🏢 {job.company}</p>
              //     <p>📍 {job.location}</p>
              //     <p>💰 {job.stipend}</p>


              //     <button style={styles.button}>Apply</button>

              //     {/* <button style={styles.saveButton}>Save</button> */}
              //   </div>
              // ))
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
