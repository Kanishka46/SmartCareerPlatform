import { useState, useEffect } from "react";
import axios from "axios";

function RecruiterDashboard() {

const [activePage, setActivePage] = useState("dashboard");

const [internships, setInternships] = useState([]);
const [applications, setApplications] = useState([]);

const [title, setTitle] = useState("");
const [company, setCompany] = useState("");
const [location, setLocation] = useState("");
const [skills, setSkills] = useState("");
const [description, setDescription] = useState("");



/* ================= FETCH INTERNSHIPS ================= */

useEffect(() => {

axios.get("http://localhost:8081/api/internships")
.then(res=>{
setInternships(res.data);
})
.catch(err=>{
console.log(err);
});

},[]);



/* ================= FETCH APPLICATIONS ================= */

const loadApplications = () => {

axios.get("http://localhost:8081/api/applications")
.then(res=>{
setApplications(res.data);
})
.catch(err=>{
console.log(err);
});

};



/* ================= POST INTERNSHIP ================= */

const postInternship = async () => {

if(!title || !company || !location){
alert("Please fill all fields");
return;
}

try{

await axios.post("http://localhost:8081/api/internships",{
title,
company,
location,
skills,
description
});

alert("Internship Posted Successfully 🚀");

setTitle("");
setCompany("");
setLocation("");
setSkills("");
setDescription("");

window.location.reload();

}catch(error){
alert("Error posting internship");
}

};



/* ================= DELETE INTERNSHIP ================= */

const deleteInternship = async (id) => {

try{

await axios.delete(`http://localhost:8081/api/internships/${id}`);

alert("Internship Deleted");

setInternships(internships.filter(i => i.id !== id));

}catch(err){
alert("Delete failed");
}

};



/* ================= SIDEBAR ================= */

const Sidebar = () => (

<div style={styles.sidebar}>

<h2 style={{color:"#00ffff"}}>Recruiter</h2>

<button style={styles.menu} onClick={()=>setActivePage("dashboard")}>
📊 Dashboard
</button>

<button style={styles.menu} onClick={()=>setActivePage("post")}>
💼 Post Internship
</button>

<button style={styles.menu} onClick={()=>setActivePage("internships")}>
📄 My Internships
</button>

<button style={styles.menu} onClick={()=>{
setActivePage("applications");
loadApplications();
}}>
👨‍🎓 Applicants
</button>

</div>

);



/* ================= DASHBOARD ================= */

const Dashboard = () => (

<div>

<h2>📊 Recruiter Dashboard</h2>

<div style={styles.cardContainer}>

<div style={styles.card}>
<h3>Total Internships</h3>
<p>{internships.length}</p>
</div>

<div style={styles.card}>
<h3>Total Applicants</h3>
<p>{applications.length}</p>
</div>

</div>

</div>

);



/* ================= POST INTERNSHIP ================= */

const PostInternship = () => (

<div>

<h2>💼 Post Internship</h2>

<input
style={styles.input}
placeholder="Internship Title"
value={title}
onChange={e=>setTitle(e.target.value)}
/>

<input
style={styles.input}
placeholder="Company Name"
value={company}
onChange={e=>setCompany(e.target.value)}
/>

<input
style={styles.input}
placeholder="Location"
value={location}
onChange={e=>setLocation(e.target.value)}
/>

<input
style={styles.input}
placeholder="Required Skills"
value={skills}
onChange={e=>setSkills(e.target.value)}
/>

<textarea
style={styles.textarea}
placeholder="Description"
value={description}
onChange={e=>setDescription(e.target.value)}
/>

<button style={styles.button} onClick={postInternship}>
Post Internship 🚀
</button>

</div>

);



/* ================= INTERNSHIPS ================= */

const InternshipList = () => (

<div>

<h2>📄 My Internships</h2>

{internships.map((i)=>(
<div key={i.id} style={styles.listCard}>

<h3>{i.title}</h3>

<p>🏢 {i.company}</p>

<p>📍 {i.location}</p>

<p>🛠 {i.skills}</p>

<button
style={styles.deleteBtn}
onClick={()=>deleteInternship(i.id)}
>
Delete
</button>

</div>
))}

</div>

);



/* ================= APPLICATIONS ================= */

const Applications = () => (

<div>

<h2>👨‍🎓 Applicants</h2>

{applications.map((app)=>(
<div key={app.id} style={styles.listCard}>

<h3>Student ID: {app.studentId}</h3>

<p>Internship ID: {app.internshipId}</p>

<p>Status: {app.status}</p>

</div>
))}

</div>

);



/* ================= PAGE SWITCH ================= */

const renderPage = () => {

switch(activePage){

case "dashboard":
return <Dashboard/>

case "post":
return <PostInternship/>

case "internships":
return <InternshipList/>

case "applications":
return <Applications/>

default:
return <Dashboard/>

}

};



/* ================= MAIN ================= */

return (

<div style={styles.container}>

<Sidebar/>

<div style={styles.content}>
{renderPage()}
</div>

</div>

);

}



/* ================= STYLES ================= */

const styles = {

container:{
display:"flex",
height:"100vh",
fontFamily:"Segoe UI"
},

sidebar:{
width:"230px",
background:"#0f172a",
color:"white",
padding:"20px",
display:"flex",
flexDirection:"column"
},

menu:{
background:"transparent",
border:"none",
color:"white",
padding:"12px",
textAlign:"left",
cursor:"pointer",
fontSize:"15px"
},

content:{
flex:1,
padding:"40px",
background:"#f1f5f9",
overflowY:"auto"
},

input:{
width:"100%",
padding:"10px",
margin:"10px 0",
borderRadius:"6px",
border:"1px solid #ccc"
},

textarea:{
width:"100%",
height:"100px",
padding:"10px",
margin:"10px 0"
},

button:{
padding:"12px",
background:"#2563eb",
color:"white",
border:"none",
borderRadius:"6px",
cursor:"pointer"
},

cardContainer:{
display:"flex",
gap:"20px"
},

card:{
background:"white",
padding:"20px",
borderRadius:"10px",
width:"200px",
boxShadow:"0 3px 10px rgba(0,0,0,0.1)"
},

listCard:{
background:"white",
padding:"20px",
marginTop:"15px",
borderRadius:"10px",
boxShadow:"0 2px 8px rgba(0,0,0,0.1)"
},

deleteBtn:{
background:"red",
color:"white",
border:"none",
padding:"6px 12px",
borderRadius:"5px",
cursor:"pointer",
marginTop:"10px"
}

};

export default RecruiterDashboard;