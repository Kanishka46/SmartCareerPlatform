import { useState, useEffect } from "react";
import axios from "axios";
import { clearAuthSession } from "../auth";

function JobSeekerDashboard() {

  const [jobs, setJobs] = useState([]);

  // 🔥 Logout
  const logout = () => {
    clearAuthSession();
    window.location.href = "/login";
  };

  // ✅ Fetch jobs from backend
  useEffect(() => {
    axios.get("http://localhost:8081/api/jobs")
      .then(res => setJobs(res.data))
      .catch(() => {
        // 🔥 fallback (if backend not ready)
        setJobs([
          {
            title: "Frontend Developer",
            company: "ABC Tech",
            location: "Chennai",
            salary: "₹20,000"
          },
          {
            title: "Java Developer",
            company: "XYZ Pvt Ltd",
            location: "Bangalore",
            salary: "₹30,000"
          }
        ]);
      });
  }, []);

  return (
    <div style={styles.container}>

      {/* Sidebar */}
      <div style={styles.sidebar}>

        <div>
          <h2>💼 Job Seeker</h2>
          <div style={styles.menu}>📋 Jobs</div>
        </div>

        <div style={styles.logout} onClick={logout}>
          🚪 Logout
        </div>

      </div>

      {/* Main */}
      <div style={styles.main}>
        <h1>💼 Available Jobs</h1>

        {jobs.length === 0 ? (
          <p>No jobs available</p>
        ) : (
          jobs.map((job, index) => (
            <div key={index} style={styles.jobCard}>
              <h3>{job.title}</h3>
              <p>🏢 {job.company}</p>
              <p>📍 {job.location}</p>
              <p>💰 {job.salary}</p>

              <button style={styles.applyButton}>
                Apply Now
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default JobSeekerDashboard;


/* 🎨 STYLES */

const styles = {

  container:{
    display:"flex",
    height:"100vh",
    background:"#f1f5f9"
  },

  sidebar:{
    width:"230px",
    background:"#0f172a",
    color:"white",
    padding:"25px",
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between"
  },

  menu:{
    marginBottom:"20px",
    cursor:"pointer"
  },

  logout:{
    cursor:"pointer",
    color:"#f87171",
    fontWeight:"bold"
  },

  main:{
    flex:1,
    padding:"30px"
  },

  jobCard:{
    background:"white",
    padding:"20px",
    marginTop:"15px",
    borderRadius:"10px",
    boxShadow:"0 2px 5px rgba(0,0,0,0.1)"
  },

  applyButton:{
    marginTop:"10px",
    padding:"10px",
    background:"#2563eb",
    color:"white",
    border:"none",
    borderRadius:"6px",
    cursor:"pointer"
  }

};
