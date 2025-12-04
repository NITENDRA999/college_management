import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import Navbar from "../components/Navbar";

export default function MyEvents() {
  const organizerId = 1; // static (later login se dynamic hoga)
  const [events, setEvents] = useState([]);

  const loadMyEvents = async () => {
    const res = await axios.get(`/events/organizer/${organizerId}`);
    setEvents(res.data);
  };

  useEffect(() => {
    loadMyEvents();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>My Managed Events</h2>

        {events.length === 0 && <p>No events created by you.</p>}

        {events.map((e) => (
          <div key={e.id} style={{
            border: "1px solid #ccc",
            padding: 10,
            borderRadius: 10,
            marginBottom: 10
          }}>
            <h3>{e.title}</h3>
            <p>{e.venue}</p>
            <p>Category: {e.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
