import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, clearAuthSession, getStoredUser } from "../auth";

function JobSeekerDashboard() {
  const user = getStoredUser();
  const [activePage, setActivePage] = useState("jobs");
  const [jobs, setJobs] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileStatus, setProfileStatus] = useState("");
  const [profile, setProfile] = useState({
    phone: "",
    location: "",
    skills: "",
    experienceLevel: "",
    resumeUrl: "",
  });

  const logout = () => {
    clearAuthSession();
    window.location.href = "/login";
  };

  useEffect(() => {
    axios.get(`${API_BASE_URL}/jobs`)
      .then((res) => setJobs(res.data))
      .catch(() => {
        setJobs([
          {
            title: "Frontend Developer",
            company: "ABC Tech",
            location: "Chennai",
            salary: "Rs 20,000",
          },
          {
            title: "Java Developer",
            company: "XYZ Pvt Ltd",
            location: "Bangalore",
            salary: "Rs 30,000",
          },
        ]);
      });
  }, []);

  useEffect(() => {
    if (!user?.id || user.role !== "JOB_SEEKER") {
      return;
    }

    setLoadingProfile(true);

    axios.get(`${API_BASE_URL}/jobseeker/profile/${user.id}`)
      .then((res) => {
        if (res.data) {
          setProfile({
            phone: res.data.phone || "",
            location: res.data.location || "",
            skills: res.data.skills || "",
            experienceLevel: res.data.experienceLevel || "",
            resumeUrl: res.data.resumeUrl || "",
          });
        }
      })
      .catch(() => {
        setProfile((current) => ({ ...current }));
      })
      .finally(() => setLoadingProfile(false));
  }, [user?.id, user?.role]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  };

  const saveProfile = async () => {
    if (!user?.id) {
      setProfileStatus("Unable to save profile because the logged-in user was not found.");
      return;
    }

    setSavingProfile(true);
    setProfileStatus("");

    try {
      await axios.post(`${API_BASE_URL}/jobseeker/profile`, {
        ...profile,
        user: {
          id: user.id,
        },
      });

      setProfileStatus("Profile saved successfully.");
    } catch {
      setProfileStatus("Could not save profile right now. Please try again.");
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div>
          <h2 style={styles.brand}>Job Seeker</h2>
          <div style={styles.menu} onClick={() => setActivePage("jobs")}>
            Jobs
          </div>
          <div style={styles.menu} onClick={() => setActivePage("profile")}>
            Profile
          </div>
        </div>

        <div style={styles.logout} onClick={logout}>
          Logout
        </div>
      </div>

      <div style={styles.main}>
        <div style={styles.header}>
          <div>
            <p style={styles.headerKicker}>Career Dashboard</p>
            <h1 style={styles.heading}>
              {activePage === "jobs" ? "Available Jobs" : "Job Seeker Profile"}
            </h1>
          </div>
          <div style={styles.userBadge}>
            <strong>{user?.name || "Job Seeker"}</strong>
            <span>{user?.email || "No email available"}</span>
          </div>
        </div>

        {activePage === "jobs" ? (
          jobs.length === 0 ? (
            <p>No jobs available</p>
          ) : (
            jobs.map((job, index) => (
              <div key={index} style={styles.jobCard}>
                <h3>{job.title}</h3>
                <p>Company: {job.company}</p>
                <p>Location: {job.location}</p>
                <p>Salary: {job.salary}</p>

                <button style={styles.applyButton}>
                  Apply Now
                </button>
              </div>
            ))
          )
        ) : (
          <div style={styles.profileCard}>
            <h2 style={styles.profileTitle}>Update your professional profile</h2>
            <p style={styles.profileText}>
              Save your skills, experience level, location, and resume link so we can use them in job recommendations later.
            </p>

            {loadingProfile ? <p>Loading profile...</p> : null}

            <div style={styles.formGrid}>
              <div>
                <label style={styles.label}>Phone</label>
                <input
                  style={styles.input}
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label style={styles.label}>Location</label>
                <input
                  style={styles.input}
                  name="location"
                  value={profile.location}
                  onChange={handleProfileChange}
                  placeholder="Enter preferred location"
                />
              </div>

              <div>
                <label style={styles.label}>Experience Level</label>
                <input
                  style={styles.input}
                  name="experienceLevel"
                  value={profile.experienceLevel}
                  onChange={handleProfileChange}
                  placeholder="Fresher / 1 year / 2 years"
                />
              </div>

              <div>
                <label style={styles.label}>Resume URL</label>
                <input
                  style={styles.input}
                  name="resumeUrl"
                  value={profile.resumeUrl}
                  onChange={handleProfileChange}
                  placeholder="Paste resume link"
                />
              </div>
            </div>

            <div style={styles.fullWidthField}>
              <label style={styles.label}>Skills</label>
              <textarea
                style={styles.textarea}
                name="skills"
                value={profile.skills}
                onChange={handleProfileChange}
                placeholder="Example: Java, Spring Boot, React, MySQL"
              />
            </div>

            {profileStatus ? <p style={styles.status}>{profileStatus}</p> : null}

            <button style={styles.saveButton} onClick={saveProfile} disabled={savingProfile}>
              {savingProfile ? "Saving..." : "Save Profile"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobSeekerDashboard;

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f1f5f9",
  },
  sidebar: {
    width: "230px",
    background: "#0f172a",
    color: "white",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  brand: {
    marginTop: 0,
    marginBottom: "24px",
  },
  menu: {
    marginBottom: "18px",
    cursor: "pointer",
  },
  logout: {
    cursor: "pointer",
    color: "#f87171",
    fontWeight: "bold",
  },
  main: {
    flex: 1,
    padding: "30px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginBottom: "24px",
  },
  headerKicker: {
    margin: 0,
    color: "#0f766e",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontWeight: 700,
    fontSize: "0.85rem",
  },
  heading: {
    margin: "8px 0 0",
  },
  userBadge: {
    background: "white",
    borderRadius: "12px",
    padding: "14px 16px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    display: "grid",
    gap: "4px",
  },
  jobCard: {
    background: "white",
    padding: "20px",
    marginTop: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  applyButton: {
    marginTop: "10px",
    padding: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  profileCard: {
    background: "white",
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
  },
  profileTitle: {
    marginTop: 0,
    marginBottom: "8px",
  },
  profileText: {
    marginTop: 0,
    color: "#475569",
    lineHeight: 1.6,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginTop: "20px",
  },
  fullWidthField: {
    marginTop: "16px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: 600,
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
  },
  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    resize: "vertical",
  },
  status: {
    marginTop: "14px",
    color: "#0f766e",
    fontWeight: 600,
  },
  saveButton: {
    marginTop: "18px",
    padding: "12px 18px",
    background: "#0f766e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
  },
};
