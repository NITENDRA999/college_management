import { useState } from "react";
import axios from "../api/axiosConfig";

export default function CreateEvent() {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    venue: "",
    category: "",
    capacity: "",
    startTime: "",
    endTime: "",
    organizerId: 1,
    imageUrl: "",
  });

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const saveEvent = async () => {
    try {
      await axios.post("/events", event);
      alert("Event Created Successfully!");
    } catch (err) {
      alert("Error creating event");
      console.log(err);
    }
  };

  return (
    
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f6fa",
        display: "flex",
        justifyContent: "center",
        paddingTop: 40,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          width: "520px",
          borderRadius: "14px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#1976d2",
            marginBottom: "20px",
          }}
        >
          Create New Event
        </h2>

        {/* INPUTS */}
        <label style={labelStyle}>Event Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter event title"
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Description</label>
        <textarea
          name="description"
          placeholder="Write event description..."
          onChange={handleChange}
          style={{ ...inputStyle, height: "100px" }}
        />

        <label style={labelStyle}>Venue</label>
        <input
          type="text"
          name="venue"
          placeholder="e.g. Main Auditorium"
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Category</label>
        <input
          type="text"
          name="category"
          placeholder="e.g. Cultural"
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Banner Image URL</label>
        <input
          type="text"
          name="imageUrl"
          placeholder="Paste image link here"
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Capacity</label>
        <input
          type="number"
          name="capacity"
          placeholder="e.g. 150"
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Start Time</label>
        <input
          type="datetime-local"
          name="startTime"
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>End Time</label>
        <input
          type="datetime-local"
          name="endTime"
          onChange={handleChange}
          style={inputStyle}
        />

        {/* BUTTON */}
        <button
          onClick={saveEvent}
          style={buttonStyle}
        >
          Save Event
        </button>
      </div>
    </div>
  );
}

const labelStyle = {
  fontWeight: "600",
  marginTop: "12px",
  marginBottom: "6px",
  display: "block",
  fontSize: "14px",
  color: "#444",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
  outline: "none",
  marginBottom: "10px",
  background: "#fafafa",
  color: "black"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "20px",
  background: "#1976d2",
  color: "white",
  border: "none",
  fontSize: "16px",
  fontWeight: "bold",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.3s",
};
