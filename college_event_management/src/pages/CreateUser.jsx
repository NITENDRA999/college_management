import { useState } from "react";
import axios from "../api/axiosConfig";
import Navbar from "../components/Navbar";
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
      [e.target.name]: e.target.value
    });
  };

  const saveUser = async () => {
    try {
      await axios.post("/users", user);
      alert("User Created!");
      navigate("/users");
    } catch (err) {
      alert("Error creating user");
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
        <h2>Create User</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          style={inputStyle}
        />

        <button onClick={saveUser} style={btnPrimary}>Save User</button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const btnPrimary = {
  padding: "10px 15px",
  background: "green",
  color: "#fff",
  border: "none",
  borderRadius: 5,
  cursor: "pointer",
};
