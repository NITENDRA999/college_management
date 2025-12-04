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
  imageUrl: ""
});
<input
  type="text"
  name="imageUrl"
  placeholder="Image URL"
  onChange={handleChange}
  style={inputStyle}
/>


  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value
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
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2>Create New Event</h2>

      <input
        type="text"
        name="title"
        placeholder="Event Title"
        onChange={handleChange}
        style={inputStyle}
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="text"
        name="venue"
        placeholder="Venue"
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="number"
        name="capacity"
        placeholder="Capacity"
        onChange={handleChange}
        style={inputStyle}
      />

      <label>Start Time:</label>
      <input
        type="datetime-local"
        name="startTime"
        onChange={handleChange}
        style={inputStyle}
      />

      <label>End Time:</label>
      <input
        type="datetime-local"
        name="endTime"
        onChange={handleChange}
        style={inputStyle}
      />

      <button
        onClick={saveEvent}
        style={{
          padding: "10px 15px",
          background: "blue",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
          marginTop: 10,
        }}
      >
        Save Event
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};
