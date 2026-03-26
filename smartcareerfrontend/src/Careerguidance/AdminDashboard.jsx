import { clearAuthSession, getStoredUser } from "../auth";

function AdminDashboard() {
  const user = getStoredUser();

  const logout = () => {
    clearAuthSession();
    window.location.href = "/login";
  };

  const cards = [
    { title: "Total Users", value: "1,248", note: "Students, job seekers, recruiters" },
    { title: "Active Recruiters", value: "86", note: "Posting internships and jobs" },
    { title: "Applications", value: "3,542", note: "Tracked across the platform" },
    { title: "AI Insights", value: "92%", note: "Resume analysis completion rate" },
  ];

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <div>
          <h2 style={styles.brand}>SmartCareer Admin</h2>
          <p style={styles.muted}>System control center</p>
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
        <header style={styles.header}>
          <div>
            <p style={styles.kicker}>Administrator Dashboard</p>
            <h1 style={styles.title}>Platform analytics and control</h1>
          </div>
        </header>

        <section style={styles.grid}>
          {cards.map((card) => (
            <article key={card.title} style={styles.card}>
              <p style={styles.cardLabel}>{card.title}</p>
              <h3 style={styles.cardValue}>{card.value}</h3>
              <span style={styles.cardNote}>{card.note}</span>
            </article>
          ))}
        </section>

        <section style={styles.panelRow}>
          <div style={styles.panel}>
            <h3>User Management</h3>
            <p>Manage student, job seeker, recruiter, and admin access across the platform.</p>
          </div>
          <div style={styles.panel}>
            <h3>Activity Monitoring</h3>
            <p>Track registrations, applications, and recruiter postings from one overview panel.</p>
          </div>
          <div style={styles.panel}>
            <h3>Reports</h3>
            <p>Review analytics, trend summaries, and AI adoption insights for the entire system.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    background: "#f8fafc",
  },
  sidebar: {
    padding: "28px",
    background: "#0f172a",
    color: "#f8fafc",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  brand: {
    margin: 0,
  },
  muted: {
    color: "#94a3b8",
  },
  userPanel: {
    marginTop: "28px",
    padding: "18px",
    borderRadius: "18px",
    background: "rgba(148, 163, 184, 0.12)",
    display: "grid",
    gap: "8px",
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
    padding: "36px",
  },
  header: {
    marginBottom: "24px",
  },
  kicker: {
    margin: 0,
    color: "#0f766e",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontSize: "0.85rem",
    fontWeight: 700,
  },
  title: {
    margin: "8px 0 0",
    fontSize: "2.2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "18px",
  },
  card: {
    padding: "22px",
    borderRadius: "22px",
    background: "#fff",
    boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
  },
  cardLabel: {
    margin: 0,
    color: "#64748b",
    fontSize: "0.9rem",
  },
  cardValue: {
    margin: "10px 0",
    fontSize: "2rem",
  },
  cardNote: {
    color: "#475569",
  },
  panelRow: {
    marginTop: "24px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px",
  },
  panel: {
    padding: "24px",
    borderRadius: "22px",
    background: "linear-gradient(135deg, #fff7ed, #ffedd5)",
  },
};

export default AdminDashboard;
