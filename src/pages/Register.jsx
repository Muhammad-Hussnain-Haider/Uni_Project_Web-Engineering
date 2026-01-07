import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Veteran");
  const [profession, setProfession] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password, role, profession });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      if (res.data.role === "Veteran") navigate("/veteran-dashboard");
      else navigate("/organization-dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "500px", borderRadius: "12px", backgroundColor: "#ffffff" }}>
        <h3 className="text-center mb-4 text-primary fw-bold">Create Account</h3>
        <form onSubmit={handleRegister}>
          <input className="form-control mb-3 rounded-pill" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="form-control mb-3 rounded-pill" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="form-control mb-3 rounded-pill" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <select className="form-select mb-3 rounded-pill" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Veteran">Veteran</option>
            <option value="Organization">Organization</option>
          </select>
          {role === "Veteran" && (
            <input className="form-control mb-3 rounded-pill" placeholder="Profession" value={profession} onChange={(e) => setProfession(e.target.value)} required />
          )}
          <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: "#4da6ff" }}>Register</button>
        </form>
      </div>
    </div>
  );
}
