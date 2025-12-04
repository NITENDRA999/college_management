import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRegistrations: 0,
    upcomingEvents: 0
  });

  const loadStats = async () => {
    try {
      const res = await axios.get("/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.log("Error loading dashboard", err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20, textAlign: "center" }}>
        <h1>Dashboard</h1>
        <p style={{ color: "gray" }}>Event Management System Overview</p>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 30,
          marginTop: 40,
          flexWrap: "wrap"
        }}>
          
          {/* CARD 1 */}
          <div style={cardStyle}>
            <h2>{stats.totalEvents}</h2>
            <p>Total Events</p>
          </div>

          {/* CARD 2 */}
          <div style={cardStyle}>
            <h2>{stats.totalRegistrations}</h2>
            <p>Total Registrations</p>
          </div>

          {/* CARD 3 */}
          <div style={cardStyle}>
            <h2>{stats.upcomingEvents}</h2>
            <p>Upcoming Events</p>
          </div>

        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  width: 200,
  padding: 20,
  borderRadius: 10,
  background: "#fafafa",
  border: "1px solid #ccc",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
};
