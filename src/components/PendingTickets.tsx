import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import { Ticket } from '../api/Ticket';
import { User } from '../api/User';

function PendingTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await apiClient.get('/tickets/pending-tickets');
        setTickets(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('Failed to fetch tickets:', err);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Pending Tickets</h1>
      {tickets.length === 0 ? (
        <p style={{ color: 'gray' }}>No tickets found.</p>
      ) : (
        <div style={{ marginTop: '20px' }}>
          {tickets.map((ticket) => (
            <div
              key={ticket.ticketId}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '10px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
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
                <strong>Status:</strong>{' '}
                <span
                  style={{
                    color: ticket.status === 'Pending' ? 'orange' : 'green',
                    fontWeight: 'bold',
                  }}
                >
                  {ticket.status}
                </span>
              </p>
              <p>
                <strong>Submission Date:</strong>{' '}
                {new Date(ticket.submittedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingTickets;
