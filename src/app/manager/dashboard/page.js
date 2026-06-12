"use client";
import { useState, useEffect } from "react";
import AddEmployeeModal from "@/components/AddEmployeeModal";
import AssignTaskModal from "@/components/AssignTaskModal";
import CreateProjectModal from "@/components/CreateProjectModal";

// ─── Task Completion Line Chart ───────────────────────────────────────────────

const VW = 580, VH = 160;
const PAD = { t: 12, b: 8, l: 10, r: 10 };

function TaskCompletionChart() {
  const [pts, setPts]     = useState([]);
  const [drawn, setDrawn] = useState(false);
  const [hov, setHov]     = useState(null);

  useEffect(() => {
    let v = 35 + Math.random() * 20;
    const gen = Array.from({ length: 30 }, (_, i) => {
      v = Math.max(8, Math.min(96, v + (Math.random() - 0.42) * 18));
      return { day: i + 1, val: Math.round(v) };
    });
    setPts(gen);
    const t = setTimeout(() => setDrawn(true), 150);
    return () => clearTimeout(t);
  }, []);

  if (!pts.length) return null;

  const vals   = pts.map((p) => p.val);
  const minV   = Math.min(...vals);
  const maxV   = Math.max(...vals);
  const range  = maxV - minV || 1;
  const avg    = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  const trend  = vals[vals.length - 1] >= vals[0];
  const netChg = Math.abs(vals[vals.length - 1] - vals[0]);
  const maxIdx = vals.indexOf(maxV);

  const cx = (i) => PAD.l + (i / (pts.length - 1)) * (VW - PAD.l - PAD.r);
  const cy = (v) => VH - PAD.b - ((v - minV) / range) * (VH - PAD.t - PAD.b);

  const linePath = pts.reduce((acc, p, i) => {
    if (i === 0) return `M ${cx(0)} ${cy(p.val)}`;
    const ox = cx(i - 1), oy = cy(pts[i - 1].val);
    const nx = cx(i),     ny = cy(p.val);
    const cpx = (ox + nx) / 2;
    return `${acc} C ${cpx} ${oy} ${cpx} ${ny} ${nx} ${ny}`;
  }, "");

  const areaPath = `${linePath} L ${cx(pts.length - 1)} ${VH} L ${cx(0)} ${VH} Z`;

  const gridLevels = [0, 0.25, 0.5, 0.75, 1];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * VW;
    const raw  = ((relX - PAD.l) / (VW - PAD.l - PAD.r)) * (pts.length - 1);
    setHov(Math.max(0, Math.min(pts.length - 1, Math.round(raw))));
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-3">

      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h3 className="text-base font-bold text-slate-900">Task Completion Trend</h3>
          <p className="text-xs text-slate-400">Daily productivity over the last 30 days</p>
        </div>
        <span className="text-[10px] font-bold tracking-wider text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md">
          Last 30 Days
        </span>
      </div>

      {/* Summary pills */}
      <div className="grid grid-cols-3 gap-2 flex-shrink-0">
        {[
          { val: avg,                  label: "Daily Avg",  bg: "bg-blue-50 border-blue-100",                      text: "text-blue-600",    sub: "text-blue-400"    },
          { val: maxV,                 label: "Peak Day",   bg: "bg-emerald-50 border-emerald-100",                 text: "text-emerald-600", sub: "text-emerald-400" },
          { val: `${trend ? "↑" : "↓"} ${netChg}`, label: "Net Change", bg: trend ? "bg-emerald-50 border-emerald-100" : "bg-red-50 border-red-100", text: trend ? "text-emerald-600" : "text-red-500", sub: trend ? "text-emerald-400" : "text-red-400" },
        ].map(({ val, label, bg, text, sub }) => (
          <div key={label} className={`rounded-xl border px-3 py-2.5 ${bg}`}>
            <p className={`text-xl font-black ${text}`}>{val}</p>
            <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${sub}`}>{label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div
        className="flex-1 min-h-[120px] relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHov(null)}
      >
        <svg className="w-full h-full" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="mgGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#2563eb" stopOpacity="0.22" />
              <stop offset="90%" stopColor="#2563eb" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {gridLevels.map((lvl) => {
            const gv = minV + lvl * range;
            return (
              <g key={lvl}>
                <line
                  x1={PAD.l} y1={cy(gv)} x2={VW - PAD.r} y2={cy(gv)}
                  stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 3"
                />
                <text x={PAD.l - 2} y={cy(gv)} fontSize="7" fill="#cbd5e1" textAnchor="end" dominantBaseline="middle">
                  {Math.round(gv)}
                </text>
              </g>
            );
          })}

          {/* Area fill — fades in after line draws */}
          <path
            d={areaPath}
            fill="url(#mgGrad)"
            style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.8s ease 1.2s" }}
          />

          {/* Animated line draw */}
          <path
            d={linePath}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="2200"
            strokeDashoffset={drawn ? 0 : 2200}
            style={{ transition: "stroke-dashoffset 1.9s cubic-bezier(0.4,0,0.2,1)" }}
          />

          {/* Peak dot */}
          {drawn && (
            <>
              <circle cx={cx(maxIdx)} cy={cy(maxV)} r="9" fill="#2563eb" opacity="0.12" />
              <circle cx={cx(maxIdx)} cy={cy(maxV)} r="5" fill="white" stroke="#2563eb" strokeWidth="2.5" />
              <circle cx={cx(maxIdx)} cy={cy(maxV)} r="2.5" fill="#2563eb" />
            </>
          )}

          {/* Hover crosshair + dot */}
          {hov !== null && (
            <>
              <line
                x1={cx(hov)} y1={PAD.t} x2={cx(hov)} y2={VH - PAD.b}
                stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3"
              />
              <circle cx={cx(hov)} cy={cy(pts[hov].val)} r="6" fill="#2563eb" opacity="0.2" />
              <circle cx={cx(hov)} cy={cy(pts[hov].val)} r="4" fill="white" stroke="#2563eb" strokeWidth="2.5" />
            </>
          )}

          {/* Transparent overlay to capture mouse */}
          <rect x="0" y="0" width={VW} height={VH} fill="transparent" />
        </svg>

        {/* Floating tooltip */}
        {hov !== null && (
          <div
            className="absolute pointer-events-none bg-slate-900 text-white rounded-xl px-3 py-2 shadow-2xl z-20 text-[10px] whitespace-nowrap"
            style={{
              left:      `${(cx(hov) / VW) * 100}%`,
              top:       `${(cy(pts[hov].val) / VH) * 100}%`,
              transform: "translateX(-50%) translateY(-120%)",
            }}
          >
            <p className="font-bold text-white text-xs">Day {pts[hov].day}</p>
            <p className="text-blue-300 mt-0.5">{pts[hov].val} tasks completed</p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-slate-900" />
          </div>
        )}
      </div>

      {/* X-axis */}
      <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 flex-shrink-0 px-1">
        <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ManagerDashboardPage() {
  // Modal State Management
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen]         = useState(false);
  const [isProjectOpen, setIsProjectOpen]   = useState(false);

  return (
    <div className="w-full bg-[#f8faff] min-h-screen px-8 py-10 font-sans text-slate-900">
      {/* Upper Brand Action Row */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Executive Overview</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Real-time performance metrics and strategic operational health.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm inline-flex items-center gap-2 transition-all">
            <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export Report
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/10 inline-flex items-center gap-2 transition-all">
            Generate Insights
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Analytics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard title="Total Employees" count="1,248" badge="+12%" icon="users" />
          <MetricCard title="Active Projects" count="42" badge="Active" icon="layers" />
          <MetricCard title="Tasks In Progress" count="186" badge="84% load" icon="tasks" />
          <MetricCard title="Completed Tasks" count="2,840" badge="92% KPI" icon="check" isPrimary={true} />
        </div>

        {/* Primary Row: Analytics Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Animated Line Chart */}
          <TaskCompletionChart />

          {/* Project Health Circular Meter */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Project Health</h3>
              <p className="text-xs text-slate-400">Current distribution of 42 active initiatives</p>
            </div>

            <div className="my-2 flex justify-center">
              <AnimatedRadialMeter targetPercentage={74} valueLabel="42" subLabel="PROJECTS" />
            </div>

            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-600" /> 70% Ongoing</div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-300" /> 20% Delayed</div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-red-500" /> 10% At Risk</div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-slate-200" /> N/A</div>
            </div>
          </div>
        </div>

        {/* Secondary Row: Deadlines and Operations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Target Milestone Deadlines */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Upcoming Deadlines</h3>
              <span className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">View All</span>
            </div>
            <div className="space-y-3 flex-1">
              <DeadlineRow title="Cloud Migration Phase 1" desc="Infrastructure Team • Due today" status="CRITICAL" statusStyle="bg-red-50 text-red-600 border-red-100" />
              <DeadlineRow title="Q3 Hiring Pipeline Audit" desc="HR Operations • Tomorrow" status="HIGH" statusStyle="bg-blue-50 text-blue-600 border-blue-100" />
              <DeadlineRow title="Product Vision Keynote" desc="Design Studio • In 3 days" status="MEDIUM" statusStyle="bg-indigo-50/70 text-indigo-600 border-indigo-100/50" />
            </div>
          </div>

          {/* Operational Log Updates */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
            <h3 className="text-base font-bold text-slate-900 mb-4">Recent Activity</h3>
            <div className="space-y-4 flex-1">
              <ActivityLog name="Aastha" action="assigned" target="Homepage UI task" time="12 minutes ago" />
              <ActivityLog name="Marcus" action="completed" target="API Integration Audit" time="2 hours ago" />
              <ActivityLog name="Lina" action="uploaded" target="Q4 Roadmap Docs" time="5 hours ago" />
            </div>
          </div>
        </div>

        {/* Bottom Strategic Operational Controls Panel */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Strategic Controls</h3>
            <p className="text-xs text-slate-400">Direct operational management tools.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setIsEmployeeOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md shadow-blue-500/10 flex items-center gap-2 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20h10a4 4 0 00-4-4H5a4 4 0 00-4 4z" /></svg>
              Add Employee
            </button>
            <button 
              onClick={() => setIsProjectOpen(true)}
              className="bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Create Project
            </button>
            <button 
              onClick={() => setIsTaskOpen(true)}
              className="bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-colors"
            >
              <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Assign Task
            </button>
          </div>
        </div>
      </div>

      {/* Global Modals Mounting Injection */}
      <AddEmployeeModal isOpen={isEmployeeOpen} onClose={() => setIsEmployeeOpen(false)} />
      <AssignTaskModal isOpen={isTaskOpen} onClose={() => setIsTaskOpen(false)} />
      <CreateProjectModal isOpen={isProjectOpen} onClose={() => setIsProjectOpen(false)} />
    </div>
  );
}

/* ==========================================
   SUPPORTING MICRO-COMPONENTS (LOCALIZED)
   ========================================== */

function MetricCard({ title, count, badge, icon, isPrimary = false }) {
  return (
    <div className={`rounded-2xl p-5 border shadow-sm transition-all duration-200 hover:shadow-md ${isPrimary ? 'bg-white border-blue-200' : 'bg-white border-slate-100'}`}>
      <div className="flex justify-between items-start">
        <span className="text-xs font-bold text-slate-400 tracking-tight">{title}</span>
        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${isPrimary ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>{badge}</span>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-2xl font-black tracking-tight text-slate-900">{count}</span>
        <div className={`p-2 rounded-xl ${isPrimary ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
          {icon === 'users' && <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
          {icon === 'layers' && <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" /></svg>}
          {icon === 'tasks' && <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          {icon === 'check' && <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
        </div>
      </div>
    </div>
  );
}

function DeadlineRow({ title, desc, status, statusStyle }) {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/50 border border-slate-100 hover:bg-slate-50 transition-colors">
      <div className="flex items-start gap-3">
        <span className="mt-1 h-5 w-5 rounded-lg bg-white shadow-sm flex items-center justify-center border border-slate-100 text-xs font-bold text-red-500">!</span>
        <div>
          <h4 className="text-sm font-bold text-slate-800 leading-none">{title}</h4>
          <p className="text-xs text-slate-400 mt-1">{desc}</p>
        </div>
      </div>
      <span className={`text-[9px] font-black tracking-wider px-2 py-1 rounded-md border ${statusStyle}`}>{status}</span>
    </div>
  );
}

function ActivityLog({ name, action, target, time }) {
  return (
    <div className="flex items-start gap-3 text-xs">
      <div className="h-8 w-8 rounded-full bg-slate-100 font-bold text-slate-600 flex items-center justify-center border border-slate-200 capitalize">
        {name[0]}
      </div>
      <div className="flex-1">
        <p className="text-slate-700 font-medium leading-relaxed">
          <strong className="text-slate-900 font-bold">{name}</strong> {action} <span className="text-blue-600 font-semibold cursor-pointer hover:underline">{target}</span>
        </p>
        <span className="text-[10px] text-slate-400 block mt-0.5">{time}</span>
      </div>
    </div>
  );
}

/* Dynamic Arc Drawing Radial Meter Path Component */
function AnimatedRadialMeter({ targetPercentage, valueLabel, subLabel }) {
  const [percentage, setPercentage] = useState(0);
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    // Reset path allocation back to starting point instantly
    setPercentage(0);
    // Draw forward smoothly to exact mock design coordinate threshold
    const timer = setTimeout(() => setPercentage(targetPercentage), 300);
    return () => clearTimeout(timer);
  }, [targetPercentage]);

  return (
    <div className="relative flex items-center justify-center h-40 w-40">
      <svg className="w-full h-full transform -rotate-90">
        {/* Background track circle */}
        <circle cx="80" cy="80" r={radius} stroke="#e2e8f0" strokeWidth={strokeWidth} fill="transparent" />
        {/* Animated dynamic arc layer */}
        <circle 
          cx="80" cy="80" r={radius} 
          stroke="#2563eb" strokeWidth={strokeWidth} fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Inner Label Container overlay */}
      <div className="absolute text-center flex flex-col justify-center items-center">
        <span className="text-3xl font-black text-slate-900 tracking-tight leading-none">{valueLabel}</span>
        <span className="text-[9px] font-black tracking-widest text-slate-400 mt-1.5 block">{subLabel}</span>
      </div>
    </div>
  );
}