import React from "react";

const Login = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f2f2f2",
  };

  const boxStyle = {
    width: "300px",
    padding: "30px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px gray",
    textAlign: "center",
  };

  const inputStyle = {
    width: "90%",
    padding: "10px",
    margin: "10px 0",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Enter Email" style={inputStyle} required />
          <input type="password" placeholder="Enter Password" style={inputStyle} required />
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;