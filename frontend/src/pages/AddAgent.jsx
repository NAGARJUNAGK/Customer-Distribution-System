import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddAgent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please login again.");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/agents/add",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message || "Agent created successfully!");
      setFormData({ name: "", email: "", mobile: "", password: "" });

      setTimeout(() => {
        navigate("/agents");
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating agent");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 mt-2 vw-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4 fw-bold">Add New Agent</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter agent name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter agent email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter mobile number"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add Agent
          </button>
        </form>

        {message && (
          <div
            className={`alert mt-3 text-center ${
              message.toLowerCase().includes("error")
                ? "alert-danger"
                : "alert-success"
            }`}
          >
            {message}
          </div>
        )}
        <br /><br />
      </div>
    </div>
  );
}

export default AddAgent;
