function AdminDashboard() {
  return (
    <div style={styles.container}>
      <h1>🛠 Admin Dashboard</h1>
      <p>System control & analytics panel</p>
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
    background: "linear-gradient(to right, #000428, #004e92)",
    color: "white"
  }
};

export default AdminDashboard;