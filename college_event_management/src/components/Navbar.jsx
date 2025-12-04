import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const linkStyle = (path) => ({
    color: pathname === path ? "#FFD700" : "white",
    textDecoration: "none",
    marginRight: 20,
    fontWeight: pathname === path ? "bold" : "normal",
    fontSize: pathname === path ? "18px" : "16px",
    transition: "0.3s"
  });

  return (
    <nav
      style={{
        padding: "15px 25px",
        background: "linear-gradient(90deg, #1f1f1f, #333)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 3px 6px rgba(0,0,0,0.2)"
      }}
    >

      <h2 style={{ margin: 0 }}>EventPortal</h2>

      <div>
        <Link to="/" style={linkStyle("/")}>Events</Link>
        <Link to="/create-event" style={linkStyle("/create-event")}>Create Event</Link>
        <Link to="/users" style={linkStyle("/users")}>Users</Link>
        <Link to="/dashboard" style={linkStyle("/dashboard")}>Dashboard</Link>
      </div>
    </nav>
  );
}
