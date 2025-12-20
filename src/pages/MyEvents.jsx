import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { Link } from "react-router-dom";

export default function MyEvents() {
  const organizerId = 1; 
  const [events, setEvents] = useState([]);

  const loadMyEvents = async () => {
    try {
      const res = await axios.get(`/events/organizer/${organizerId}`);
      setEvents(res.data);
    } catch (err) {
      console.log("Error loading events", err);
    }
  };

  useEffect(() => {
    loadMyEvents();
  }, []);

  return (
    
    <div style={{ background: "#f5f6fa", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "30px auto", padding: "20px" }}>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#1976d2",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          My Managed Events
        </h2>

        {/* No Events Message */}
        {events.length === 0 && (
          <p
            style={{
              textAlign: "center",
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
            }}
          >
            You haven't created any events yet.
          </p>
        )}

        {/* Event Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "25px",
            marginTop: "20px",
          }}
        >
          {events.map((e) => (
            <div
              key={e.id}
              style={{
                background: "white",
                padding: "15px",
                borderRadius: "12px",
                boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
                transition: "0.3s",
              }}
            >
              <img
                src={e.imageUrl}
                alt="banner"
                style={{
                  width: "100%",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <h3 style={{ marginTop: "12px", color: "#1976d2" }}>
                {e.title}
              </h3>

              <p style={{ margin: "5px 0" }}>📍 {e.venue}</p>

              <span
                style={{
                  background: "#1976d2",
                  padding: "4px 10px",
                  color: "white",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              >
                {e.category}
              </span>

              <div style={{ marginTop: "12px" }}>
                <Link to={`/event/${e.id}`}>
                  <button
                    style={{
                      padding: "8px 12px",
                      background: "#1976d2",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
