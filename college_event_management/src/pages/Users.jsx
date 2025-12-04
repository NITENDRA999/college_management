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
    const ok = window.confirm("Are you sure you want to delete this user?");
    if (!ok) return;

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
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>All Users</h2>

        <Link to="/create-user">
          <button style={btnPrimary}>Create User</button>
        </Link>

        <table border="1" cellPadding="10" style={{ width: "100%", marginTop: 20 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>No users found</td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
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

const btnPrimary = {
  padding: "8px 12px",
  background: "blue",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const btnWarning = {
  padding: "6px 10px",
  background: "orange",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  marginRight: 5,
  cursor: "pointer",
};

const btnDanger = {
  padding: "6px 10px",
  background: "crimson",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
