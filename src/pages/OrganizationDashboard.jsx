import { useState } from "react";
import API from "../services/api";

export default function OrganizationDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await API.post("/events", { title, description, city, type });
      alert("Event created successfully!");
      setTitle(""); setDescription(""); setCity(""); setType("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-primary">Organization Dashboard</h3>
      <div className="card shadow-sm p-4" style={{ borderRadius: "12px", backgroundColor: "#ffffff" }}>
        <h5 className="fw-bold mb-3 text-secondary">Create New Event</h5>
        <form onSubmit={handleCreateEvent}>
          <input className="form-control mb-3 rounded-pill" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input className="form-control mb-3 rounded-pill" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <input className="form-control mb-3 rounded-pill" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
          <input className="form-control mb-3 rounded-pill" placeholder="Type (Hobby/Category)" value={type} onChange={(e) => setType(e.target.value)} required />
          <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: "#4da6ff" }}>Create Event</button>
        </form>
      </div>
    </div>
  );
}
