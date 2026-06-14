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

// ─── Weekly Progress Area Chart ───────────────────────────────────────────────

const DAYS  = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SVW   = 500, SVH = 130;
const SPAD  = { t: 10, b: 6, l: 6, r: 6 };

const WeeklyChart = () => {
  const [pts,      setPts]      = useState([]);
  const [drawn,    setDrawn]    = useState(false);
  const [hov,      setHov]      = useState(null);

  useEffect(() => {
    const gen = DAYS.map((d) => ({
      day: d,
      val: Math.floor(Math.random() * 9) + 2,
    }));
    setPts(gen);
    const t = setTimeout(() => setDrawn(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (!pts.length) return null;

  const vals   = pts.map((p) => p.val);
  const minV   = Math.min(...vals);
  const maxV   = Math.max(...vals);
  const total  = vals.reduce((a, b) => a + b, 0);
  const avg    = (total / vals.length).toFixed(1);
  const best   = DAYS[vals.indexOf(maxV)];
  const trend  = vals[vals.length - 1] >= vals[0];
  const range  = maxV - minV || 1;

  const cx = (i) => SPAD.l + (i / (pts.length - 1)) * (SVW - SPAD.l - SPAD.r);
  const cy = (v) => SVH - SPAD.b - ((v - minV) / range) * (SVH - SPAD.t - SPAD.b);

  const line = pts.reduce((acc, p, i) => {
    if (i === 0) return `M ${cx(0)} ${cy(p.val)}`;
    const cpx = (cx(i - 1) + cx(i)) / 2;
    return `${acc} C ${cpx} ${cy(pts[i-1].val)} ${cpx} ${cy(p.val)} ${cx(i)} ${cy(p.val)}`;
  }, "");

  const area = `${line} L ${cx(pts.length-1)} ${SVH} L ${cx(0)} ${SVH} Z`;

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rx   = ((e.clientX - rect.left) / rect.width) * SVW;
    const idx  = Math.round(((rx - SPAD.l) / (SVW - SPAD.l - SPAD.r)) * (pts.length - 1));
    setHov(Math.max(0, Math.min(pts.length - 1, idx)));
  };

  return (
    <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 shadow-sm p-5 flex flex-col gap-3">

      {/* Header */}
      <div className="flex items-start justify-between flex-shrink-0">
        <div>
          <h3 className="text-sm font-bold text-slate-900">This Week&apos;s Progress</h3>
          <p className="text-xs text-slate-400 mt-0.5">Daily tasks completed · new data each session</p>
        </div>
        <span className="text-[10px] font-bold tracking-wider text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md flex-shrink-0">
          This Week
        </span>
      </div>

      {/* Summary pills */}
      <div className="grid grid-cols-3 gap-2 flex-shrink-0">
        {[
          { val: total,  label: "Total Done",  bg: "bg-blue-50 border-blue-100",   text: "text-blue-600",  sub: "text-blue-400"  },
          { val: avg,    label: "Avg / Day",   bg: "bg-slate-50 border-slate-100", text: "text-slate-700", sub: "text-slate-400" },
          { val: best,   label: "Best Day",    bg: "bg-slate-50 border-slate-100", text: "text-slate-700", sub: "text-slate-400" },
        ].map(({ val, label, bg, text, sub }) => (
          <div key={label} className={`rounded-xl border px-3 py-2 ${bg}`}>
            <p className={`text-lg font-black tracking-tight ${text}`}>{val}</p>
            <p className={`text-[10px] font-semibold uppercase tracking-wider mt-0.5 ${sub}`}>{label}</p>
          </div>
        ))}
      </div>

      {/* Chart — fills remaining height */}
      <div
        className="flex-1 relative min-h-[100px] cursor-crosshair"
        onMouseMove={handleMouse}
        onMouseLeave={() => setHov(null)}
      >
        <svg className="w-full h-full" viewBox={`0 0 ${SVW} ${SVH}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="wkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.13" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.5, 1].map((lvl) => (
            <line key={lvl}
              x1={SPAD.l} y1={cy(minV + lvl * range)}
              x2={SVW - SPAD.r} y2={cy(minV + lvl * range)}
              stroke="#f1f5f9" strokeWidth="1"
            />
          ))}

          {/* Area */}
          <path d={area} fill="url(#wkGrad)"
            style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.8s ease 1.4s" }} />

          {/* Line — draws in */}
          <path d={line} fill="none" stroke="#3b82f6" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="1500" strokeDashoffset={drawn ? 0 : 1500}
            style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)" }}
          />

          {/* Dots — fade in after line */}
          {drawn && pts.map((p, i) => (
            <circle key={i} cx={cx(i)} cy={cy(p.val)} r="3.5"
              fill="white" stroke="#3b82f6" strokeWidth="2"
              style={{ opacity: drawn ? 1 : 0, transition: `opacity 0.3s ease ${0.2 + i * 0.07}s` }}
            />
          ))}

          {/* Hover crosshair */}
          {hov !== null && (
            <>
              <line x1={cx(hov)} y1={SPAD.t} x2={cx(hov)} y2={SVH - SPAD.b}
                stroke="#e2e8f0" strokeWidth="1" />
              <circle cx={cx(hov)} cy={cy(pts[hov].val)} r="5"
                fill="white" stroke="#3b82f6" strokeWidth="2.5" />
              <circle cx={cx(hov)} cy={cy(pts[hov].val)} r="2.5"
                fill="#3b82f6" />
            </>
          )}

          <rect x="0" y="0" width={SVW} height={SVH} fill="transparent" />
        </svg>

        {/* Tooltip */}
        {hov !== null && (
          <div
            className="absolute pointer-events-none bg-slate-800 text-white rounded-lg px-2.5 py-1.5 text-[10px] shadow-xl z-10 whitespace-nowrap"
            style={{
              left:      `${(cx(hov) / SVW) * 100}%`,
              top:       `${(cy(pts[hov].val) / SVH) * 100}%`,
              transform: "translateX(-50%) translateY(-130%)",
            }}
          >
            <span className="font-bold">{pts[hov].day}</span>
            <span className="text-blue-300 ml-1.5">{pts[hov].val} tasks</span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-slate-800" />
          </div>
        )}
      </div>

      {/* X-axis */}
      <div className="flex items-center justify-between text-[10px] font-semibold text-slate-300 flex-shrink-0 px-0.5">
        {DAYS.map((d) => <span key={d}>{d}</span>)}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-medium text-slate-400 flex-shrink-0">
        <span>{total} tasks completed this week</span>
        <span className={`font-bold ${trend ? "text-blue-500" : "text-slate-400"}`}>
          {trend ? "↑ Trending up" : "↓ Trending down"}
        </span>
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
