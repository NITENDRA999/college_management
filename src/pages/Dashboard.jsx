import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRegistrations: 0,
    upcomingEvents: 0,
  });

  const loadStats = async () => {
    try {
      const res = await axios.get("/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.log("Error loading dashboard:", err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const card = {
    width: 260,
    padding: "25px 20px",
    borderRadius: "14px",
    background: "#ffffff",
    border: "1px solid #e6e6e6",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
    color: "#222",
    textAlign: "center",
    transition: "0.3s",
  };

  return (
    
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#f7f8fa",
        padding: "40px 20px",
        boxSizing: "border-box",
        color: "#222",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "38px",
          fontWeight: "800",
          color: "#1976d2",
        }}
      >
        Dashboard
      </h1>

      <p
        style={{
          textAlign: "center",
          opacity: 0.7,
          marginTop: "-5px",
          marginBottom: "40px",
          fontSize: "16px",
        }}
      >
        Event Management System Overview
      </p>

      {/* Cards Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 30,
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        {/* CARD 1 */}
        <div
          style={card}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-6px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0px)")
          }
        >
          <h2 style={{ fontSize: "42px", margin: 0, color: "#1976d2" }}>
            {stats.totalEvents}
          </h2>
          <p style={{ opacity: 0.6, marginTop: 5 }}>Total Events</p>
        </div>

        {/* CARD 2 */}
        <div
          style={card}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-6px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0px)")
          }
        >
          <h2 style={{ fontSize: "42px", margin: 0, color: "#28a745" }}>
            {stats.totalRegistrations}
          </h2>
          <p style={{ opacity: 0.6, marginTop: 5 }}>Total Registrations</p>
        </div>

        {/* CARD 3 */}
        <div
          style={card}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-6px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0px)")
          }
        >
          <h2 style={{ fontSize: "42px", margin: 0, color: "#ff9800" }}>
            {stats.upcomingEvents}
          </h2>
          <p style={{ opacity: 0.6, marginTop: 5 }}>Upcoming Events</p>
        </div>
      </div>
    </div>
  );
}
