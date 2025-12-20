import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // 👌 FINAL FIXED CARD STYLE
  const card = {
    background: "#dfe4e9c5", // SOFT GREY (visible & clean)
    width: "300px",        // FIXED width
    height: "380px",       // FIXED height (all equal cards)
    padding: "15px",
    borderRadius: "14px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
    transition: "0.3s",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  return (
    
    <div
      style={{
        padding: "30px",
        maxWidth: "100%",
        margin: "0 auto",
        background: "white",
        minHeight: "100vh",
      }}
    >
      {/* TITLE */}
      <h2
        style={{
          textAlign: "center",
          fontSize: "34px",
          fontWeight: "700",
          color: "#d21960ff",
          marginBottom: "35px",
        }}
      >
        All Events
      </h2>

      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "25px",
            justifyContent: "center",
          }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              style={card}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0px)")
              }
            >
              {/* IMAGE */}
              <img
                src={event.imageUrl || "https://picsum.photos/300"}
                alt="banner"
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              {/* TEXT AREA */}
              <div>
                <h3
                  style={{
                    margin: "12px 0 6px 0",
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#1976d2",
                  }}
                >
                  {event.title}
                </h3>

                {/* CATEGORY BADGE */}
                <span
                  style={{
                    background: "#1976d2",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    display: "inline-block",
                    marginBottom: "10px",
                  }}
                >
                  {event.category}
                </span>

                <p style={{ margin: 0, color: "#555", fontSize: "15px" }}>
                  📍 {event.venue}
                </p>
              </div>

              {/* BUTTON */}
              <Link to={`/event/${event.id}`}>
                <button
                  style={{
                    padding: "10px",
                    width: "100%",
                    background: "#1976d2",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    marginTop: "12px",
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#145ca1")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#1976d2")
                  }
                >
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
