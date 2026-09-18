import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-pixora-dark text-white flex flex-col overflow-y-auto">
      <Outlet />
    </div>
  );
};

export default MainLayout;
