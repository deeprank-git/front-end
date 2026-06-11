"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  // Primary navigation links mapping to your operational panels
  const primaryNavItems = [
    {
      name: "Home",
      href: "/manager/dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: "Employees",
      href: "/manager/employees",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      name: "Projects",
      href: "/manager/projects",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
  ];

  // Secondary utilities grouped on the lower deck
  const secondaryNavItems = [
    {
      name: "Settings",
      href: "/manager/settings",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      name: "Support",
      href: "/manager/support",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 0A4 4 0 109.878 14.14M14.828 9.172a4 4 0 010 5.656M15 10a1 1 0 00-1-1h-1a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1v-1z" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-50 border-r border-slate-100 flex flex-col justify-between select-none">
      <div className="pt-8">
        
        {/* Brand Header Identity Container */}
        <div className="flex items-center gap-3 px-7 mb-10">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-sm shadow-blue-500/20">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <div>
            <div className="text-slate-900 text-base font-bold tracking-tight">Vantage</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider -mt-0.5">Executive Suite</div>
          </div>
        </div>

        {/* Primary Stack Links */}
        <nav className="space-y-1">
          {primaryNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3.5 pl-7 pr-4 py-3.5 text-sm font-semibold transition-all group ${
                  isActive
                    ? "bg-blue-50/50 text-blue-600"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/40"
                }`}
              >
                {/* Micro Icon */}
                <span className={isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600 transition-colors"}>
                  {item.icon}
                </span>
                
                {/* Option Text Label */}
                <span>{item.name}</span>

                {/* Right Active Accent Bar Trim Line */}
                {isActive && (
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Utilities Lower Deck Stack Section */}
      <div className="pb-8 space-y-1">
        {secondaryNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-3.5 pl-7 pr-4 py-3.5 text-sm font-semibold transition-all group ${
                isActive
                  ? "bg-blue-50/50 text-blue-600"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/40"
              }`}
            >
              <span className={isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600 transition-colors"}>
                {item.icon}
              </span>
              <span>{item.name}</span>
              
              {isActive && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l" />
              )}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;