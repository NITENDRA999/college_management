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
      alert("User Updated!");
      navigate("/users");
    } catch (err) {
      console.log(err);
      alert("Error updating user");
    }
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
        <h2>Update User</h2>

        <input
          type="text"
          name="name"
          value={user.name}
          placeholder="Full Name"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          value={user.email}
          placeholder="Email"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="phone"
          value={user.phone}
          placeholder="Phone"
          onChange={handleChange}
          style={inputStyle}
        />

        <button onClick={updateUser} style={btnPrimary}>Save Changes</button>
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
  background: "orange",
  color: "#fff",
  border: "none",
  borderRadius: 5,
  cursor: "pointer",
};
