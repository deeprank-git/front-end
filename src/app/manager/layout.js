"use client";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { NotificationProvider } from "../../components/NotificationContext";

const ManagerLayout = ({ children }) => {
  return (
    <NotificationProvider>
      <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 min-w-0">{children}</main>
        </div>
      </div>
    </NotificationProvider>
  );
};

export default ManagerLayout;
