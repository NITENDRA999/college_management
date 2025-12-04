import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosConfig";

export default function UpdateEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  // Fetch existing event details
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

  // Update inputs
  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  // Send update
  const updateEvent = async () => {
    try {
      await axios.put(`/events/${id}`, event);
      alert("Event Updated Successfully!");
    } catch (err) {
      alert("Error updating event");
      console.log(err);
    }
  };

  if (!event) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2>Update Event</h2>

      <input
        type="text"
        name="title"
        value={event.title}
        placeholder="Event Title"
        onChange={handleChange}
        style={inputStyle}
      />

      <textarea
        name="description"
        value={event.description}
        placeholder="Description"
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="text"
        name="venue"
        value={event.venue}
        placeholder="Venue"
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="text"
        name="category"
        value={event.category}
        placeholder="Category"
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="number"
        name="capacity"
        value={event.capacity}
        placeholder="Capacity"
        onChange={handleChange}
        style={inputStyle}
      />

      <label>Start Time:</label>
      <input
        type="datetime-local"
        name="startTime"
        value={event.startTime}
        onChange={handleChange}
        style={inputStyle}
      />

      <label>End Time:</label>
      <input
        type="datetime-local"
        name="endTime"
        value={event.endTime}
        onChange={handleChange}
        style={inputStyle}
      />

      <button
        onClick={updateEvent}
        style={{
          padding: "10px 15px",
          background: "orange",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
          marginTop: 10,
        }}
      >
        Save Changes
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
