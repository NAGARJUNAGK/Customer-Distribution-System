import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-light">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h2>Dashboard</h2>
        <nav>
          <ul>
            <li><Link to="/agents">Manage Agents</Link></li>
            <li><Link to="/customers">Manage Customers</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Dashboard;
