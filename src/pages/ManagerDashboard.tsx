import React from "react";
import { useNavigate } from "react-router-dom";

const ManagerDashboard: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="container d-flex flex-column align-items-center justify-content-top bg-light">
      <h1 className="text-center">Manager Dashboard</h1>
      <p className="text-muted text-center">
        Welcome, Manager! You can approve or deny tickets here.
      </p>

      <button className="btn btn-primary m-3" onClick={() => navigate("/past-tickets")}>
          View Past Tickets
        </button>
        <button className="btn btn-warning m-3" onClick={() => navigate("/process-tickets")}>
          Process Tickets
        </button>
    </div>
  );
};

export default ManagerDashboard;
