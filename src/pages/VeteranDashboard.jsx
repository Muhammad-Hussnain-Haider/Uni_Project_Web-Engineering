import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function VeteranDashboard() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="container mt-3">
      <h4>Veteran Dashboard</h4>

      <h5>Upcoming Events</h5>
      {events.map((event) => (
        <div key={event._id} className="card mb-2">
          <div className="card-body">
            <h6>{event.title}</h6>
            <p>{event.description}</p>
            <p><b>City:</b> {event.city} | <b>Type:</b> {event.type}</p>
          </div>
        </div>
      ))}

    </div>
  );
}
