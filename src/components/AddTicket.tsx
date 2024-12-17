import React, { useState } from 'react';
import apiClient from '../api/apiClient';
function AddTickets() {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Retrieve current user's information
      const username = localStorage.getItem("userName"); // Username saved during login
      console.log("THis should be username: ",username)
  
      if (!username) {
        setMessage("User is not logged in. Please log in again.");
        return;
      }
  
      // Prepare the payload
      const payload = {
        amount: parseFloat(formData.amount),
        description: formData.description,
        username: username, // Send the current user's username
      };
  
      console.log("Sending payload:", payload); // Debugging payload
  
      // Send POST request
      const response = await apiClient.post("/tickets/submit", payload);
  
      if (response.status === 201) {
        setMessage("Ticket added successfully!");
        setFormData({ amount: "", description: "" }); // Reset form
      } else {
        setMessage("Failed to add ticket.");
      }
    } catch (err) {
      console.error("Error adding ticket:", err);
      setMessage("An error occurred while adding the ticket.");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="card shadow-lg" style={{ width: '400px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Add New Ticket</h2>
          {message && (
            <p className={`text-center ${message.includes('success') ? 'text-success' : 'text-danger'}`}>
              {message}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter ticket amount"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter ticket description"
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Submit Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTickets;
