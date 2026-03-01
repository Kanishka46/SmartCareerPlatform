function StudentDashboard() {
  return (
    <div style={styles.container}>
      <h1>🎓 Student Dashboard</h1>
      <p>Welcome to AI Career Guidance Platform</p>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #1e3a8a, #2563eb)",
    color: "white"
  }
};

export default StudentDashboard;