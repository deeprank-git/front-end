"use client";

import { useState, useEffect } from "react";

// ─── Static Data ──────────────────────────────────────────────────────────────

const stats = [
  {
    label: "TASKS ASSIGNED", value: 12, bg: "bg-blue-50",
    icon: <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  },
  {
    label: "IN PROGRESS", value: 5, bg: "bg-yellow-50",
    icon: <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  },
  {
    label: "PENDING REVIEW", value: 3, bg: "bg-purple-50",
    icon: <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  },
  {
    label: "COMPLETED", value: 84, bg: "bg-green-50",
    icon: <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
];

const dueToday = [
  { name: "Weekly Progress Report", meta: "Overdue by 3h",  overdue: true  },
  { name: "Review PR #2405",        meta: "Due at 6:00 PM", overdue: false },
  { name: "Onboarding – New Joiner",meta: "Due at 5:30 PM", overdue: false },
];

const notifications = [
  { text: "Sarah Jenkins mentioned you.",         time: "20 minutes ago", dot: "bg-blue-500"  },
  { text: "Task Migration changed to Completed.", time: "3 hours ago",    dot: "bg-green-500" },
  { text: "Project Alpha deadline updated.",      time: "3 hours ago",    dot: "bg-yellow-400"},
];

const upcoming = [
  { name: "Client Handover Prep",   due: "In 2 days", border: "border-l-red-400"   },
  { name: "Security Audit Phase 1", due: "In 4 days", border: "border-l-slate-400" },
  { name: "UX Research Sync",       due: "In 5 days", border: "border-l-blue-400"  },
  { name: "Final QA Review",        due: "In 7 days", border: "border-l-green-400" },
];

// ─── Weekly Activity Chart ────────────────────────────────────────────────────

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WeeklyChart = () => {
  const [bars, setBars]       = useState([]);
  const [animated, setAnimated] = useState(false);
  const [hovered, setHovered]  = useState(null);
  const [summary, setSummary]  = useState({ completed: 0, inProgress: 0, pending: 0 });

  useEffect(() => {
    const generated = DAYS.map((day) => ({
      day,
      completed:  Math.floor(Math.random() * 8) + 3,
      inProgress: Math.floor(Math.random() * 5) + 1,
      pending:    Math.floor(Math.random() * 4),
    }));
    setBars(generated);
    setSummary({
      completed:  generated.reduce((s, b) => s + b.completed, 0),
      inProgress: generated.reduce((s, b) => s + b.inProgress, 0),
      pending:    generated.reduce((s, b) => s + b.pending, 0),
    });
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  const maxTotal = Math.max(...bars.map((b) => b.completed + b.inProgress + b.pending), 1);
  const gridSteps = [1, 0.75, 0.5, 0.25, 0];

  return (
    <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 shadow-sm p-5 flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-start justify-between flex-shrink-0">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Weekly Task Activity</h3>
          <p className="text-xs text-slate-400 mt-0.5">Live snapshot · new data on every refresh</p>
        </div>
        <div className="flex items-center gap-4">
          {[
            { color: "bg-emerald-400", label: "Completed"  },
            { color: "bg-blue-400",    label: "In Progress" },
            { color: "bg-slate-300",   label: "Pending"     },
          ].map(({ color, label }) => (
            <span key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className={`w-2.5 h-2.5 rounded-sm ${color}`} />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Summary pills */}
      <div className="grid grid-cols-4 gap-2 flex-shrink-0">
        {[
          { value: summary.completed,                               label: "Completed",   bg: "bg-emerald-50 border-emerald-100", text: "text-emerald-600", sub: "text-emerald-400" },
          { value: summary.inProgress,                              label: "In Progress", bg: "bg-blue-50 border-blue-100",       text: "text-blue-600",    sub: "text-blue-400"    },
          { value: summary.pending,                                 label: "Pending",     bg: "bg-slate-50 border-slate-200",     text: "text-slate-600",   sub: "text-slate-400"   },
          { value: summary.completed + summary.inProgress + summary.pending, label: "Total", bg: "bg-indigo-50 border-indigo-100", text: "text-indigo-600",  sub: "text-indigo-400"  },
        ].map(({ value, label, bg, text, sub }) => (
          <div key={label} className={`rounded-xl border px-3 py-2.5 text-center ${bg}`}>
            <p className={`text-xl font-black ${text}`}>{value}</p>
            <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${sub}`}>{label}</p>
          </div>
        ))}
      </div>

      {/* Chart — fills remaining space */}
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex-1 relative">

          {/* Horizontal grid lines with y-axis labels */}
          {gridSteps.map((step) => (
            <div
              key={step}
              className="absolute left-0 right-0 flex items-center gap-2 pointer-events-none"
              style={{ top: `${(1 - step) * 100}%` }}
            >
              <span className="text-[9px] text-slate-300 font-medium w-5 text-right flex-shrink-0 -translate-y-1/2">
                {Math.round(step * maxTotal)}
              </span>
              <div className="flex-1 border-t border-dashed border-slate-100" />
            </div>
          ))}

          {/* Bars */}
          <div className="absolute inset-0 pl-7 flex items-end gap-2 pb-6">
            {bars.map((bar, i) => {
              const total      = bar.completed + bar.inProgress + bar.pending;
              const totalPct   = (total / maxTotal) * 100;
              const isHov      = hovered === i;

              return (
                <div
                  key={bar.day}
                  className="flex-1 h-full flex flex-col justify-end items-center relative cursor-pointer"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Tooltip */}
                  {isHov && (
                    <div className="absolute bottom-[calc(100%-1.5rem)] mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-medium rounded-xl px-3 py-2 whitespace-nowrap z-20 shadow-xl pointer-events-none">
                      <p className="font-bold text-white text-xs mb-1.5 text-center">{bar.day}</p>
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {bar.completed} completed</span>
                        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> {bar.inProgress} in progress</span>
                        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-400" /> {bar.pending} pending</span>
                      </div>
                      <div className="mt-1.5 pt-1.5 border-t border-slate-700 text-center text-slate-300">Total: <span className="text-white font-bold">{total}</span></div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-slate-900" />
                    </div>
                  )}

                  {/* Stacked bar */}
                  <div
                    className="w-full rounded-t-lg overflow-hidden flex flex-col"
                    style={{
                      height: animated ? `${totalPct}%` : "0%",
                      transition: `height 0.65s cubic-bezier(0.34,1.25,0.64,1) ${i * 0.07}s`,
                      opacity: hovered !== null && !isHov ? 0.35 : 1,
                      transform: isHov ? "scaleX(1.1)" : "scaleX(1)",
                      transitionProperty: "height, opacity, transform",
                      transitionDuration: "0.65s, 0.2s, 0.2s",
                    }}
                  >
                    {/* Pending — top */}
                    {bar.pending > 0 && (
                      <div
                        style={{
                          flex: bar.pending,
                          background: "linear-gradient(180deg, #f8fafc, #e2e8f0)",
                          minHeight: "3px",
                        }}
                      />
                    )}
                    {/* In Progress — middle */}
                    {bar.inProgress > 0 && (
                      <div
                        style={{
                          flex: bar.inProgress,
                          background: "linear-gradient(180deg, #93c5fd, #3b82f6)",
                          minHeight: "3px",
                        }}
                      />
                    )}
                    {/* Completed — bottom */}
                    {bar.completed > 0 && (
                      <div
                        style={{
                          flex: bar.completed,
                          background: "linear-gradient(180deg, #6ee7b7, #10b981)",
                          minHeight: "3px",
                        }}
                      />
                    )}
                  </div>

                  {/* Day label */}
                  <span className="absolute bottom-0 text-[10px] font-semibold text-slate-400">
                    {bar.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Dashboard ────────────────────────────────────────────────────────────────

const DashboardContent = () => (
  <div className="space-y-5">

    {/* Greeting */}
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm px-4 md:px-7 py-5 md:py-6 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Good morning, Adrian</h2>
        <p className="mt-1 text-sm text-slate-500">
          You have <span className="font-semibold text-blue-600">3 tasks</span> due today. Stay ahead of your schedule.
        </p>
        <a
          href="/employee/my-tasks"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          View My Tasks
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
      </div>
      <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 border-slate-200">
        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-2xl bg-white border border-slate-200 shadow-sm px-5 py-4 flex items-center gap-3">
          <div className={`flex items-center justify-center w-9 h-9 rounded-xl ${s.bg}`}>{s.icon}</div>
          <div>
            <p className="text-xs font-semibold text-slate-400 tracking-wide">{s.label}</p>
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Main Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">

      {/* Weekly Chart */}
      <WeeklyChart />

      {/* Due Today + Notifications */}
      <div className="space-y-4">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-3">
            <span className="text-red-500 mr-1">•</span> Due Today
          </h3>
          <div className="space-y-2">
            {dueToday.map((item) => (
              <div key={item.name} className={`rounded-xl px-3 py-2.5 ${item.overdue ? "bg-red-50 border border-red-200" : "bg-slate-50 border border-slate-100"}`}>
                <p className={`text-sm font-semibold ${item.overdue ? "text-red-700" : "text-slate-800"}`}>{item.name}</p>
                <p className={`text-xs mt-0.5 ${item.overdue ? "text-red-500" : "text-slate-400"}`}>{item.meta}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Notifications</h3>
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.text} className="flex items-start gap-2.5">
                <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${n.dot}`} />
                <div>
                  <p className="text-sm text-slate-700">{n.text}</p>
                  <p className="text-xs text-slate-400">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-center text-xs font-medium text-blue-600 hover:underline">View History</button>
        </div>
      </div>
    </div>

    {/* Upcoming Deadlines */}
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
      <h3 className="text-sm font-bold text-slate-900 mb-4">Upcoming Deadlines (Next 7 Days)</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {upcoming.map((item) => (
          <div key={item.name} className={`rounded-xl border-l-4 ${item.border} bg-slate-50 border border-slate-100 px-4 py-3`}>
            <p className="text-sm font-semibold text-slate-800">{item.name}</p>
            <p className="text-xs text-slate-400 mt-1">{item.due}</p>
            <div className="mt-3 flex justify-end">
              <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
);

const EmployeeDashboardPage = () => <DashboardContent />;

export default EmployeeDashboardPage;
