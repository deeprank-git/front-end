"use client";
import { useState, useRef, useEffect } from "react";

const defaultNotifications = [
  { id: 1, text: "Sarah Jenkins mentioned you.",         time: "20 minutes ago", dot: "bg-blue-500",   read: false },
  { id: 2, text: "Task Migration changed to Completed.", time: "3 hours ago",    dot: "bg-green-500",  read: false },
  { id: 3, text: "Project Alpha deadline updated.",      time: "3 hours ago",    dot: "bg-yellow-400", read: false },
  { id: 4, text: "New task has been assigned to you.",   time: "Yesterday",      dot: "bg-purple-500", read: false },
];

const Navbar = ({ onMenuClick, userInitial = "U", userName = "User" }) => {
  const [open,   setOpen]   = useState(false);
  const [notifs, setNotifs] = useState(defaultNotifications);
  const dropdownRef = useRef(null);

  const unreadCount = notifs.filter((n) => !n.read).length;

  const markRead    = (id) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const markAllRead = ()   => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className="w-full bg-white border-b border-slate-200 px-6 py-4 shadow-sm sticky top-0 z-40">
      <div className="flex items-center justify-between">

        {/* Left — Hamburger + Brand + Section Title */}
        <div className="flex items-center gap-3">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          <span className="text-base font-black tracking-tight text-blue-600">DeepRank</span>

        </div>

        {/* Right — Bell + Avatar */}
        <div className="flex items-center gap-2">

          {/* Notification Bell */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
              aria-label="Notifications"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
              )}
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-blue-600 text-white text-xs font-bold">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                {/* Notification List */}
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                  {notifs.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors ${n.read ? "opacity-50" : ""}`}
                    >
                      <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${n.dot}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm text-slate-700 ${!n.read ? "font-semibold" : "font-normal"}`}>
                          {n.text}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                      </div>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                      )}
                    </button>
                  ))}
                </div>

                {/* All read state */}
                {unreadCount === 0 && (
                  <div className="px-4 py-6 text-center">
                    <p className="text-xs font-semibold text-slate-400">You&apos;re all caught up!</p>
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Avatar */}
          <div
            title={userName}
            className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold ml-1 cursor-pointer"
          >
            {userInitial}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
