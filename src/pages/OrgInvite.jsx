import { useState } from "react";
import API from "../services/api";

export default function OrgInvite() {
  const [eventId, setEventId] = useState("");
  const [veteranIds, setVeteranIds] = useState("");

  const handleInvite = async () => {
    const ids = veteranIds.split(",").map((id) => id.trim());
    const res = await API.post("/events/invite", { eventId, veteranIds: ids });
    alert(res.data.message);
  };

  return (
    <div className="container mt-3">
      <h4>Invite Veterans to Event (Hobby Filtered)</h4>
      <input
        className="form-control mb-2"
        placeholder="Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Veteran IDs (comma separated)"
        value={veteranIds}
        onChange={(e) => setVeteranIds(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleInvite}>
        Send Invites
      </button>
    </div>
  );
}
