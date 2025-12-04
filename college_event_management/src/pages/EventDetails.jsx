import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";
import Navbar from "../components/Navbar";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const getUserDetails = (userId) => {
    return users.find((u) => u.id === userId);
  };
  <img
  src={event.imageUrl}
  style={{ width: "100%", height: 250, objectFit: "cover", borderRadius: 10 }}
  alt="Event Banner"
/>


  const [showRegs, setShowRegs] = useState(false);

  // Load event details
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
  }, [id]);

  if (!event) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  // Register
  const registerEvent = async () => {
    if (!selectedUser) {
      alert("Please select a user first!");
      return;
    }

    try {
      const res = await axios.post(`/register/${event.id}/${selectedUser}`);
      alert(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to register");
    }
  };

  // Delete
  const deleteEvent = async () => {
    const ok = window.confirm("Delete this event? This cannot be undone.");
    if (!ok) return;

    try {
      await axios.delete(`/events/${event.id}`);
      alert("Event deleted");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Failed to delete event");
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20, maxWidth: 700, margin: "auto" }}>
        <h2>{event.title}</h2>
        <p>
          <strong>Description:</strong> {event.description}
        </p>
        <p>📍 {event.venue}</p>
        <p>🗂️ {event.category}</p>
        <p>Start: {event.startTime}</p>
        <p>End: {event.endTime}</p>
        <p>Capacity: {event.capacity}</p>

        <div style={{ marginTop: 20 }}>
          <label>Select User: </label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">-- Choose User --</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: 12 }}>
          <button
            onClick={registerEvent}
            style={{ ...actionBtn, background: "green" }}
          >
            Register For Event
          </button>

          <button
            onClick={async () => {
              await loadRegistrations();
              setShowRegs(!showRegs);
            }}
            style={{ ...actionBtn, background: "#333", marginLeft: 8 }}
          >
            {showRegs ? "Hide Registrations" : "View Registrations"}
          </button>

          <button
            onClick={deleteEvent}
            style={{ ...actionBtn, background: "crimson", marginLeft: 8 }}
          >
            Delete Event
          </button>

          <LinkToEdit id={event.id} />
        </div>

        {showRegs && (
          <div style={{ marginTop: 20 }}>
            <h3>Registered Students</h3>
            <table border="1" cellPadding="10" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Registered At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      No registrations yet.
                    </td>
                  </tr>
                ) : (
                  registrations.map((r) => (
                    <tr key={r.id}>
                      <td>{getUserDetails(r.userId)?.name || "Unknown"}</td>
                      <td>{getUserDetails(r.userId)?.email || "Unknown"}</td>
                      <td>{getUserDetails(r.userId)?.phone || "-"}</td>
                      <td>{r.registeredAt}</td>

                      <td>
                        <button
                          onClick={() => cancelRegistration(r.userId)}
                          style={{
                            padding: "5px 10px",
                            background: "crimson",
                            color: "#fff",
                            border: "none",
                            borderRadius: 5,
                            cursor: "pointer",
                          }}
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

function LinkToEdit({ id }) {
  return (
    <a href={`/update-event/${id}`} style={{ marginLeft: 8 }}>
      <button style={{ ...actionBtn, background: "orange" }}>Edit Event</button>
    </a>
  );
}

const actionBtn = {
  padding: "8px 12px",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
const cancelRegistration = async (userId) => {
  try {
    const res = await axios.delete(`/register/${event.id}/${userId}`);
    alert(res.data);
    loadRegistrations(); // refresh table after cancel
  } catch (err) {
    console.log(err);
    alert("Error canceling registration");
  }
};
