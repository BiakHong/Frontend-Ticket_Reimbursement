import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleHomeNavigation = () => {
    const userRole = localStorage.getItem("userRole"); // Retrieve the user's role
    if (userRole === "Manager") {
      navigate("/manager-dashboard");
    } else {
      navigate("/");
    }
  };

  const handleSignOut = () => {
    logout(); // Clear authentication state
    localStorage.removeItem("authToken"); // Clear the auth token
    localStorage.removeItem("userRole"); // Clear the user role
    localStorage.removeItem("userId");   // Clear the user ID
    navigate("/login"); // Redirect to Login page
  };

  return (
    <nav className="navbar navbar-light bg-light">
      {isAuthenticated && (
      <div className="container-fluid">
        {/* Home Button: Redirect based on user role */}
       
        <button className="btn btn-link" onClick={handleHomeNavigation}>
          Home
        </button>

        {/* Show Sign Out button only when the user is authenticated */}
       
          <button className="btn btn-danger ms-auto" onClick={handleSignOut}>
            Sign Out
          </button>

      </div>
      )}
    </nav>
  );
};

export default NavBar;
