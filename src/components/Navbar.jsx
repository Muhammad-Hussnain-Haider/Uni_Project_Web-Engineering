import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{
        backgroundColor: "#f0f4f8",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        padding: "0.75rem 1.5rem",
      }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
          VeteranMeet
        </Link>

        <div className="d-flex align-items-center ms-auto">
          {!role && (
            <>
              <Link
                className="btn btn-outline-secondary me-2"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="btn btn-outline-primary me-3"
                to="/register"
              >
                Register
              </Link>
            </>
          )}

          {role && (
            <button
              className="btn btn-outline-danger me-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

          {role === "Veteran" && (
            <button
              className="btn btn-info"
              onClick={() => navigate("/veteran/location-search")}
            >
              Search Events by City
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
