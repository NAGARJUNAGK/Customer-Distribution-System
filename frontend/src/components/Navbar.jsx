// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left side: App name */}
        <Link className="navbar-brand fw-bold fs-4" to="/dashboard">
          Customer distribution system
        </Link>

        {/* Right side: Logout or Login */}
        <div>
          {isLoggedIn ? (
            <button
              className="btn btn-outline-light"
              onClick={() => {
                onLogout();
                navigate("/");
              }}
            >
              Logout
            </button>
          ) : (
            <Link className="btn btn-outline-light" to="/">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
