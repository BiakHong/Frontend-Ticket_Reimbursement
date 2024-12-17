import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { Ticket } from "../api/Ticket";

const ProcessTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchPendingTickets = async () => {
      try {
        const response = await apiClient.get("/tickets/pending-tickets");
        console.log("THIS IS RESPONSE: ", response)
        setTickets(response.data);
      } catch (err) {
        console.error("Error fetching pending tickets:", err);
      }
    };

    fetchPendingTickets();
  }, []);

  const updateTicketStatus = async (ticketId: number, status: "Approved" | "Denied") => {
    try {
      const response = await apiClient.put(`/tickets/${ticketId}/update-status`, { status });
      if (response.status === 200) {
        // Update the local state after successful update
        setTickets((prevTickets) =>
          prevTickets.filter((ticket) => ticket.ticketId !== ticketId)
        );
        console.log(`Ticket ${ticketId} marked as ${status}`);
      }
    } catch (err) {
      console.error(`Error updating ticket ${ticketId}:`, err);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Process Pending Tickets</h1>
      {tickets.length === 0 ? (
        <p className="text-center text-muted">No pending tickets available.</p>
      ) : (
        <div>
          {tickets.map((ticket) => (
            <div
              key={ticket.ticketId}
              className="card mb-3 shadow-sm"
              style={{ padding: "15px" }}
            >
              <p>
                <strong>Ticket ID:</strong> {ticket.ticketId}
              </p>
              <p>
                <strong>Amount:</strong> ${ticket.amount.toFixed(2)}
              </p>
              <p>
                <strong>Description:</strong> {ticket.description}
              </p>
              <p>
                <strong>Submitted By:</strong> {ticket.user?.username || "Unknown User"}
              </p>
              <p>
                <strong>Submission Date:</strong>{" "}
                {new Date(ticket.submittedAt).toLocaleString()}
              </p>

              {/* Approve and Deny Buttons */}
              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-success"
                  onClick={() => updateTicketStatus(ticket.ticketId, "Approved")}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => updateTicketStatus(ticket.ticketId, "Denied")}
                >
                  Deny
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProcessTickets;
