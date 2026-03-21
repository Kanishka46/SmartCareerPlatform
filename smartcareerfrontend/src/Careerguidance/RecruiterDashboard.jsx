import { useState, useEffect } from "react";
import axios from "axios";

function RecruiterDashboard() {

  const [activePage, setActivePage] = useState("dashboard");

  const [internships, setInternships] = useState([]);

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    stipend: ""
  });

  // 🔥 LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  // ✅ Fetch internships
  useEffect(() => {
    axios.get("http://localhost:8081/api/internships")
      .then(res => setInternships(res.data))
      .catch(() => setInternships([]));
  }, []);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  // ✅ Post Internship
  const postInternship = () => {

    if (!job.title || !job.company) {
      alert("Fill required fields");
      return;
    }

    axios.post("http://localhost:8081/api/internships", job)
      .then(() => {
        alert("Internship Posted ✅");
        setInternships([...internships, job]);
        setJob({ title:"", company:"", location:"", stipend:"" });
      })
      .catch(() => {
        setInternships([...internships, job]);
        alert("Posted (local mode) ✅");
      });
  };

  // ✅ Delete Internship
  const deleteInternship = (index) => {
    const updated = internships.filter((_, i) => i !== index);
    setInternships(updated);
  };

  return (
    <div style={styles.container}>

      {/* Sidebar */}
      <div style={styles.sidebar}>

        {/* Top Menu */}
        <div>
          <h2>🏢 Recruiter Panel</h2>

          <div style={styles.menu} onClick={()=>setActivePage("dashboard")}>📊 Dashboard</div>
          <div style={styles.menu} onClick={()=>setActivePage("post")}>➕ Post Internship</div>
          <div style={styles.menu} onClick={()=>setActivePage("manage")}>📋 Manage Internships</div>
        </div>

        {/* 🔥 Logout at bottom */}
        <div style={styles.logout} onClick={logout}>
          🚪 Logout
        </div>

      </div>

      {/* Main */}
      <div style={styles.main}>
        <h1>💼 Recruiter Dashboard</h1>

        {/* DASHBOARD */}
        {activePage === "dashboard" && (
          <div style={styles.section}>
            <h2>Welcome Recruiter 👋</h2>
            <p>Total Internships Posted: {internships.length}</p>
          </div>
        )}

        {/* POST INTERNSHIP */}
        {activePage === "post" && (
          <div style={styles.formCard}>
            <h2>➕ Post Internship</h2>

            <input name="title" value={job.title} onChange={handleChange} style={styles.input} placeholder="Job Title" />
            <input name="company" value={job.company} onChange={handleChange} style={styles.input} placeholder="Company Name" />
            <input name="location" value={job.location} onChange={handleChange} style={styles.input} placeholder="Location" />
            <input name="stipend" value={job.stipend} onChange={handleChange} style={styles.input} placeholder="Stipend" />

            <button style={styles.button} onClick={postInternship}>Post Internship</button>
          </div>
        )}

        {/* MANAGE INTERNSHIPS */}
        {activePage === "manage" && (
          <div style={styles.section}>
            <h2>📋 Manage Internships</h2>

            {internships.length === 0 ? (
              <p>No internships posted</p>
            ) : (
              internships.map((job, index) => (
                <div key={index} style={styles.jobCard}>
                  <h3>{job.title}</h3>
                  <p>🏢 {job.company}</p>
                  <p>📍 {job.location}</p>
                  <p>💰 {job.stipend}</p>

                  <button
                    style={styles.deleteButton}
                    onClick={()=>deleteInternship(index)}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default RecruiterDashboard;


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
    justifyContent:"space-between" // 🔥 keeps logout at bottom
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
    padding:"30px",
    overflow:"auto"
  },

  section:{
    background:"white",
    padding:"20px",
    marginTop:"20px",
    borderRadius:"10px"
  },

  formCard:{
    background:"white",
    padding:"30px",
    marginTop:"20px",
    borderRadius:"10px",
    width:"500px",
    marginLeft:"20px"
  },

  input:{
    width:"100%",
    padding:"10px",
    margin:"10px 0",
    borderRadius:"8px",
    border:"1px solid #ccc"
  },

  button:{
    marginTop:"10px",
    padding:"10px",
    background:"#2563eb",
    color:"white",
    border:"none",
    borderRadius:"6px",
    cursor:"pointer"
  },

  deleteButton:{
    marginTop:"10px",
    padding:"8px",
    background:"#dc2626",
    color:"white",
    border:"none",
    borderRadius:"6px",
    cursor:"pointer"
  },

  jobCard:{
    background:"#f8fafc",
    padding:"20px",
    marginTop:"15px",
    borderRadius:"8px"
  }

};