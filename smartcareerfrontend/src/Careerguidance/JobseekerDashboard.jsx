import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, clearAuthSession, getStoredUser } from "../auth";

function JobSeekerDashboard() {
  const user = getStoredUser();
  const [activePage, setActivePage] = useState("jobs");
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobStatus, setJobStatus] = useState("");
  const [search, setSearch] = useState({
    keyword: "",
    location: "",
  });
  const [applyForm, setApplyForm] = useState({
    jobId: null,
    coverLetter: "",
    resumeUrl: "",
  });
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

  const fallbackJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "ABC Tech",
      location: "Chennai",
      salaryRange: "Rs 20,000",
      employmentType: "FULL_TIME",
      requiredSkills: "React, JavaScript, CSS",
      description: "Build responsive web interfaces and collaborate with UI and backend teams.",
    },
    {
      id: 2,
      title: "Java Developer",
      company: "XYZ Pvt Ltd",
      location: "Bangalore",
      salaryRange: "Rs 30,000",
      employmentType: "FULL_TIME",
      requiredSkills: "Java, Spring Boot, MySQL",
      description: "Develop backend services and maintain enterprise APIs.",
    },
  ];

  const logout = () => {
    clearAuthSession();
    window.location.href = "/login";
  };

  const loadJobs = async (keyword = "", location = "") => {
    setJobsLoading(true);
    setJobStatus("");

    try {
      const hasFilters = keyword.trim() || location.trim();
      const response = hasFilters
        ? await axios.get(`${API_BASE_URL}/jobs/search`, {
            params: {
              keyword: keyword.trim(),
              location: location.trim(),
            },
          })
        : await axios.get(`${API_BASE_URL}/jobs`);

      setJobs(response.data);

      if (!response.data.length) {
        setJobStatus("No jobs matched your current search.");
      }
    } catch {
      setJobs(fallbackJobs);
      setJobStatus("Showing fallback jobs because the backend jobs service could not be reached.");
    } finally {
      setJobsLoading(false);
    }
  };

  const loadApplications = async () => {
    if (!user?.id || user.role !== "JOB_SEEKER") {
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/jobseeker/applications/${user.id}`);
      setAppliedJobIds(response.data.map((application) => application.job?.id).filter(Boolean));
    } catch {
      setAppliedJobIds([]);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    loadApplications();
  }, [user?.id, user?.role]);

  useEffect(() => {
    if (!user?.id || user.role !== "JOB_SEEKER") {
      return;
    }

    setLoadingProfile(true);

    axios.get(`${API_BASE_URL}/jobseeker/profile/${user.id}`)
      .then((res) => {
        if (res.data) {
          const nextProfile = {
            phone: res.data.phone || "",
            location: res.data.location || "",
            skills: res.data.skills || "",
            experienceLevel: res.data.experienceLevel || "",
            resumeUrl: res.data.resumeUrl || "",
          };

          setProfile(nextProfile);
          setApplyForm((current) => ({
            ...current,
            resumeUrl: current.resumeUrl || nextProfile.resumeUrl || "",
          }));
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

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearch((current) => ({ ...current, [name]: value }));
  };

  const handleApplyFormChange = (event) => {
    const { name, value } = event.target;
    setApplyForm((current) => ({ ...current, [name]: value }));
  };

  const handleSearch = async () => {
    await loadJobs(search.keyword, search.location);
  };

  const resetSearch = async () => {
    setSearch({ keyword: "", location: "" });
    await loadJobs();
  };

  const openApplyForm = (jobId) => {
    setApplyForm({
      jobId,
      coverLetter: "",
      resumeUrl: profile.resumeUrl || "",
    });
    setJobStatus("");
  };

  const cancelApply = () => {
    setApplyForm({
      jobId: null,
      coverLetter: "",
      resumeUrl: profile.resumeUrl || "",
    });
  };

  const applyForJob = async () => {
    if (!user?.id) {
      setJobStatus("Please log in again before applying.");
      return;
    }

    if (!applyForm.resumeUrl.trim()) {
      setJobStatus("Please add a resume URL before applying.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/jobseeker/jobs/${applyForm.jobId}/apply`, {
        jobSeekerId: user.id,
        coverLetter: applyForm.coverLetter,
        resumeUrl: applyForm.resumeUrl,
      });

      setAppliedJobIds((current) => [...new Set([...current, applyForm.jobId])]);
      setJobStatus("Application submitted successfully.");
      cancelApply();
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      setJobStatus(serverMessage || "Could not submit application right now.");
    }
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
              {activePage === "jobs" ? "Find and Apply for Jobs" : "Job Seeker Profile"}
            </h1>
          </div>
          <div style={styles.userBadge}>
            <strong>{user?.name || "Job Seeker"}</strong>
            <span>{user?.email || "No email available"}</span>
          </div>
        </div>

        {activePage === "jobs" ? (
          <>
            <div style={styles.searchCard}>
              <div style={styles.searchGrid}>
                <div>
                  <label style={styles.label}>Search by title or keyword</label>
                  <input
                    style={styles.input}
                    name="keyword"
                    value={search.keyword}
                    onChange={handleSearchChange}
                    placeholder="Java, React, Analyst"
                  />
                </div>

                <div>
                  <label style={styles.label}>Location</label>
                  <input
                    style={styles.input}
                    name="location"
                    value={search.location}
                    onChange={handleSearchChange}
                    placeholder="Chennai, Bangalore"
                  />
                </div>
              </div>

              <div style={styles.searchActions}>
                <button style={styles.primaryButton} onClick={handleSearch} disabled={jobsLoading}>
                  {jobsLoading ? "Searching..." : "Search Jobs"}
                </button>
                <button style={styles.secondaryButton} onClick={resetSearch}>
                  Reset
                </button>
              </div>

              {jobStatus ? <p style={styles.status}>{jobStatus}</p> : null}
            </div>

            {jobs.length === 0 && !jobsLoading ? (
              <p>No jobs available</p>
            ) : (
              jobs.map((job, index) => {
                const jobId = job.id || index;
                const isApplyOpen = applyForm.jobId === jobId;
                const alreadyApplied = appliedJobIds.includes(job.id);

                return (
                  <div key={jobId} style={styles.jobCard}>
                    <div style={styles.jobHeader}>
                      <div>
                        <h3 style={styles.jobTitle}>{job.title}</h3>
                        <p style={styles.jobMeta}>Company: {job.company}</p>
                        <p style={styles.jobMeta}>Location: {job.location}</p>
                      </div>
                      <div style={styles.jobBadge}>
                        <strong>{job.salaryRange || job.salary || "Salary not specified"}</strong>
                        <span>{job.employmentType || "Role"}</span>
                      </div>
                    </div>

                    <p style={styles.jobDescription}>
                      {job.description || "No description available for this job yet."}
                    </p>

                    <p style={styles.skillsLine}>
                      <strong>Skills:</strong> {job.requiredSkills || "Not specified"}
                    </p>

                    <div style={styles.jobActions}>
                      <button
                        style={alreadyApplied ? styles.disabledButton : styles.applyButton}
                        onClick={() => openApplyForm(jobId)}
                        disabled={alreadyApplied}
                      >
                        {alreadyApplied ? "Applied" : "Apply for Job"}
                      </button>
                    </div>

                    {isApplyOpen ? (
                      <div style={styles.applyPanel}>
                        <label style={styles.label}>Resume URL</label>
                        <input
                          style={styles.input}
                          name="resumeUrl"
                          value={applyForm.resumeUrl}
                          onChange={handleApplyFormChange}
                          placeholder="Paste your resume link"
                        />

                        <label style={styles.label}>Cover Letter</label>
                        <textarea
                          style={styles.textarea}
                          name="coverLetter"
                          value={applyForm.coverLetter}
                          onChange={handleApplyFormChange}
                          placeholder="Write a short introduction for this application"
                        />

                        <div style={styles.applyPanelActions}>
                          <button style={styles.primaryButton} onClick={applyForJob}>
                            Submit Application
                          </button>
                          <button style={styles.secondaryButton} onClick={cancelApply}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })
            )}
          </>
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
  searchCard: {
    background: "white",
    borderRadius: "16px",
    padding: "22px",
    marginBottom: "20px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
  },
  searchGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },
  searchActions: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
    flexWrap: "wrap",
  },
  jobCard: {
    background: "white",
    padding: "20px",
    marginTop: "15px",
    borderRadius: "14px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
  },
  jobHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  jobTitle: {
    marginTop: 0,
    marginBottom: "10px",
  },
  jobMeta: {
    margin: "4px 0",
    color: "#475569",
  },
  jobBadge: {
    background: "#eff6ff",
    color: "#1d4ed8",
    borderRadius: "12px",
    padding: "12px 14px",
    minWidth: "160px",
    display: "grid",
    gap: "4px",
  },
  jobDescription: {
    color: "#334155",
    lineHeight: 1.6,
    marginTop: "16px",
    marginBottom: "12px",
  },
  skillsLine: {
    margin: "10px 0 0",
    color: "#0f172a",
  },
  jobActions: {
    marginTop: "16px",
  },
  applyButton: {
    padding: "10px 14px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
  },
  primaryButton: {
    padding: "10px 14px",
    background: "#0f766e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
  },
  secondaryButton: {
    padding: "10px 14px",
    background: "#e2e8f0",
    color: "#0f172a",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
  },
  disabledButton: {
    padding: "10px 14px",
    background: "#cbd5e1",
    color: "#475569",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "not-allowed",
  },
  applyPanel: {
    marginTop: "18px",
    padding: "18px",
    borderRadius: "12px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
  },
  applyPanelActions: {
    display: "flex",
    gap: "12px",
    marginTop: "14px",
    flexWrap: "wrap",
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
