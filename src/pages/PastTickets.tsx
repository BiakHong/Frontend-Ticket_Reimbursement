import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { Ticket } from "../api/Ticket";

const PastTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const userId = localStorage.getItem("userId"); // Current logged-in user's ID
  const userRole = localStorage.getItem("userRole"); // Current logged-in user's role

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await apiClient.get("/tickets/past-tickets");
        const allTickets = response.data;

        // Check user role to decide the filtering logic
        if (userRole === "Manager") {
          // Managers see all pending tickets
          const pendingTickets = allTickets.filter((ticket: Ticket) => ticket.status !== "Pending");
          setTickets(pendingTickets);
        } else {
          // Employees see only their tickets
          const userTickets = allTickets.filter(
            (ticket: Ticket) => ticket.user.userId.toString() === userId
          );
          setTickets(userTickets);
        }
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
      }
    };

    fetchTickets();
  }, [userId, userRole]);

  return (
    <div className="container mt-4">
      <h1 className="text-center">
        {userRole === "Manager" ? "Pending Tickets" : "Your Past Tickets"}
      </h1>
      {tickets.length === 0 ? (
        <p className="text-center text-muted">No tickets found.</p>
      ) : (
        tickets.map((ticket) => (
          <div key={ticket.ticketId} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Ticket ID: {ticket.ticketId}</h5>
              <p className="card-text">Amount: ${ticket.amount.toFixed(2)}</p>
              <p className="card-text">Description: {ticket.description}</p>
              <p className="card-text">
                Status:{" "}
                <span
                  style={{
                    color:
                      ticket.status === "Pending"
                        ? "orange"
                        : ticket.status === "Approved"
                        ? "green"
                        : "red",
                    fontWeight: "bold",
                  }}
                >
                  {ticket.status}
                </span>
              </p>
              <p className="card-text">
                Submitted At: {new Date(ticket.submittedAt).toLocaleString()}
              </p>
              <p className="card-text">
                Submitted By: {ticket.user.username}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PastTickets;
