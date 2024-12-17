import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Home() {
   const navigate = useNavigate();
  return (
    <div className="container d-flex flex-column align-items-center justify-content-top vh-100 bg-light">
      {/* Welcome Section */}
      <div className="card shadow-lg text-center mb-4" style={{ maxWidth: '700px' }}>
        <div className="card-body bg-primary text-white rounded-top">
          <h1 className="card-title fw-bold">Welcome to the Ticket Reimbursement System!</h1>
        </div>
      </div>
      <button className="btn btn-primary m-3" onClick={() => navigate("/past-tickets")}>
          Past Tickets
        </button>
        <button className="btn btn-warning m-3" onClick={() => navigate("/pending-tickets")}>
          Pending Tickets
        </button>
        <button className="btn btn-info m-3" onClick={() => navigate("/add-ticket")}>
          Add Ticket
        </button>
    </div>
  );
}
