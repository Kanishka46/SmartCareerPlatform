import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, clearAuthSession, getStoredUser } from "../auth";

function AdminDashboard() {
  const user = getStoredUser();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  const logout = () => {
    clearAuthSession();
    window.location.href = "/login";
  };

  useEffect(() => {
    axios.get(`${API_BASE_URL}/admin/overview`)
      .then((res) => setOverview(res.data))
      .catch(() => setStatus("Could not load admin analytics right now."))
      .finally(() => setLoading(false));
  }, []);

  const stats = overview ? [
    { title: "Total Users", value: overview.totalUsers, note: "All registered platform accounts" },
    { title: "Active Jobs", value: overview.activeJobs, note: "Current job postings from recruiters" },
    { title: "Internships", value: overview.internships, note: "Internship opportunities on the platform" },
    { title: "Applications", value: overview.totalApplications, note: "Total applications submitted" },
  ] : [];

  const roleStats = overview ? [
    { label: "Students", value: overview.students },
    { label: "Job Seekers", value: overview.jobSeekers },
    { label: "Recruiters", value: overview.recruiters },
    { label: "Admins", value: overview.admins },
  ] : [];

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <div>
          <p style={styles.sidebarKicker}>Smart Career Platform</p>
          <h2 style={styles.brand}>Admin Command Center</h2>
          <p style={styles.muted}>Live control, analytics, and platform visibility.</p>
        </div>

        <div style={styles.userPanel}>
          <strong>{user?.name || "Admin"}</strong>
          <span>{user?.email || "admin@smartcareer.com"}</span>
        </div>

        <button style={styles.logoutButton} onClick={logout}>
          Logout
        </button>
      </aside>

      <main style={styles.main}>
        <header style={styles.hero}>
          <div>
            <p style={styles.kicker}>Administrator Dashboard</p>
            <h1 style={styles.title}>Dynamic platform overview</h1>
            <p style={styles.subtitle}>
              Monitor users, recruiter activity, jobs, internships, and application flow from one professional workspace.
            </p>
          </div>

          <div style={styles.heroBadge}>
            <span>Shortlisted</span>
            <strong>{overview?.shortlistedApplications ?? "--"}</strong>
            <small>Rejected: {overview?.rejectedApplications ?? "--"}</small>
          </div>
        </header>

        {loading ? <p>Loading dashboard...</p> : null}
        {status ? <p style={styles.status}>{status}</p> : null}

        {overview ? (
          <>
            <section style={styles.grid}>
              {stats.map((card) => (
                <article key={card.title} style={styles.card}>
                  <p style={styles.cardLabel}>{card.title}</p>
                  <h3 style={styles.cardValue}>{card.value}</h3>
                  <span style={styles.cardNote}>{card.note}</span>
                </article>
              ))}
            </section>

            <section style={styles.panelGrid}>
              <div style={styles.panel}>
                <h3 style={styles.panelTitle}>Role Distribution</h3>
                <div style={styles.roleGrid}>
                  {roleStats.map((item) => (
                    <div key={item.label} style={styles.roleCard}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.panel}>
                <h3 style={styles.panelTitle}>Recent Users</h3>
                <div style={styles.userList}>
                  {overview.recentUsers?.length ? overview.recentUsers.map((recentUser) => (
                    <div key={recentUser.id} style={styles.userRow}>
                      <div>
                        <strong>{recentUser.name}</strong>
                        <p style={styles.userEmail}>{recentUser.email}</p>
                      </div>
                      <span style={styles.rolePill}>{recentUser.role}</span>
                    </div>
                  )) : <p>No recent users found.</p>}
                </div>
              </div>
            </section>
          </>
        ) : null}
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "290px 1fr",
    background: "linear-gradient(135deg, #eef2ff 0%, #f8fafc 48%, #ecfeff 100%)",
  },
  sidebar: {
    padding: "30px",
    background: "linear-gradient(180deg, #111827 0%, #172554 100%)",
    color: "#f8fafc",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  sidebarKicker: {
    margin: 0,
    color: "#67e8f9",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontSize: "0.8rem",
  },
  brand: {
    margin: "10px 0 8px",
    fontSize: "2rem",
  },
  muted: {
    color: "#cbd5e1",
    lineHeight: 1.6,
  },
  userPanel: {
    padding: "18px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.08)",
    display: "grid",
    gap: "8px",
    backdropFilter: "blur(12px)",
  },
  logoutButton: {
    border: "none",
    borderRadius: "14px",
    padding: "14px 18px",
    background: "#ef4444",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
  main: {
    padding: "34px",
  },
  hero: {
    marginBottom: "24px",
    padding: "26px",
    borderRadius: "28px",
    background: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 52%, #0891b2 100%)",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    gap: "24px",
    alignItems: "flex-start",
    flexWrap: "wrap",
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.18)",
  },
  kicker: {
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontSize: "0.82rem",
    color: "#bfdbfe",
  },
  title: {
    margin: "10px 0 8px",
    fontSize: "2.35rem",
  },
  subtitle: {
    margin: 0,
    maxWidth: "62ch",
    color: "#dbeafe",
    lineHeight: 1.7,
  },
  heroBadge: {
    minWidth: "180px",
    padding: "18px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.12)",
    display: "grid",
    gap: "6px",
  },
  status: {
    color: "#b91c1c",
    fontWeight: 600,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
  },
  card: {
    padding: "24px",
    borderRadius: "24px",
    background: "rgba(255,255,255,0.84)",
    border: "1px solid rgba(148,163,184,0.18)",
    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
    backdropFilter: "blur(12px)",
  },
  cardLabel: {
    margin: 0,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontSize: "0.8rem",
  },
  cardValue: {
    margin: "14px 0 10px",
    fontSize: "2.25rem",
  },
  cardNote: {
    color: "#475569",
    lineHeight: 1.5,
  },
  panelGrid: {
    marginTop: "22px",
    display: "grid",
    gridTemplateColumns: "1.1fr 1fr",
    gap: "18px",
  },
  panel: {
    padding: "24px",
    borderRadius: "24px",
    background: "#ffffff",
    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
  },
  panelTitle: {
    marginTop: 0,
    marginBottom: "18px",
  },
  roleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "14px",
  },
  roleCard: {
    padding: "18px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #eff6ff, #ecfeff)",
    display: "grid",
    gap: "8px",
  },
  userList: {
    display: "grid",
    gap: "12px",
  },
  userRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: "1px solid #e2e8f0",
  },
  userEmail: {
    margin: "4px 0 0",
    color: "#64748b",
  },
  rolePill: {
    padding: "8px 12px",
    borderRadius: "999px",
    background: "#dbeafe",
    color: "#1d4ed8",
    fontWeight: 700,
    fontSize: "0.82rem",
  },
};

export default AdminDashboard;
