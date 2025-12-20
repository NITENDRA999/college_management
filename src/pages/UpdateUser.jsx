import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const loadUser = async () => {
    try {
      const res = await axios.get(`/users/${id}`);
      setUser(res.data);
    } catch (err) {
      console.log("Error loading user", err);
    }
  };

  useEffect(() => {
    loadUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const updateUser = async () => {
    try {
      await axios.put(`/users/${id}`, user);
      alert("User Updated Successfully!");
      navigate("/users");
    } catch (err) {
      alert("Error updating user");
      console.log(err);
    }
  };

  if (!user)
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Loading User...
      </h2>
    );

  return (
    <div style={{ background: "#f5f6fa", minHeight: "100vh" }}>
      
      <div
        style={{
          maxWidth: "500px",
          margin: "40px auto",
          background: "white",
          padding: "30px",
          borderRadius: "14px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
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
          Update User
        </h2>

        {/* NAME */}
        <label style={labelStyle}>Full Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          placeholder="Full Name"
          onChange={handleChange}
          style={inputStyle}
        />

        {/* EMAIL */}
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          placeholder="Email"
          onChange={handleChange}
          style={inputStyle}
        />

        {/* PHONE */}
        <label style={labelStyle}>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={user.phone}
          placeholder="Phone"
          onChange={handleChange}
          style={inputStyle}
        />

        {/* BUTTON */}
        <button onClick={updateUser} style={btnPrimary}>
          Save Changes
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
