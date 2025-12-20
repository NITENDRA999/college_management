import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [showRegs, setShowRegs] = useState(false);

  const getUserDetails = (userId) => {
    return users.find((u) => u.id === userId);
  };

  // Load event
  const loadEvent = async () => {
    try {
      const res = await axios.get(`/events/${id}`);
      setEvent(res.data);
    } catch (err) {
      console.log("Error loading event", err);
    }
  };

  // Load users
  const loadUsers = async () => {
    try {
      const res = await axios.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.log("Error loading users", err);
    }
  };

  // Load registrations
  const loadRegistrations = async () => {
    try {
      const res = await axios.get(`/register/event/${id}`);
      setRegistrations(res.data);
    } catch (err) {
      console.log("Error loading regs", err);
    }
  };

  useEffect(() => {
    loadEvent();
    loadUsers();
    loadRegistrations();
  }, [id]);

  if (!event)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>
    );

  // Register
  const registerEvent = async () => {
    if (!selectedUser) return alert("Please select a user!");

    try {
      const res = await axios.post(`/register/${event.id}/${selectedUser}`);
      alert(res.data);
      loadRegistrations();
    } catch (err) {
      alert("Failed to register");
    }
  };

  // Delete event
  const deleteEvent = async () => {
    if (!window.confirm("Delete this event permanently?")) return;

    try {
      await axios.delete(`/events/${event.id}`);
      alert("Event deleted");
      navigate("/");
    } catch {
      alert("Failed to delete event");
    }
  };

  // Cancel registration
  const cancelRegistration = async (userId) => {
    try {
      const res = await axios.delete(`/register/${event.id}/${userId}`);
      alert(res.data);
      loadRegistrations();
    } catch {
      alert("Error canceling registration");
    }
  };

  return (
    
    <div style={{ background: "#f5f6fa", minHeight: "100vh" }}>
     

      <div style={{ maxWidth: "900px", margin: "30px auto", padding: "20px" }}>
        
        {/* MAIN CARD */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "14px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ color: "#1976d2", marginBottom: "15px" }}>
            {event.title}
          </h2>

          <img
            src={event.imageUrl}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              borderRadius: "12px",
              marginBottom: "20px",
              color: "black"
            }}
            alt="Event"
          />

          <p><strong>Description:</strong> {event.description}</p>
          <p>📍 <strong>Venue:</strong> {event.venue}</p>
          <p>🗂 <strong>Category:</strong> {event.category}</p>
          <p>⏳ <strong>Start:</strong> {event.startTime}</p>
          <p>⏳ <strong>End:</strong> {event.endTime}</p>
          <p>👥 <strong>Capacity:</strong> {event.capacity}</p>

          {/* ACTION SECTION */}
          <div style={{ marginTop: "25px" }}>
            <label style={{ fontWeight: "600" }}>Select User:</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              style={selectBox}
            >
              <option value="">-- Choose User --</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>

            <button onClick={registerEvent} style={{ ...btn, background: "green" }}>
              Register User
            </button>

            <button
              onClick={() => setShowRegs(!showRegs)}
              style={{ ...btn, background: "#444" }}
            >
              {showRegs ? "Hide Registrations" : "View Registrations"}
            </button>

            <button
              onClick={deleteEvent}
              style={{ ...btn, background: "crimson" }}
            >
              Delete Event
            </button>

            <Link to={`/update-event/${event.id}`}>
              <button style={{ ...btn, background: "orange" }}>Edit Event</button>
            </Link>
          </div>
        </div>

        {/* REGISTRATIONS TABLE */}
        {showRegs && (
          <div
            style={{
              marginTop: "30px",
              background: "white",
              padding: "20px",
              borderRadius: "14px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ marginBottom: "15px", color: "#1976d2" }}>
              Registered Users
            </h3>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#1976d2", color: "white" }}>
                  <th style={th}>Name</th>
                  <th style={th}>Email</th>
                  <th style={th}>Phone</th>
                  <th style={th}>Registered At</th>
                  <th style={th}>Action</th>
                </tr>
              </thead>

              <tbody>
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                      No registrations yet.
                    </td>
                  </tr>
                ) : (
                  registrations.map((r) => (
                    <tr key={r.id} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={td}>{getUserDetails(r.userId)?.name}</td>
                      <td style={td}>{getUserDetails(r.userId)?.email}</td>
                      <td style={td}>{getUserDetails(r.userId)?.phone}</td>
                      <td style={td}>{r.registeredAt}</td>
                      <td style={td}>
                        <button
                          onClick={() => cancelRegistration(r.userId)}
                          style={cancelBtn}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
const p ={
  color: "black"
};
/* STYLES */
const selectBox = {
  width: "100%",
  padding: "10px",
  marginTop: "8px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const btn = {
  padding: "10px 14px",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginRight: "10px",
  marginTop: "10px",
  fontWeight: "600",
};

const cancelBtn = {
  padding: "6px 12px",
  background: "crimson",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const th = {
  padding: "12px",
  fontWeight: "700",
  textAlign: "left",
  color: "black"
};

const td = {
  padding: "12px",
};
