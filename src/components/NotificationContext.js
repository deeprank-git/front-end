"use client";
import { createContext, useContext, useState } from "react";

const NotificationContext = createContext(null);

const initialNotifications = [
  { id: 1, text: "Sarah Jenkins mentioned you.",         time: "20 minutes ago", dot: "bg-blue-500",   read: false },
  { id: 2, text: "Task Migration changed to Completed.", time: "3 hours ago",    dot: "bg-green-500",  read: false },
  { id: 3, text: "Project Alpha deadline updated.",      time: "3 hours ago",    dot: "bg-yellow-400", read: false },
  { id: 4, text: "New task has been assigned to you.",   time: "Yesterday",      dot: "bg-purple-500", read: false },
];

export function NotificationProvider({ children }) {
  const [notifs, setNotifs] = useState(initialNotifications);

  const addNotification = (text, dot = "bg-blue-500") =>
    setNotifs((prev) => [{ id: Date.now(), text, time: "Just now", dot, read: false }, ...prev]);

  const markRead    = (id) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const markAllRead = ()   => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <NotificationContext.Provider value={{ notifs, addNotification, markRead, markAllRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
