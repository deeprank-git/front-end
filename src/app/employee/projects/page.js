"use client";
import { useState, useMemo } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const ONGOING = [
  {
    id: 1,
    name: "VisionOS Spatial Mapping",
    status: "ACTIVE",
    priority: "High",
    description: "Optimizing the depth-perception engine for next-gen spatial computing hardware.",
    fullDescription:
      "A comprehensive overhaul of the spatial mapping engine to improve low-light performance and object occlusion accuracy. This initiative focuses on the core sensor fusion pipeline for next-generation hardware deployments.",
    tasksTotal: 12,
    tasksDone: 4,
    startDate: "Oct 01, 2024",
    dueDate: "Nov 14, 2024",
    rawDue: "2024-11-14",
    members: [
      { name: "Sarah K.", color: "bg-blue-500" },
      { name: "Alex M.", color: "bg-purple-500" },
      { name: "Jordan D.", color: "bg-emerald-500" },
      { name: "Chen W.", color: "bg-orange-500" },
      { name: "Priya S.", color: "bg-pink-500" },
    ],
    myTasks: [
      { name: "Initial Sensor Calibration Tests", status: "Completed", done: true },
      { name: "Optimize Low-Light Raycasting",    status: "In Progress", done: false },
      { name: "Occlusion Accuracy Audit",         status: "Pending",    done: false },
    ],
  },
  {
    id: 2,
    name: "Quantum Ledger Sync",
    status: "ACTIVE",
    priority: "Medium",
    description: "Implementing distributed synchronization protocols for real-time ledger consistency.",
    fullDescription:
      "Designing and implementing a fault-tolerant distributed sync layer that ensures real-time ledger consistency across multi-region deployments. The project covers protocol design, conflict resolution, and latency optimization for financial-grade reliability.",
    tasksTotal: 24,
    tasksDone: 18,
    startDate: "Sep 15, 2024",
    dueDate: "Dec 02, 2024",
    rawDue: "2024-12-02",
    members: [
      { name: "Alex M.",   color: "bg-purple-500"  },
      { name: "Jordan D.", color: "bg-emerald-500" },
    ],
    myTasks: [
      { name: "Protocol Design Document",     status: "Completed",  done: true  },
      { name: "Multi-region Sync Layer",      status: "Completed",  done: true  },
      { name: "Conflict Resolution Engine",   status: "In Progress", done: false },
      { name: "Latency Benchmarking",         status: "Pending",    done: false },
    ],
  },
  {
    id: 3,
    name: "Neural Interface v2",
    status: "DELAYED",
    priority: "High",
    description: "Refining the low-latency brain-computer interface (BCI) signal processing pipeline.",
    fullDescription:
      "Advancing the second generation of the neural interface platform with focus on reducing signal acquisition latency below 10ms. The scope includes hardware driver optimization, firmware updates, and integration with the existing BCI SDK ecosystem.",
    tasksTotal: 10,
    tasksDone: 2,
    startDate: "Aug 20, 2024",
    dueDate: "Nov 28, 2024",
    rawDue: "2024-11-28",
    members: [
      { name: "Sarah K.", color: "bg-blue-500"    },
      { name: "Chen W.",  color: "bg-orange-500"  },
      { name: "Priya S.", color: "bg-pink-500"    },
      { name: "Marcus W.",color: "bg-red-500"     },
    ],
    myTasks: [
      { name: "Hardware Driver Audit",    status: "Completed",  done: true  },
      { name: "Firmware Latency Patch",   status: "In Progress", done: false },
      { name: "SDK Integration Tests",    status: "Pending",    done: false },
    ],
  },
  {
    id: 4,
    name: "Ethereal UI Kit",
    status: "ACTIVE",
    priority: "Low",
    description: "Developing a comprehensive component library focused on accessibility and motion design.",
    fullDescription:
      "Building a production-ready design system and component library for internal and external product surfaces. The kit targets WCAG 2.2 AA compliance, full dark-mode support, and fluid micro-animations to elevate the overall product experience.",
    tasksTotal: 50,
    tasksDone: 45,
    startDate: "Jul 01, 2024",
    dueDate: "Jan 15, 2025",
    rawDue: "2025-01-15",
    members: [
      { name: "Jordan D.", color: "bg-emerald-500" },
    ],
    myTasks: [
      { name: "Core Component Set",     status: "Completed",  done: true  },
      { name: "Dark Mode Tokens",       status: "Completed",  done: true  },
      { name: "Motion Design System",   status: "Completed",  done: true  },
      { name: "Accessibility Audit",    status: "In Progress", done: false },
      { name: "Documentation Site",     status: "Pending",    done: false },
    ],
  },
];

const COMPLETED_PROJECTS = [
  {
    id: 5,
    name: "Analytics Dashboard v3",
    status: "COMPLETED",
    priority: "Medium",
    description: "Redesigned analytics suite with real-time filtering and CSV/PDF export capabilities.",
    fullDescription:
      "Full redesign of the analytics platform covering new chart types, real-time data filtering, CSV/PDF export pipelines, and a unified metrics API. Delivered on schedule with zero critical post-launch issues.",
    tasksTotal: 20,
    tasksDone: 20,
    startDate: "Jun 01, 2024",
    dueDate: "Sep 30, 2024",
    rawDue: "2024-09-30",
    members: [
      { name: "Sarah K.", color: "bg-blue-500"   },
      { name: "Alex M.",  color: "bg-purple-500" },
    ],
    myTasks: [
      { name: "New Chart Component Library",   status: "Completed", done: true },
      { name: "Real-time Filter Engine",       status: "Completed", done: true },
      { name: "Export Module (CSV/PDF)",       status: "Completed", done: true },
      { name: "Metrics API Unification",       status: "Completed", done: true },
    ],
  },
  {
    id: 6,
    name: "Onboarding Flow Revamp",
    status: "COMPLETED",
    priority: "Low",
    description: "Streamlined the new-user onboarding experience to cut time-to-value by 40%.",
    fullDescription:
      "Redesigned the entire new-user onboarding sequence — from sign-up to first meaningful action — reducing friction with smart defaults, inline guidance, and a progress indicator. Average completion rate increased from 52% to 89% post-launch.",
    tasksTotal: 15,
    tasksDone: 15,
    startDate: "May 10, 2024",
    dueDate: "Aug 20, 2024",
    rawDue: "2024-08-20",
    members: [
      { name: "Priya S.",  color: "bg-pink-500"    },
      { name: "Jordan D.", color: "bg-emerald-500" },
      { name: "Kyle B.",   color: "bg-teal-500"    },
    ],
    myTasks: [
      { name: "UX Flow Audit",          status: "Completed", done: true },
      { name: "Smart Defaults Module",  status: "Completed", done: true },
      { name: "Progress Indicator UI",  status: "Completed", done: true },
      { name: "A/B Test & Rollout",     status: "Completed", done: true },
    ],
  },
];

// ─── Config maps ──────────────────────────────────────────────────────────────

const statusCfg = {
  ACTIVE:    { dot: "bg-green-400",  label: "Active",    bg: "bg-green-50",  text: "text-green-700"  },
  DELAYED:   { dot: "bg-amber-400",  label: "Delayed",   bg: "bg-amber-50",  text: "text-amber-700"  },
  COMPLETED: { dot: "bg-blue-400",   label: "Completed", bg: "bg-blue-50",   text: "text-blue-700"   },
};

const priorityCfg = {
  High:   { bg: "bg-red-50",    text: "text-red-500"    },
  Medium: { bg: "bg-yellow-50", text: "text-yellow-600" },
  Low:    { bg: "bg-blue-50",   text: "text-blue-600"   },
};

const taskStatusCfg = {
  "Completed":   { text: "text-blue-600"  },
  "In Progress": { text: "text-blue-500"  },
  "Pending":     { text: "text-slate-400" },
};

// ─── ProjectDetailModal ───────────────────────────────────────────────────────

const ProjectDetailModal = ({ project, onClose }) => {
  const [tasks, setTasks] = useState(() =>
    project.myTasks.map((t) => ({ ...t, _orig: t.status }))
  );

  const tasksDone = tasks.filter((t) => t.done).length;
  const progress  = Math.round((tasksDone / project.tasksTotal) * 100);
  const pc        = priorityCfg[project.priority] ?? priorityCfg.Medium;

  const toggleTask = (i) => {
    setTasks((prev) =>
      prev.map((t, idx) => {
        if (idx !== i) return t;
        const nowDone = !t.done;
        return { ...t, done: nowDone, status: nowDone ? "Completed" : t._orig };
      })
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">{project.name}</h2>
              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full mt-1 ${pc.bg} ${pc.text}`}>
                • {project.priority} Priority
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors flex-shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 pb-2 space-y-5">

          {/* Description + Project Window */}
          <div className="grid grid-cols-5 gap-5">
            <div className="col-span-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Description</p>
              <p className="text-sm text-slate-600 leading-relaxed">{project.fullDescription}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Project Window</p>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
                  </svg>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Start Date</p>
                    <p className="text-xs font-semibold text-slate-700">{project.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
                  </svg>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Due Date</p>
                    <p className="text-xs font-semibold text-blue-600">{project.dueDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overall Progress</p>
              <span className="text-2xl font-bold text-blue-600">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* My Tasks + Team Members */}
          <div className="grid grid-cols-5 gap-5">
            <div className="col-span-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">My Tasks in this Project</p>
              <div className="space-y-1">
                {tasks.map((task, i) => {
                  const tc = taskStatusCfg[task.status] ?? taskStatusCfg["Pending"];
                  return (
                    <div
                      key={i}
                      onClick={() => toggleTask(i)}
                      className="flex items-center gap-3 px-2 py-2 rounded-xl cursor-pointer hover:bg-slate-50 active:bg-slate-100 transition-colors group"
                    >
                      <div className={`w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all duration-200 ${task.done ? "bg-blue-600 border-blue-600" : "border-slate-300 group-hover:border-blue-400"}`}>
                        {task.done && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-xs flex-1 leading-snug transition-colors ${task.done ? "text-slate-400 line-through" : "text-slate-700 font-medium group-hover:text-slate-900"}`}>
                        {task.name}
                      </span>
                      <span className={`text-xs font-semibold flex-shrink-0 ${tc.text}`}>{task.status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Team Members</p>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {project.members.map((m, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className={`w-9 h-9 rounded-full ${m.color} flex items-center justify-center text-white text-xs font-bold`}>
                      {m.name[0]}
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium text-center leading-tight">{m.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Close Detail View
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── ProjectCard ──────────────────────────────────────────────────────────────

const ProjectCard = ({ project, onClick, onMarkComplete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const sc           = statusCfg[project.status] ?? statusCfg.ACTIVE;
  const progress     = Math.round((project.tasksDone / project.tasksTotal) * 100);
  const visibleMembers = project.members.slice(0, 3);
  const overflow     = project.members.length - 3;

  const menuAction = (e, fn) => { e.stopPropagation(); setMenuOpen(false); fn(); };

  return (
    <div
      onClick={onClick}
      className="relative bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-3 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 select-none"
    >
      {/* invisible backdrop to close menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }}
        />
      )}

      {/* Status + 3-dot */}
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
          {sc.label}
        </span>

        <div className="relative z-20">
          <button
            onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v); }}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-lg z-20 overflow-hidden">
              {/* View Details */}
              <button
                onClick={(e) => menuAction(e, onClick)}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
              >
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Details
              </button>

              {/* Mark as Complete — only for non-completed projects */}
              {project.status !== "COMPLETED" && (
                <button
                  onClick={(e) => menuAction(e, () => onMarkComplete(project.id))}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
                >
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Mark as Complete
                </button>
              )}

            </div>
          )}
        </div>
      </div>

      {/* Name + description */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-1 leading-snug">{project.name}</h3>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{project.description}</p>
      </div>

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-slate-400 font-semibold">Tasks Progress</span>
          <span className={`text-[11px] font-bold ${progress === 100 ? "text-green-600" : "text-slate-700"}`}>
            {project.tasksDone} of {project.tasksTotal} tasks done
          </span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${progress === 100 ? "bg-green-500" : "bg-blue-500"}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Avatars + date */}
      <div className="flex items-center justify-between pt-0.5">
        <div className="flex items-center">
          {visibleMembers.map((m, i) => (
            <div
              key={i}
              className={`w-7 h-7 rounded-full ${m.color} flex items-center justify-center text-white text-[10px] font-bold border-2 border-white ${i > 0 ? "-ml-2" : ""}`}
            >
              {m.name[0]}
            </div>
          ))}
          {overflow > 0 && (
            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-[10px] font-bold border-2 border-white -ml-2">
              +{overflow}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
          </svg>
          {project.dueDate}
        </div>
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [tab,             setTab]             = useState("ongoing");
  const [filter,          setFilter]          = useState("Deadline");
  const [filterOpen,      setFilterOpen]      = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [ongoingList,     setOngoingList]     = useState(ONGOING);
  const [completedList,   setCompletedList]   = useState(COMPLETED_PROJECTS);
  const [toast,           setToast]           = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleMarkComplete = (id) => {
    const project = ongoingList.find((p) => p.id === id);
    if (!project) return;
    setOngoingList((prev) => prev.filter((p) => p.id !== id));
    setCompletedList((prev) => [{ ...project, status: "COMPLETED", tasksDone: project.tasksTotal }, ...prev]);
    showToast(`"${project.name}" marked as complete`);
  };

const source = tab === "ongoing" ? ongoingList : completedList;

  const projects = useMemo(() => {
    const list = [...source];
    if (filter === "Deadline") return list.sort((a, b) => new Date(a.rawDue) - new Date(b.rawDue));
    if (filter === "Progress") return list.sort((a, b) => (b.tasksDone / b.tasksTotal) - (a.tasksDone / a.tasksTotal));
    if (filter === "Name")     return list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [source, filter]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <h1 className="text-xl font-bold text-slate-900">My Projects</h1>

      {/* Tabs + Filter */}
      <div className="flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-6">
          {["ongoing", "completed"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 text-sm font-semibold capitalize transition-colors ${
                tab === t
                  ? "border-b-2 border-blue-600 text-blue-600 -mb-px"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="relative pb-3">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
          >
            <span className="text-slate-400 font-medium">Filter by:</span>
            {filter}
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {filterOpen && (
            <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
              {["Deadline", "Progress", "Name"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setFilter(opt); setFilterOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                    filter === opt ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            onClick={() => setSelectedProject(p)}
            onMarkComplete={handleMarkComplete}
          />
        ))}

        {tab === "ongoing" && (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 p-8 min-h-[220px] hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 group-hover:border-blue-400 flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">Create New Project</p>
            <p className="text-xs text-slate-400 text-center">Launch a new visionary initiative</p>
          </div>
        )}

        {tab === "completed" && projects.length === 0 && (
          <div className="col-span-3 rounded-2xl bg-white border border-slate-200 shadow-sm p-14 flex flex-col items-center justify-center text-center">
            <p className="text-sm font-semibold text-slate-700">No completed projects yet</p>
            <p className="text-xs text-slate-400 mt-1">Projects you finish will appear here.</p>
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-xl shadow-lg animate-fade-in">
          <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {toast}
        </div>
      )}
    </div>
  );
}
