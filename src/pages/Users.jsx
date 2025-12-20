import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Users() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const res = await axios.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.log("Error loading users", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`/users/${id}`);
      alert("User deleted");
      loadUsers();
    } catch (err) {
      console.log(err);
      alert("Failed to delete user");
    }
  };

  return (
    
    <div style={{ background: "#f5f6fa", minHeight: "100vh" }}>
     

      <div
        style={{
          maxWidth: "1100px",
          margin: "40px auto",
          background: "white",
          padding: "25px",
          borderRadius: "14px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            alignItems: "center",
          }}
        >
          <h2 style={{ color: "#1976d2", fontWeight: "700" }}>Users</h2>

          <Link to="/create-user">
            <button style={btnPrimary}>+ Create User</button>
          </Link>
        </div>

        {/* USERS TABLE */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#1976d2",
                color: "white",
                textAlign: "left",
              }}
            >
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr
                  key={u.id}
                  style={{
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <td style={tdStyle}>{u.id}</td>
                  <td style={tdStyle}>{u.name}</td>
                  <td style={tdStyle}>{u.email}</td>
                  <td style={tdStyle}>{u.phone}</td>
                  <td style={tdStyle}>
                    <Link to={`/update-user/${u.id}`}>
                      <button style={btnWarning}>Edit</button>
                    </Link>

                    <button
                      onClick={() => deleteUser(u.id)}
                      style={btnDanger}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "12px 15px",
  fontSize: "14px",
  fontWeight: "700",
};

const tdStyle = {
  padding: "12px 15px",
  fontSize: "14px",
  color: "black"
};

const btnPrimary = {
  padding: "10px 16px",
  background: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const btnWarning = {
  padding: "6px 12px",
  background: "orange",
  color: "black",
  border: "none",
  borderRadius: "6px",
  marginRight: "6px",
  cursor: "pointer",
};

const btnDanger = {
  padding: "6px 12px",
  background: "#e53935",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
