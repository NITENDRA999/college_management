import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  // 🎨 Active link styles
  const linkStyle = (path) => ({
    color: pathname === path ? "#ffeb3b" : "white",
    textDecoration: "none",
    marginRight: 25,
    fontWeight: pathname === path ? "700" : "500",
    fontSize: "17px",
    transition: "0.25s",
  });

  return (
    <nav
      style={{
        padding: "15px 35px",
        background: "rgba(0, 0, 0, 0.55)", // glass background
        backdropFilter: "blur(6px)", // glass effect
        WebkitBackdropFilter: "blur(6px)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
      }}
    >
      {/* Logo */}
      <h2
        style={{
          margin: 0,
          fontSize: "26px",
          fontWeight: "800",
          letterSpacing: "1px",
        }}
      >
        EventPortal
      </h2>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/events" style={linkStyle("/events")}>Events</Link>
        <Link to="/create-event" style={linkStyle("/create-event")}>Create Event</Link>
        <Link to="/users" style={linkStyle("/users")}>Users</Link>
        <Link to="/dashboard" style={linkStyle("/dashboard")}>Dashboard</Link>
      </div>
    </nav>
  );
}
