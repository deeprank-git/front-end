"use client";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [sidebarOpen, setSidebarOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen, activeSection, setActiveSection }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);
