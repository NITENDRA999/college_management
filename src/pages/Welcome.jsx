import { Link } from "react-router-dom";


export default function Welcome() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        padding: "20px",
        color: "white",
        boxSizing: "border-box",
      }}
    >
      {/* 🔥 Background Image + Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://lnct.ac.in/wp-content/uploads/2024/10/LNCT-Garba-Day-2-9.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.45)", // Dark overlay
          zIndex: -1,
        }}
      ></div>

      {/* ⭐ Main Content */}
      <div style={{ maxWidth: "650px" }}>
        <h1
          style={{
            fontSize: "50px",
            fontWeight: "800",
            marginBottom: "15px",
            lineHeight: "1.2",
          }}
        >
          Welcome to
          <br />
          <span style={{ color: "#ffeb3b" }}>
            College Event Manager
          </span>
        </h1>

        <p
          style={{
            fontSize: "20px",
            opacity: 0.9,
            marginBottom: "40px",
            lineHeight: "1.6",
            color: "white"
          }}
        >
          Manage college events, registrations, users, and analytics —
          all in one powerful and easy-to-use platform.
        </p>

        <Link to="/events">
          <button
            style={{
              padding: "15px 45px",
              fontSize: "20px",
              background: "#ffeb3b",
              color: "#222",
              border: "none",
              borderRadius: "30px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
              transition: "0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.08)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            Enter Application 🚀
          </button>
        </Link>
      </div>
    </div>
  );
}
