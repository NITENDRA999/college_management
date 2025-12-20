import { useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const saveUser = async () => {
    try {
      await axios.post("/users", user);
      alert("User Created Successfully!");
      navigate("/users");
    } catch (err) {
      alert("Error creating user");
      console.log(err);
    }
  };

  return (
    
    <div style={{ background: "#f5f6fa", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "500px",
          margin: "40px auto",
          background: "white",
          padding: "30px",
          borderRadius: "14px",
          boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#1976d2",
            fontWeight: "700",
          }}
        >
          Create User
        </h2>

        {/* NAME */}
        <label style={labelStyle}>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter full name"
          onChange={handleChange}
          style={inputStyle}
        />

        {/* EMAIL */}
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email address"
          onChange={handleChange}
          style={inputStyle}
        />

        {/* PHONE */}
        <label style={labelStyle}>Phone Number</label>
        <input
          type="text"
          name="phone"
          placeholder="Enter phone"
          onChange={handleChange}
          style={inputStyle}
        />

        {/* BUTTON */}
        <button onClick={saveUser} style={btnPrimary}>
          Save User
        </button>
      </div>
    </div>
  );
}

const labelStyle = {
  fontWeight: "600",
  display: "block",
  marginBottom: "6px",
  fontSize: "14px",
  color: "#444",
  marginTop: "12px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
  outline: "none",
  background: "#fafafa",
  marginBottom: "10px",
  color: "black"
};

const btnPrimary = {
  width: "100%",
  padding: "12px",
  background: "#1976d2",
  color: "white",
  border: "none",
  fontSize: "16px",
  fontWeight: "bold",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "20px",
};
