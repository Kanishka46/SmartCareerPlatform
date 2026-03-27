import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, clearAuthSession, getStoredUser } from "../auth";

function RecruiterDashboard() {
  const user = getStoredUser();
  const [activePage, setActivePage] = useState("dashboard");
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applications, setApplications] = useState([]);
  const [jobStatus, setJobStatus] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("");
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    employmentType: "FULL_TIME",
    salaryRange: "",
    requiredSkills: "",
    applicationLink: "",
    description: "",
  });

  const logout = () => {
    clearAuthSession();
    window.location.href = "/login";
  };

  const loadJobs = async () => {
    if (!user?.id) {
      return;
    }

    setLoadingJobs(true);

    try {
      const response = await axios.get(`${API_BASE_URL}/recruiter/jobs/${user.id}`);
      setJobs(response.data);

      if (!selectedJobId && response.data.length > 0) {
        setSelectedJobId(response.data[0].id);
      }
    } catch {
      setJobs([]);
      setJobStatus("Could not load recruiter jobs right now.");
    } finally {
      setLoadingJobs(false);
    }
  };

  const loadApplications = async (jobId) => {
    if (!jobId) {
      setApplications([]);
      return;
    }

    setLoadingApplications(true);
    setApplicationStatus("");

    try {
      const response = await axios.get(`${API_BASE_URL}/recruiter/job/${jobId}/applications`);
      setApplications(response.data);
    } catch {
      setApplications([]);
      setApplicationStatus("Could not load applications for this job.");
    } finally {
      setLoadingApplications(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [user?.id]);

  useEffect(() => {
    if (activePage === "applications" && selectedJobId) {
      loadApplications(selectedJobId);
    }
  }, [activePage, selectedJobId]);

  const handleJobChange = (event) => {
    const { name, value } = event.target;
    setJobForm((current) => ({ ...current, [name]: value }));
  };

  const postJob = async () => {
    if (!user?.id) {
      setJobStatus("Recruiter session not found. Please log in again.");
      return;
    }

    if (!jobForm.title.trim() || !jobForm.company.trim() || !jobForm.location.trim()) {
      setJobStatus("Please fill title, company, and location before posting.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/recruiter/jobs/${user.id}`, {
        ...jobForm,
      });

      setJobs((current) => [response.data, ...current]);
      setSelectedJobId(response.data.id);
      setJobStatus("Job posted successfully.");
      setJobForm({
        title: "",
        company: "",
        location: "",
        employmentType: "FULL_TIME",
        salaryRange: "",
        requiredSkills: "",
        applicationLink: "",
        description: "",
      });
    } catch {
      setJobStatus("Could not post job right now.");
    }
  };

  const updateApplicationState = async (applicationId, status) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/recruiter/application/${applicationId}/status`,
        null,
        { params: { status } }
      );

      setApplications((current) =>
        current.map((application) =>
          application.id === applicationId ? response.data : application
        )
      );
      setApplicationStatus(`Application updated to ${status}.`);
    } catch {
      setApplicationStatus("Could not update application status.");
    }
  };

  const selectedJob = jobs.find((job) => job.id === selectedJobId);

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div>
          <h2 style={styles.brand}>Recruiter Panel</h2>
          <div style={styles.menu} onClick={() => setActivePage("dashboard")}>
            Dashboard
          </div>
          <div style={styles.menu} onClick={() => setActivePage("post")}>
            Post Job
          </div>
          <div style={styles.menu} onClick={() => setActivePage("manage")}>
            Manage Jobs
          </div>
          <div style={styles.menu} onClick={() => setActivePage("applications")}>
            Applications
          </div>
        </div>

        <div style={styles.logout} onClick={logout}>
          Logout
        </div>
      </div>

      <div style={styles.main}>
        <div style={styles.header}>
          <div>
            <p style={styles.headerKicker}>Recruiter Workspace</p>
            <h1 style={styles.heading}>
              {activePage === "dashboard" && "Recruiter Dashboard"}
              {activePage === "post" && "Post a New Job"}
              {activePage === "manage" && "Manage Posted Jobs"}
              {activePage === "applications" && "Applications List"}
            </h1>
          </div>
          <div style={styles.userBadge}>
            <strong>{user?.name || "Recruiter"}</strong>
            <span>{user?.email || "No email available"}</span>
          </div>
        </div>

        {activePage === "dashboard" ? (
          <div style={styles.grid}>
            <div style={styles.metricCard}>
              <p style={styles.metricLabel}>Jobs Posted</p>
              <h3 style={styles.metricValue}>{jobs.length}</h3>
            </div>
            <div style={styles.metricCard}>
              <p style={styles.metricLabel}>Selected Job</p>
              <h3 style={styles.metricValue}>{selectedJob?.title || "None"}</h3>
            </div>
            <div style={styles.metricCard}>
              <p style={styles.metricLabel}>Applications Loaded</p>
              <h3 style={styles.metricValue}>{applications.length}</h3>
            </div>
          </div>
        ) : null}

        {activePage === "post" ? (
          <div style={styles.formCard}>
            <h2 style={styles.sectionTitle}>Create a job posting</h2>

            <div style={styles.formGrid}>
              <input name="title" value={jobForm.title} onChange={handleJobChange} style={styles.input} placeholder="Job Title" />
              <input name="company" value={jobForm.company} onChange={handleJobChange} style={styles.input} placeholder="Company Name" />
              <input name="location" value={jobForm.location} onChange={handleJobChange} style={styles.input} placeholder="Location" />
              <select name="employmentType" value={jobForm.employmentType} onChange={handleJobChange} style={styles.input}>
                <option value="FULL_TIME">Full Time</option>
                <option value="INTERN">Intern</option>
                <option value="CONTRACT">Contract</option>
              </select>
              <input name="salaryRange" value={jobForm.salaryRange} onChange={handleJobChange} style={styles.input} placeholder="Salary Range" />
              <input name="requiredSkills" value={jobForm.requiredSkills} onChange={handleJobChange} style={styles.input} placeholder="Required Skills" />
              <input name="applicationLink" value={jobForm.applicationLink} onChange={handleJobChange} style={styles.inputWide} placeholder="External Application Link" />
            </div>

            <textarea
              name="description"
              value={jobForm.description}
              onChange={handleJobChange}
              style={styles.textarea}
              placeholder="Job Description"
            />

            {jobStatus ? <p style={styles.status}>{jobStatus}</p> : null}

            <button style={styles.primaryButton} onClick={postJob}>
              Post Job
            </button>
          </div>
        ) : null}

        {activePage === "manage" ? (
          <div>
            {loadingJobs ? <p>Loading jobs...</p> : null}
            {jobs.length === 0 ? (
              <p>No jobs posted yet.</p>
            ) : (
              jobs.map((job) => (
                <div key={job.id} style={styles.jobCard}>
                  <div style={styles.jobHeader}>
                    <div>
                      <h3 style={styles.jobTitle}>{job.title}</h3>
                      <p style={styles.jobMeta}>Company: {job.company}</p>
                      <p style={styles.jobMeta}>Location: {job.location}</p>
                      <p style={styles.jobMeta}>Type: {job.employmentType}</p>
                      <p style={styles.jobMeta}>Salary: {job.salaryRange || "Not specified"}</p>
                    </div>
                    <button style={styles.secondaryButton} onClick={() => {
                      setSelectedJobId(job.id);
                      setActivePage("applications");
                    }}>
                      View Applications
                    </button>
                  </div>

                  <p style={styles.jobDescription}>{job.description || "No description available."}</p>
                  <p style={styles.skillsLine}><strong>Skills:</strong> {job.requiredSkills || "Not specified"}</p>
                  <p style={styles.skillsLine}>
                    <strong>Application Link:</strong> {job.applicationLink || "Internal apply flow"}
                  </p>
                </div>
              ))
            )}
          </div>
        ) : null}

        {activePage === "applications" ? (
          <div>
            <div style={styles.selectorCard}>
              <label style={styles.label}>Select Job</label>
              <select
                style={styles.input}
                value={selectedJobId || ""}
                onChange={(event) => setSelectedJobId(Number(event.target.value))}
              >
                <option value="">Choose a job</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title} - {job.company}
                  </option>
                ))}
              </select>
            </div>

            {applicationStatus ? <p style={styles.status}>{applicationStatus}</p> : null}
            {loadingApplications ? <p>Loading applications...</p> : null}

            {!selectedJobId ? (
              <p>Select a job to view applications.</p>
            ) : applications.length === 0 && !loadingApplications ? (
              <p>No applications found for this job yet.</p>
            ) : (
              applications.map((application) => (
                <div key={application.id} style={styles.applicationCard}>
                  <div style={styles.applicationHeader}>
                    <div>
                      <h3 style={styles.jobTitle}>{application.jobSeeker?.name || "Applicant"}</h3>
                      <p style={styles.jobMeta}>Email: {application.jobSeeker?.email || "N/A"}</p>
                      <p style={styles.jobMeta}>Status: {application.status}</p>
                    </div>
                    <div style={styles.applicationActions}>
                      <button style={styles.primaryButton} onClick={() => updateApplicationState(application.id, "SHORTLISTED")}>
                        Shortlist
                      </button>
                      <button style={styles.rejectButton} onClick={() => updateApplicationState(application.id, "REJECTED")}>
                        Reject
                      </button>
                    </div>
                  </div>

                  <p style={styles.jobDescription}>
                    <strong>Cover Letter:</strong> {application.coverLetter || "No cover letter submitted."}
                  </p>
                  <p style={styles.skillsLine}>
                    <strong>Resume Link:</strong> {application.resumeUrl || "No resume link provided"}
                  </p>
                </div>
              ))
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default RecruiterDashboard;

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
    overflow: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
  },
  metricCard: {
    background: "white",
    borderRadius: "16px",
    padding: "22px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
  },
  metricLabel: {
    margin: 0,
    color: "#64748b",
  },
  metricValue: {
    marginBottom: 0,
  },
  formCard: {
    background: "white",
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
  },
  sectionTitle: {
    marginTop: 0,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginBottom: "16px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
  },
  inputWide: {
    gridColumn: "1 / -1",
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
  },
  textarea: {
    width: "100%",
    minHeight: "140px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    resize: "vertical",
  },
  primaryButton: {
    marginTop: "16px",
    padding: "10px 14px",
    background: "#2563eb",
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
  rejectButton: {
    padding: "10px 14px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
  },
  status: {
    marginTop: "12px",
    color: "#0f766e",
    fontWeight: 600,
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
    alignItems: "flex-start",
    gap: "16px",
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
  jobDescription: {
    color: "#334155",
    lineHeight: 1.6,
    marginTop: "14px",
  },
  skillsLine: {
    marginTop: "10px",
    color: "#0f172a",
  },
  selectorCard: {
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
    marginBottom: "16px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: 600,
  },
  applicationCard: {
    background: "white",
    padding: "20px",
    marginTop: "15px",
    borderRadius: "14px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
  },
  applicationHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    flexWrap: "wrap",
  },
  applicationActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
};
