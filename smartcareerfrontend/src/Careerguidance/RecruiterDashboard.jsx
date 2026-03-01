function RecruiterDashboard() {
  return (
    <div style={styles.container}>
      <h1>🏢 Recruiter Dashboard</h1>
      <p>Manage job postings and candidates</p>
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
    background: "linear-gradient(to right, #203a43, #2c5364)",
    color: "white"
  }
};

export default RecruiterDashboard;