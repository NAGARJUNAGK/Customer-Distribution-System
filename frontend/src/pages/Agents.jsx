import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Agents() {
  const [agents, setAgents] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login again");
        navigate("/login");
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/api/agents", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAgents(res.data);
      } catch (err) {
        setError("Failed to fetch agents. Please login again.");
      }
    };
    fetchAgents();
  }, [navigate]);

  // Delete agent
  const handleDelete = async (agentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this agent?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/agents/${agentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update UI after deletion
      setAgents((prevAgents) => prevAgents.filter((agent) => agent._id !== agentId));
      alert("Agent deleted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting agent");
    }
  };

  return (
    <div className="d-flex vw-100 justify-content-center mt-5">
      <div className="container mt-5 col-md-6">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Agents List</h2>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/add-agent")}
          >
            + Add Agent
          </button>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card shadow-sm">
          <div className="card-body">
            {agents.length > 0 ? (
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent, index) => (
                    <tr key={agent._id}>
                      <td>{index + 1}</td>
                      <td>{agent.name}</td>
                      <td>{agent.email}</td>
                      <td>{agent.mobile}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(agent._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-muted mb-0">
                No agents found. Add one to get started.
              </p>
            )}
          </div>
          <div className="d-flex justify-content-end mb-3 pe-4">
            <Link to="/dashboard" className="text-decoration-none">
              Dashboard
            </Link>
          </div>
        </div>
        <br /><br />
      </div>
    </div>
  );
}

export default Agents;
