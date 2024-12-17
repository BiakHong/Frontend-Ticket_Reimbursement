import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import apiClient from "../api/apiClient";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth(); // Access AuthContext

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    try {
      const response = await apiClient.post("/users/login", { username, password });
      const userData = response.data;
      console.log(userData, " : is DATAAAAAAAAAAAAAAAAAAAAAA")
  
      if (userData.success && userData.token) {
        localStorage.setItem("authToken", userData.token);
        localStorage.setItem("userRole", userData.user.role);
        localStorage.setItem("userId", userData.user.userId);
        localStorage.setItem("userName", userData.user.username);
  
        console.log("Name:",userData.user.userName)
        console.log("DATA: ", userData.user.role)
        // Update auth context
        login();
  
        // Redirect based on role
        if (userData.user.role === "Manager") {
          navigate("/manager-dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError(userData.message || "Invalid username or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="card shadow-lg" style={{ width: "400px" }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Login</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
