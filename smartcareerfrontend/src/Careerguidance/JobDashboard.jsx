function JobDashboard() {
  return (
    <div style={styles.container}>
      <h1>💼 Job Seeker Dashboard</h1>
      <p>Find jobs matching your skills</p>
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
    background: "linear-gradient(to right, #0f2027, #2c5364)",
    color: "white"
  }
};

export default JobDashboard;