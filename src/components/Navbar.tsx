import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <a className="navbar-brand" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <div className="navbar-logo">🎓</div>
        <span className="navbar-title">Student AI Tools</span>
      </a>
      <div className="navbar-nav">
        <a className={isActive("/")} onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          Home
        </a>
        <a className={isActive("/grammar")} onClick={() => navigate("/grammar")} style={{ cursor: "pointer" }}>
          Grammar
        </a>
        <a className={isActive("/math")} onClick={() => navigate("/math")} style={{ cursor: "pointer" }}>
          Math
        </a>
        <a className={isActive("/essay")} onClick={() => navigate("/essay")} style={{ cursor: "pointer" }}>
          Essay
        </a>
        <a className={isActive("/settings")} onClick={() => navigate("/settings")} style={{ cursor: "pointer" }}>
          ⚙️ Settings
        </a>
      </div>
    </nav>
  );
}
