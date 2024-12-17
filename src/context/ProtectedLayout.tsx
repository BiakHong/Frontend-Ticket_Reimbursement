import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar"; // Import the NavBar component

const ProtectedLayout: React.FC = () => {
  return (
    <div>
      Render the Navbar
      {/* <NavBar onNavigate={function (path: string): void {
        throw new Error("Function not implemented.");
      } } />
       */}
      {/* Render the nested child routes */}
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>

    </div>
  );
};

export default ProtectedLayout;
