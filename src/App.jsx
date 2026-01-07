import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VeteranDashboard from "./pages/VeteranDashboard";
import OrganizationDashboard from "./pages/OrganizationDashboard";
import LocationSearch from "./pages/LocationSearch";
export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/veteran-dashboard" element={<VeteranDashboard />} />
          <Route
            path="/organization-dashboard"
            element={<OrganizationDashboard />}
          />
          <Route path="/veteran/location-search" element={<LocationSearch />} />
        </Routes>
      </div>
    </Router>
  );
}
