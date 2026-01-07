import { useState } from "react";
import API from "../services/api";

export default function LocationSearch() {
  const [city, setCity] = useState("");
  const [events, setEvents] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchByCity = async () => {
    if (!city.trim()) return alert("Please enter a city");

    try {
      setLoading(true);
      setSearched(true);

      const res = await API.get(`/events/city/${city}`);
      setEvents(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h4 className="mb-3 text-primary">Search Events by City</h4>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn btn-primary" onClick={searchByCity}>
            Search
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="alert alert-info">Searching events...</div>
        )}

        {/* No events found */}
        {searched && !loading && events.length === 0 && (
          <div className="alert alert-warning text-center">
            ❌ No events found in <b>{city}</b>
          </div>
        )}

        {/* Events found */}
        {events.map((event) => (
          <div key={event._id} className="card mb-2 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{event.title}</h5>
              <p className="card-text">{event.description}</p>
              <p className="mb-1">
                <b>City:</b> {event.city}
              </p>
              <p className="mb-1">
                <b>Type:</b> {event.type}
              </p>
              <p className="text-warning mb-0">
                ⭐ Stars: {event.stars || 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
