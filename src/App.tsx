import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import PastTickets from "./pages/PastTickets";
import AddTicket from "./components/AddTicket";
import PendingTickets from "./components/PendingTickets";
import ProtectedRoute from "./context/ProtectedRoute";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/AuthContext";
import ManagerDashboard from "./pages/ManagerDashboard";
import ProcessTickets from "./components/ProcessTickets";

const App: React.FC = () => {
  return (
    <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/process-tickets" element={<ProcessTickets />} />
            <Route path="/past-tickets" element={<PastTickets />} />
            <Route path="/pending-tickets" element={<PendingTickets />} />
            <Route path="/add-ticket" element={<AddTicket />} />
            <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          </Route>
          <Route path="*" element={<LoginPage />} />
        </Routes>
    </AuthProvider>
  );
};

export default App;
