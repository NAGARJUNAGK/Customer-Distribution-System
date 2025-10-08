import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadCustomers() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a CSV file");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please login again.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/customers/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(res.data.message + ` (${res.data.total} customers uploaded)`);
      setTimeout(()=>{
        navigate("/customers");
      },1000)
    } catch (err) {
      setMessage(err.response?.data?.message || "Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
      <div className="container col-md-5">
        <div className="card shadow p-4">
          <h2 className="text-center text-dark fw-bold mb-4">Upload Customers</h2>

          <form onSubmit={handleUpload} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label fw-semibold">Choose CSV File</label>
              <input
                type="file"
                accept=".csv"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>

            <button className="btn btn-primary w-100" type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>

          {message && (
            <div
              className={`alert mt-4 ${
                message.toLowerCase().includes("fail")
                  ? "alert-danger"
                  : "alert-success"
              } text-center`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadCustomers;
