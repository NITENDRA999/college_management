import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosConfig";


export default function UpdateEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  const loadEvent = async () => {
    try {
      const res = await axios.get(`/events/${id}`);
      setEvent(res.data);
    } catch (err) {
      console.log("Error fetching event", err);
    }
  };

  useEffect(() => {
    loadEvent();
  }, [id]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const updateEvent = async () => {
    try {
      await axios.put(`/events/${id}`, event);
      alert("Event Updated Successfully!");
    } catch (err) {
      alert("Error updating event");
      console.log(err);
    }
  };

  if (!event)
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Loading Event...
      </h2>
    );

  return (
    <div style={{ background: "#f5f6fa", minHeight: "100vh" }}>
      

      <div
        style={{
          maxWidth: "600px",
          margin: "40px auto",
          background: "white",
          padding: "30px",
          borderRadius: "14px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#1976d2",
            fontWeight: "700",
          }}
        >
          Update Event
        </h2>

        {/* Event Title */}
        <label style={labelStyle}>Event Title</label>
        <input
          type="text"
          name="title"
          value={event.title}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Description */}
        <label style={labelStyle}>Description</label>
        <textarea
          name="description"
          value={event.description}
          onChange={handleChange}
          style={{ ...inputStyle, height: "100px" }}
        />

        {/* Venue */}
        <label style={labelStyle}>Venue</label>
        <input
          type="text"
          name="venue"
          value={event.venue}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Category */}
        <label style={labelStyle}>Category</label>
        <input
          type="text"
          name="category"
          value={event.category}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Image URL */}
        <label style={labelStyle}>Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={event.imageUrl}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Capacity */}
        <label style={labelStyle}>Capacity</label>
        <input
          type="number"
          name="capacity"
          value={event.capacity}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Start Time */}
        <label style={labelStyle}>Start Time</label>
        <input
          type="datetime-local"
          name="startTime"
          value={event.startTime}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* End Time */}
        <label style={labelStyle}>End Time</label>
        <input
          type="datetime-local"
          name="endTime"
          value={event.endTime}
          onChange={handleChange}
          style={inputStyle}
        />

        <button onClick={updateEvent} style={btnPrimary}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

const labelStyle = {
  fontWeight: "600",
  display: "block",
  marginBottom: "6px",
  fontSize: "14px",
  color: "#444",
  marginTop: "12px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
  outline: "none",
  background: "#fafafa",
  marginBottom: "10px",
};

const btnPrimary = {
  width: "100%",
  padding: "12px",
  background: "#1976d2",
  color: "white",
  border: "none",
  fontSize: "16px",
  fontWeight: "bold",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "20px",
};
