import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  // Load all events
  const loadEvent = async () => {
  setLoading(true);
  const res = await axios.get(`/events/${id}`);
  setEvent(res.data);
  setLoading(false);
};


  useEffect(() => {
    loadEvents();
  }, []);

  // SEARCH
  const searchEvent = async () => {
    if (keyword.trim() === "") {
      loadEvents();
      return;
    }

    try {
      const res = await axios.get(`/events/search/${keyword}`);
      setEvents(res.data);
    } catch (err) {
      console.log("Search error", err);
    }
  };

  // FILTER
  const filterCategory = async (cat) => {
    setCategory(cat);

    if (cat === "") {
      loadEvents();
      return;
    }

    try {
      const res = await axios.get(`/events/category/${cat}`);
      setEvents(res.data);
    } catch (err) {
      console.log("Filter error", err);
    }
  };

  // DELETE EVENT
  const deleteEvent = async (id) => {
    const ok = window.confirm("Are you sure?");
    if (!ok) return;

    try {
      await axios.delete(`/events/${id}`);
      alert("Event deleted");
      loadEvents();
    } catch (err) {
      alert("Delete error");
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: 20 }}>

        <h2 style={{ textAlign: "center" }}>All Events</h2>

        {/* SEARCH BAR */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
          <input
            type="text"
            placeholder="Search events..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{
              padding: "10px",
              width: "60%",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={searchEvent}
            style={{
              padding: "10px 15px",
              marginLeft: 10,
              background: "black",
              color: "white",
              borderRadius: 6,
              cursor: "pointer"
            }}
          >
            Search
          </button>
        </div>

        {/* CATEGORY FILTER */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <select
            value={category}
            onChange={(e) => filterCategory(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          >
            <option value="">All Categories</option>
            <option value="Cultural">Cultural</option>
            <option value="Technical">Technical</option>
            <option value="Sports">Sports</option>
            <option value="Workshop">Workshop</option>
          </select>
        </div>

        {/* EVENTS GRID */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              style={{
                width: 260,
                padding: 15,
                border: "1px solid #ccc",
                borderRadius: 10,
                background: "#fafafa",
              }}
            >
              <h3>{event.title}</h3>
              <p>📍 {event.venue}</p>
              <p>🗂 {event.category}</p>

              <Link to={`/event/${event.id}`}>
                <button style={btnPrimary}>View</button>
              </Link>

              <Link to={`/update-event/${event.id}`}>
                <button style={btnWarning}>Edit</button>
              </Link>

              <button
                onClick={() => deleteEvent(event.id)}
                style={btnDanger}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const btnPrimary = {
  padding: "8px 10px",
  background: "#333",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  marginTop: 10,
  marginRight: 5,
};

const btnWarning = {
  padding: "8px 10px",
  background: "orange",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  marginTop: 10,
  marginRight: 5,
};

const btnDanger = {
  padding: "8px 10px",
  background: "crimson",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  marginTop: 10,
};
const [loading, setLoading] = useState(true);
