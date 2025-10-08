import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login again");
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/api/customers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomers(res.data);
      } catch (err) {
        setError("Failed to fetch customers.");
      }
    };

    fetchCustomers();
  }, []);

  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete all customers?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login again");
      return;
    }

    try {
      await axios.delete("http://localhost:5000/api/customers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("All customers deleted successfully!");
      setCustomers([]); // clear UI after deletion
    } catch (err) {
      setError("Failed to delete customers.");
    }
  };

  return (
    <div className="d-flex justify-content-center vw-100 mt-5">
      <div className="container mt-5 col-md-6">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="text-dark fw-bold me-6">Customers List</h2>
          <Link to="/upload-customers" className="btn btn-primary">
            + Upload Customers
          </Link>
          <button className="btn btn-danger" onClick={handleDeleteAll}>
              Delete All
          </button>
        </div>

        {/* Error Message */}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* Customer List */}
        <div className="card shadow p-4">
          {customers.length > 0 ? (
            <ul className="list-group">
              {customers.map((cust) => (
                <li
                  key={cust._id}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div>
                    <strong>{cust.firstName}</strong> — {cust.phone}
                    <br />
                    <small className="text-muted">{cust.notes}</small>
                  </div>
                  {cust.assignedAgent && (
                    <div className="text-end">
                      <strong>Agent:</strong> {cust.assignedAgent.name} <br />
                      <small>({cust.assignedAgent.email})</small>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted">No customers found.</p>
          )}
          <br /><br />
        </div>
      </div>
    </div>
  );
}

export default Customers;
