// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function StudentDashboard() {

//   const API = "http://localhost:8081/api";

//   const [page, setPage] = useState("dashboard");

//   const [profile, setProfile] = useState({});
//   const [skills, setSkills] = useState([]);
//   const [skillGap, setSkillGap] = useState([]);
//   const [careerPrediction, setCareerPrediction] = useState([]);

//   const [internships, setInternships] = useState([]);
//   const [savedInternships, setSavedInternships] = useState([]);
//   const [applications, setApplications] = useState([]);

//   const [matchScore, setMatchScore] = useState(0);

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   const loadDashboard = async () => {

//     try {

//       const profileRes = await axios.get(`${API}/student/profile`);
//       setProfile(profileRes.data);

//       const skillsRes = await axios.get(`${API}/student/skills`);
//       setSkills(skillsRes.data);

//       const gapRes = await axios.get(`${API}/student/skill-gap`);
//       setSkillGap(gapRes.data);

//       const careerRes = await axios.get(`${API}/student/career-prediction`);
//       setCareerPrediction(careerRes.data);

//       const matchRes = await axios.get(`${API}/student/job-match`);
//       setMatchScore(matchRes.data.score);

//       const internshipsRes = await axios.get(`${API}/internships`);
//       setInternships(internshipsRes.data);

//       const savedRes = await axios.get(`${API}/internships/saved`);
//       setSavedInternships(savedRes.data);

//       const appRes = await axios.get(`${API}/internships/applications`);
//       setApplications(appRes.data);

//     } catch (err) {
//       console.log(err);
//     }

//   };

//   const saveInternship = async (id) => {
//     await axios.post(`${API}/internships/save/${id}`);
//     loadDashboard();
//   };

//   const applyInternship = async (id) => {
//     await axios.post(`${API}/internships/apply/${id}`);
//     loadDashboard();
//   };

//   return (

//     <div style={{ display: "flex", height: "100vh", fontFamily: "Segoe UI" }}>

//       {/* SIDEBAR */}

//       <div style={styles.sidebar}>

//         <h2>🚀 CareerAI</h2>

//         <div style={styles.menu} onClick={() => setPage("dashboard")}>📊 Dashboard</div>
//         <div style={styles.menu} onClick={() => setPage("internships")}>💼 Internships</div>
//         <div style={styles.menu} onClick={() => setPage("saved")}>📌 Saved</div>
//         <div style={styles.menu} onClick={() => setPage("applications")}>📄 Applications</div>

//       </div>

//       {/* MAIN */}

//       <div style={styles.main}>

//         <h1>🎓 Student Dashboard</h1>

//         {page === "dashboard" && (

//           <>

//             {/* PROFILE */}

//             <div style={styles.profileCard}>

//               <div>

//                 <h3>👤 {profile.name}</h3>
//                 <p>📧 {profile.email}</p>
//                 <p>🎓 {profile.degree}</p>

//               </div>

//               <div style={styles.scoreBox}>
//                 <h2>🎯 {matchScore}%</h2>
//                 <p>Job Match Score</p>
//               </div>

//             </div>

//             {/* SKILLS */}

//             <div style={styles.box}>

//               <h2>🧠 Skill Analysis</h2>

//               {skills.map((skill, i) => (

//                 <div key={i} style={{ marginBottom: 10 }}>

//                   <p>{skill.name}</p>

//                   <div style={styles.progressBg}>
//                     <div
//                       style={{
//                         ...styles.progressFill,
//                         width: `${skill.level}%`
//                       }}
//                     />
//                   </div>

//                 </div>

//               ))}

//             </div>

//             {/* SKILL GAP */}

//             <div style={styles.box}>

//               <h2>📉 Skill Gap Detector</h2>

//               {skillGap.map((skill, i) => (
//                 <p key={i}>⚠ Missing Skill: {skill}</p>
//               ))}

//             </div>

//             {/* CAREER PREDICTION */}

//             <div style={styles.box}>

//               <h2>🔮 Career Prediction</h2>

//               {careerPrediction.map((role, i) => (
//                 <p key={i}>➡ {role}</p>
//               ))}

//             </div>

//           </>
//         )}

//         {page === "internships" && (

//           <div>

//             <h2>💼 Internships</h2>

//             {internships.map((job) => (

//               <div key={job.id} style={styles.jobCard}>

//                 <h3>{job.title}</h3>
//                 <p>{job.company}</p>

//                 <button style={styles.btn} onClick={() => saveInternship(job.id)}>📌 Save</button>
//                 <button style={styles.btn} onClick={() => applyInternship(job.id)}>📄 Apply</button>

//               </div>

//             ))}

//           </div>

//         )}

//         {page === "saved" && (

//           <div>

//             <h2>📌 Saved Internships</h2>

//             {savedInternships.map((job) => (
//               <div key={job.id} style={styles.jobCard}>
//                 <h3>{job.title}</h3>
//                 <p>{job.company}</p>
//               </div>
//             ))}

//           </div>

//         )}

//         {page === "applications" && (

//           <div>

//             <h2>📄 Applications</h2>

//             {applications.map((job) => (
//               <div key={job.id} style={styles.jobCard}>
//                 <h3>{job.title}</h3>
//                 <p>{job.company}</p>
//               </div>
//             ))}

//           </div>

//         )}

//       </div>
//     </div>
//   );
// }

// const styles = {

//   sidebar:{
//     width:220,
//     background:"#0f172a",
//     color:"white",
//     padding:20
//   },

//   menu:{
//     padding:12,
//     cursor:"pointer"
//   },

//   main:{
//     flex:1,
//     padding:40,
//     background:"#f1f5f9",
//     overflow:"auto"
//   },

//   profileCard:{
//     display:"flex",
//     justifyContent:"space-between",
//     background:"white",
//     padding:20,
//     borderRadius:10,
//     marginBottom:20
//   },

//   scoreBox:{
//     background:"#2563eb",
//     color:"white",
//     padding:20,
//     borderRadius:10,
//     textAlign:"center"
//   },

//   box:{
//     background:"white",
//     padding:20,
//     borderRadius:10,
//     marginTop:20
//   },

//   progressBg:{
//     width:"100%",
//     height:10,
//     background:"#ddd",
//     borderRadius:10
//   },

//   progressFill:{
//     height:10,
//     background:"#2563eb",
//     borderRadius:10
//   },

//   jobCard:{
//     background:"white",
//     padding:20,
//     marginTop:15,
//     borderRadius:10
//   },

//   btn:{
//     marginRight:10,
//     padding:"6px 12px",
//     background:"#2563eb",
//     color:"white",
//     border:"none",
//     borderRadius:5
//   }

// };

// export default StudentDashboard;




// import { useState } from "react";

// function StudentDashboard() {

//   const [activePage, setActivePage] = useState("dashboard");

//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     degree: ""
//   });

//   const handleChange = (e) => {
//     setProfile({
//       ...profile,
//       [e.target.name]: e.target.value
//     });
//   };

//   const saveProfile = () => {
//     alert("Profile Saved Successfully ✅");
//   };

//   return (
//     <div style={styles.container}>

//       {/* Sidebar */}
//       <div style={styles.sidebar}>
//         <h2 style={{marginBottom:"30px"}}>🚀 CareerAI</h2>

//         <div style={styles.menuItem} onClick={()=>setActivePage("dashboard")}>📊 Dashboard</div>
//         <div style={styles.menuItem} onClick={()=>setActivePage("profile")}>👤 My Profile</div>
//         <div style={styles.menuItem} onClick={()=>setActivePage("internships")}>💼 Internships</div>
//         <div style={styles.menuItem} onClick={()=>setActivePage("saved")}>📌 Saved Internships</div>
//         <div style={styles.menuItem} onClick={()=>setActivePage("applications")}>📄 Applications</div>
//         <div style={styles.menuItem}>🚪 Logout</div>

//       </div>

//       {/* Main Content */}
//       <div style={styles.main}>

//         <h1>🎓 Student Dashboard</h1>

//         {/* DASHBOARD */}
//         {activePage === "dashboard" && (
//           <>

//             <div style={styles.cardRow}>

//               <div style={styles.card}>
//                 <h3>👤 Profile</h3>
//                 <p>Manage your personal details</p>
//               </div>

//               <div style={styles.card}>
//                 <h3>💼 Internships</h3>
//                 <p>0 Available</p>
//               </div>

//               <div style={styles.card}>
//                 <h3>📄 Applications</h3>
//                 <p>Track your applications</p>
//               </div>

//               <div style={styles.scoreCard}>
//                 🎯 <h2>0%</h2>
//                 <p>Job Match Score</p>
//               </div>

//             </div>


//             <div style={styles.section}>
//               <h2>🧠 Skill Analysis</h2>
//               <p>Your skills will be analyzed from your resume.</p>
//             </div>

//             <div style={styles.section}>
//               <h2>📉 Skill Gap Detector</h2>
//               <p>Find missing skills required for your dream job.</p>
//             </div>

//             <div style={styles.section}>
//               <h2>🔮 Career Prediction</h2>
//               <p>AI predicts your future career path.</p>
//             </div>

//           </>
//         )}

//         {/* PROFILE */}
//         {activePage === "profile" && (

//           <div style={styles.formCard}>

//             <h2>👤 My Profile</h2>

//             <input
//               style={styles.input}
//               name="name"
//               placeholder="Full Name"
//               value={profile.name}
//               onChange={handleChange}
//             />

//             <input
//               style={styles.input}
//               name="email"
//               placeholder="Email"
//               value={profile.email}
//               onChange={handleChange}
//             />

//             <input
//               style={styles.input}
//               name="phone"
//               placeholder="Phone"
//               value={profile.phone}
//               onChange={handleChange}
//             />

//             <input
//               style={styles.input}
//               name="degree"
//               placeholder="Degree"
//               value={profile.degree}
//               onChange={handleChange}
//             />

//             <button style={styles.button} onClick={saveProfile}>
//               Save Profile
//             </button>

//           </div>

//         )}

//         {/* INTERNSHIPS */}
//         {activePage === "internships" && (

//           <div style={styles.section}>

//             <h2>💼 Available Internships</h2>

//             <div style={styles.jobCard}>
//               <h3>Frontend Developer</h3>
//               <p>Company: TechSoft</p>
//               <p>Location: Remote</p>
//               <button style={styles.button}>Apply</button>
//             </div>

//             <div style={styles.jobCard}>
//               <h3>Backend Developer</h3>
//               <p>Company: CodeWorks</p>
//               <p>Location: Bangalore</p>
//               <button style={styles.button}>Apply</button>
//             </div>

//           </div>

//         )}

//         {/* SAVED */}
//         {activePage === "saved" && (

//           <div style={styles.section}>
//             <h2>📌 Saved Internships</h2>
//             <p>No saved internships yet.</p>
//           </div>

//         )}

//         {/* APPLICATIONS */}
//         {activePage === "applications" && (

//           <div style={styles.section}>
//             <h2>📄 My Applications</h2>
//             <p>You have not applied to any internships.</p>
//           </div>

//         )}

//       </div>

//     </div>
//   );
// }

// export default StudentDashboard;


// const styles = {

// container:{
// display:"flex",
// height:"100vh",
// background:"#f1f5f9"
// },

// sidebar:{
// width:"220px",
// background:"#0f172a",
// color:"white",
// padding:"25px"
// },

// menuItem:{
// marginBottom:"20px",
// cursor:"pointer"
// },

// main:{
// flex:1,
// padding:"30px"
// },

// cardRow:{
// display:"flex",
// gap:"20px",
// marginTop:"20px",
// flexWrap:"wrap"
// },

// card:{
// background:"white",
// padding:"20px",
// borderRadius:"10px",
// width:"200px",
// boxShadow:"0 2px 5px rgba(0,0,0,0.1)"
// },

// scoreCard:{
// background:"#2563eb",
// color:"white",
// padding:"20px",
// borderRadius:"10px",
// width:"160px",
// textAlign:"center"
// },

// section:{
// background:"white",
// padding:"25px",
// marginTop:"20px",
// borderRadius:"10px"
// },

// formCard:{
// background:"white",
// padding:"30px",
// width:"400px",
// borderRadius:"10px"
// },

// input:{
// width:"100%",
// padding:"10px",
// margin:"10px 0",
// borderRadius:"8px",
// border:"1px solid #ccc"
// },

// button:{
// padding:"10px 20px",
// background:"#2563eb",
// color:"white",
// border:"none",
// borderRadius:"6px",
// cursor:"pointer"
// },

// jobCard:{
// background:"#f8fafc",
// padding:"20px",
// marginTop:"15px",
// borderRadius:"8px"
// }

// };


import { useState, useEffect } from "react";
import axios from "axios";

function StudentDashboard() {

  const [activePage, setActivePage] = useState("dashboard");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    degree: ""
  });

  const [internships, setInternships] = useState([]);

  const [savedInternships, setSavedInternships] = useState([]);

  const [applications, setApplications] = useState([]);

  // Fetch internships from backend
  useEffect(() => {

    axios
      .get("http://localhost:8081/api/internships")
      .then((res) => {
        setInternships(res.data);
      })
      .catch(() => {
        console.log("Internship API not connected yet");
      });

  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const saveProfile = () => {
    alert("Profile Saved Successfully ✅");
  };

  const saveInternship = (job) => {
    setSavedInternships([...savedInternships, job]);
  };

  const applyInternship = (job) => {
    setApplications([...applications, job]);
  };

  return (
    <div style={styles.container}>

      {/* Sidebar */}
      <div style={styles.sidebar}>

        <h2 style={{marginBottom:"40px"}}>🚀 CareerAI</h2>

        <div style={styles.menu} onClick={()=>setActivePage("dashboard")}>📊 Dashboard</div>

        <div style={styles.menu} onClick={()=>setActivePage("profile")}>👤 My Profile</div>

        <div style={styles.menu} onClick={()=>setActivePage("internships")}>💼 Internships</div>

        <div style={styles.menu} onClick={()=>setActivePage("saved")}>📌 Saved Internships</div>

        <div style={styles.menu} onClick={()=>setActivePage("applications")}>📄 Applications</div>

        <div style={styles.menu}>🚪 Logout</div>

      </div>


      {/* Main Content */}
      <div style={styles.main}>

        <h1>🎓 Student Dashboard</h1>

        {/* DASHBOARD */}
        {activePage === "dashboard" && (

          <>
            <div style={styles.cardRow}>

              <div style={styles.card}>
                <h3>👤 Profile</h3>
                <p>Manage your details</p>
              </div>

              <div style={styles.card}>
                <h3>💼 Internships</h3>
                <p>{internships.length} Available</p>
              </div>

              <div style={styles.card}>
                <h3>📄 Applications</h3>
                <p>{applications.length}</p>
              </div>

              <div style={styles.scoreCard}>
                🎯
                <h2>0%</h2>
                <p>Job Match Score</p>
              </div>

            </div>

            <div style={styles.section}>
              <h2>🧠 Skill Analysis</h2>
              <p>Your resume will be analyzed to extract skills.</p>
            </div>

            <div style={styles.section}>
              <h2>📉 Skill Gap Detector</h2>
              <p>Shows missing skills required for your dream job.</p>
            </div>

            <div style={styles.section}>
              <h2>🔮 Career Prediction</h2>
              <p>AI predicts your possible career paths.</p>
            </div>
          </>
        )}

        {/* PROFILE PAGE */}
        {activePage === "profile" && (

          <div style={styles.formCard}>

            <h2>👤 My Profile</h2>

            <input
              style={styles.input}
              name="name"
              placeholder="Full Name"
              value={profile.name}
              onChange={handleChange}
            />

            <input
              style={styles.input}
              name="email"
              placeholder="Email"
              value={profile.email}
              onChange={handleChange}
            />

            <input
              style={styles.input}
              name="phone"
              placeholder="Phone"
              value={profile.phone}
              onChange={handleChange}
            />

            <input
              style={styles.input}
              name="degree"
              placeholder="Degree"
              value={profile.degree}
              onChange={handleChange}
            />

            <button style={styles.button} onClick={saveProfile}>
              Save Profile
            </button>

          </div>
        )}

        {/* INTERNSHIPS */}
        {activePage === "internships" && (

          <div style={styles.section}>

            <h2>💼 Available Internships</h2>

            {internships.length === 0 ? (
              <p>No internships available</p>
            ) : (
              internships.map((job) => (

                <div key={job.id} style={styles.jobCard}>

                  <h3>{job.title}</h3>

                  <p>🏢 {job.company}</p>

                  <p>📍 {job.location}</p>

                  <p>💰 {job.stipend}</p>

                  <div style={{marginTop:"10px"}}>

                    <button
                      style={styles.button}
                      onClick={()=>applyInternship(job)}
                    >
                      Apply
                    </button>

                    <button
                      style={styles.saveButton}
                      onClick={()=>saveInternship(job)}
                    >
                      Save
                    </button>

                  </div>

                </div>
              ))
            )}

          </div>
        )}

        {/* SAVED INTERNSHIPS */}
        {activePage === "saved" && (

          <div style={styles.section}>

            <h2>📌 Saved Internships</h2>

            {savedInternships.length === 0 ? (
              <p>No saved internships</p>
            ) : (
              savedInternships.map((job,index)=>(
                <div key={index} style={styles.jobCard}>
                  <h3>{job.title}</h3>
                  <p>{job.company}</p>
                </div>
              ))
            )}

          </div>
        )}

        {/* APPLICATIONS */}
        {activePage === "applications" && (

          <div style={styles.section}>

            <h2>📄 My Applications</h2>

            {applications.length === 0 ? (
              <p>No applications yet</p>
            ) : (
              applications.map((job,index)=>(
                <div key={index} style={styles.jobCard}>
                  <h3>{job.title}</h3>
                  <p>{job.company}</p>
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
padding:"25px"
},

menu:{
marginBottom:"20px",
cursor:"pointer"
},

main:{
flex:1,
padding:"30px",
overflow:"auto"
},

cardRow:{
display:"flex",
gap:"20px",
marginTop:"20px",
flexWrap:"wrap"
},

card:{
background:"white",
padding:"20px",
borderRadius:"10px",
width:"200px",
boxShadow:"0 2px 5px rgba(0,0,0,0.1)"
},

scoreCard:{
background:"#2563eb",
color:"white",
padding:"20px",
borderRadius:"10px",
width:"160px",
textAlign:"center"
},

section:{
background:"white",
padding:"25px",
marginTop:"20px",
borderRadius:"10px"
},

formCard:{
background:"white",
padding:"30px",
width:"400px",
borderRadius:"10px"
},

input:{
width:"100%",
padding:"10px",
margin:"10px 0",
borderRadius:"8px",
border:"1px solid #ccc"
},

button:{
padding:"8px 18px",
background:"#2563eb",
color:"white",
border:"none",
borderRadius:"6px",
cursor:"pointer",
marginRight:"10px"
},

saveButton:{
padding:"8px 18px",
background:"#16a34a",
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