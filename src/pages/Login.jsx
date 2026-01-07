import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Veteran");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password, role });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      if (res.data.role === "Veteran") navigate("/veteran-dashboard");
      else navigate("/organization-dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "500px", borderRadius: "12px", backgroundColor: "#ffffff" }}>
        <h3 className="text-center mb-4 text-primary fw-bold">Login</h3>
        <form onSubmit={handleLogin}>
          <input className="form-control mb-3 rounded-pill" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="form-control mb-3 rounded-pill" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <select className="form-select mb-3 rounded-pill" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Veteran">Veteran</option>
            <option value="Organization">Organization</option>
          </select>
          <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: "#4da6ff" }}>Login</button>
        </form>
      </div>
    </div>
  );
}
