"use client";
import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const assignedToMeInitial = [
  {
    id: 1, name: "Refactor Authentication Microservice", status: "ASSIGNED", project: "VisionOS Auth",
    assignedBy: "Sarah Connor", dueDate: "Oct 24", startDate: "Oct 20, 2024", fullDueDate: "Oct 24, 2024",
    progress: 1, locked: false, priority: "HIGH",
    description: "Migrate legacy auth tokens to the new perception engine for improved security and low-latency validation. Ensure backward compatibility for the transition period.",
    attachments: [
      { name: "auth_spec_v2.pdf",          date: "OCT 21", size: "2.4MB" },
      { name: "architecture_diagram.png",  date: "OCT 21", size: "5.1MB" },
    ],
    lastActivity: "15m ago",
  },
  {
    id: 2, name: "VisionOS Spatial Mapping Engine", status: "IN PROGRESS", project: "Spatial Core",
    assignedBy: "Marcus Wright", dueDate: "Oct 24", startDate: "Oct 15, 2024", fullDueDate: "Oct 24, 2024",
    progress: 85, locked: false, priority: "HIGH",
    description: "Build the spatial mapping layer for VisionOS using LiDAR sensor data. Optimize render pipeline for sub-10ms frame latency on target hardware.",
    attachments: [
      { name: "spatial_spec.pdf", date: "OCT 15", size: "1.8MB" },
    ],
    lastActivity: "2h ago",
  },
  {
    id: 3, name: "Glassmorphism UI Component Audit", status: "ASSIGNED", project: "Design System",
    assignedBy: "Kyle B.", dueDate: "Nov 02", startDate: "Oct 28, 2024", fullDueDate: "Nov 02, 2024",
    progress: 0, locked: false, priority: "MEDIUM",
    description: "Audit all glassmorphism components in the design system for accessibility compliance and cross-browser consistency. Document any visual regressions.",
    attachments: [],
    lastActivity: "1d ago",
  },
  {
    id: 4, name: "Legacy Database Migration API", status: "PENDING REVIEW", project: "Backend Ops",
    assignedBy: "John Doe", dueDate: "Oct 20", startDate: "Oct 10, 2024", fullDueDate: "Oct 20, 2024",
    progress: 100, locked: true, priority: "LOW",
    description: "Complete migration of legacy PostgreSQL tables to the new schema. All endpoints have been updated and unit tests are passing.",
    attachments: [
      { name: "migration_report.pdf", date: "OCT 20", size: "3.2MB" },
    ],
    lastActivity: "3d ago",
  },
];

const assignedByMeInitial = [
  { id: 1, name: "API Endpoint Integration",    assignedTo: "Sarah Chen",    priority: "HIGH",   status: "IN PROGRESS",    dueDate: "Oct 24, 2024", lastUpdate: "Started 2 hours ago",  description: "Integrate the new REST API endpoints into the frontend services. Ensure proper error handling, rate limiting awareness, and response caching where applicable." },
  { id: 2, name: "Q4 Design System Update",     assignedTo: "Alex Rivera",   priority: "MEDIUM", status: "PENDING REVIEW", dueDate: "Oct 28, 2024", lastUpdate: "Submitted 15m ago",    description: "Refresh the Q4 design tokens, update color palette to meet new brand guidelines, and audit all components for consistency across light and dark modes." },
  { id: 3, name: "Security Audit - AWS Layer",  assignedTo: "Jordan Smith",  priority: "HIGH",   status: "ASSIGNED",       dueDate: "Nov 02, 2024", lastUpdate: "Created yesterday",    description: "Perform a full security audit of the AWS infrastructure layer — IAM policies, S3 bucket permissions, VPC configurations, and CloudTrail logs." },
  { id: 4, name: "Compliance Document Review",  assignedTo: "Lisa Miller",   priority: "LOW",    status: "COMPLETED",      dueDate: "Oct 20, 2024", lastUpdate: "Finished 4 hours ago", description: "Review all compliance documents against the updated regulatory requirements and flag any discrepancies for legal sign-off." },
];

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const initials = (name) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const avatarColor = (name) => {
  const colors = ["bg-blue-500", "bg-purple-500", "bg-cyan-500", "bg-green-500", "bg-rose-500", "bg-orange-500"];
  return colors[name.charCodeAt(0) % colors.length];
};

const statusStyle = {
  "ASSIGNED":       "bg-blue-50 text-blue-600 border border-blue-200",
  "IN PROGRESS":    "bg-cyan-50 text-cyan-600 border border-cyan-200",
  "PENDING REVIEW": "bg-yellow-50 text-yellow-600 border border-yellow-200",
  "COMPLETED":      "bg-green-50 text-green-600 border border-green-200",
};

const priorityStyle = {
  HIGH:   { dot: "bg-red-500",    text: "text-red-500",    badge: "bg-red-50 text-red-600 border border-red-200"    },
  MEDIUM: { dot: "bg-yellow-400", text: "text-yellow-500", badge: "bg-yellow-50 text-yellow-600 border border-yellow-200" },
  LOW:    { dot: "bg-blue-400",   text: "text-blue-500",   badge: "bg-blue-50 text-blue-600 border border-blue-200" },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const Avatar = ({ name, size = "w-7 h-7" }) => (
  <div className={`${size} ${avatarColor(name)} rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
    {initials(name)}
  </div>
);

const StatusBadge = ({ status }) => (
  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${statusStyle[status] ?? "bg-slate-100 text-slate-600"}`}>
    {status}
  </span>
);

const ProgressBar = ({ value }) => (
  <div className="flex items-center gap-2 min-w-[80px]">
    <div className="flex-1 bg-slate-200 rounded-full h-1.5">
      <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${value}%` }} />
    </div>
    <span className="text-xs text-slate-500 w-6 text-right">{value}%</span>
  </div>
);

// ─── Task Detail Panel ────────────────────────────────────────────────────────

const fileIcon = (
  <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const TaskDetailPanel = ({ task, onClose, onSubmit }) => {
  const p = priorityStyle[task.priority] ?? priorityStyle.MEDIUM;
  const alreadySubmitted = task.status === "PENDING REVIEW" || task.status === "COMPLETED";

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-96 bg-white h-full flex flex-col shadow-2xl overflow-hidden">

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">

          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-slate-100">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-cyan-600 tracking-widest uppercase mb-1">{task.project}</p>
                <h2 className="text-base font-bold text-slate-900 leading-snug">{task.name}</h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${p.badge}`}>
                    {task.priority} PRIORITY
                  </span>
                  <StatusBadge status={task.status} />
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors flex-shrink-0 mt-0.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="px-6 py-5 space-y-6">

            {/* Description */}
            <div>
              <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">Description</p>
              <p className="text-sm text-slate-600 leading-relaxed">{task.description}</p>
            </div>

            {/* Dates */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Start Date</p>
                <p className="text-sm font-semibold text-slate-700">{task.startDate}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 mb-0.5">Due Date</p>
                <p className="text-sm font-semibold text-cyan-600">{task.fullDueDate}</p>
              </div>
            </div>

            {/* Assigned By */}
            <div className="flex items-center gap-3">
              <Avatar name={task.assignedBy} size="w-9 h-9" />
              <div>
                <p className="text-xs text-slate-400">Assigned By</p>
                <p className="text-sm font-semibold text-slate-800">{task.assignedBy} (Manager)</p>
              </div>
            </div>

            {/* Submit button */}
            {!task.locked && (
              alreadySubmitted ? (
                <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm font-bold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Submitted for Review
                </div>
              ) : (
                <button
                  onClick={() => onSubmit(task.id)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  Submit for Review
                </button>
              )
            )}

            {/* Attachments */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-slate-400 tracking-widest uppercase">Attachments</p>
                <button className="text-xs font-semibold text-blue-600 hover:underline">+ Upload Files</button>
              </div>
              {task.attachments.length === 0 ? (
                <p className="text-xs text-slate-400">No attachments yet.</p>
              ) : (
                <div className="space-y-2">
                  {task.attachments.map((file) => (
                    <div key={file.name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      {fileIcon}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-700 truncate">{file.name}</p>
                        <p className="text-xs text-slate-400">{file.date} • {file.size}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>


          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex -space-x-1">
            {["Sarah Connor", "Marcus Wright"].map((n) => (
              <div key={n} className={`w-6 h-6 rounded-full ${avatarColor(n)} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                {n[0]}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 font-medium">LAST ACTIVITY: {task.lastActivity}</p>
        </div>

      </div>
    </div>
  );
};

// ─── Assign New Task Modal ────────────────────────────────────────────────────

const priorityOptions = [
  { label: "High",   dot: "bg-red-500"    },
  { label: "Medium", dot: "bg-yellow-400" },
  { label: "Low",    dot: "bg-blue-400"   },
];

const employeeList = ["Alex Rivera", "Sarah Chen", "Jordan Smith", "Lisa Miller", "Marcus Wright", "Kyle B."];

const AssignNewTaskModal = ({ onClose, onAssign }) => {
  const [assignees,    setAssignees]    = useState([]);
  const [search,       setSearch]       = useState("");
  const [taskTitle,    setTaskTitle]    = useState("");
  const [description,  setDescription]  = useState("");
  const [priority,     setPriority]     = useState("Medium");
  const [dueDate,      setDueDate]      = useState("2024-10-24");
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [errors,       setErrors]       = useState({});

  const suggestions = employeeList.filter(
    (e) => e.toLowerCase().includes(search.toLowerCase()) && !assignees.includes(e)
  );

  const addAssignee    = (name) => { setAssignees([...assignees, name]); setSearch(""); };
  const removeAssignee = (name) => setAssignees(assignees.filter((a) => a !== name));
  const currentDot     = priorityOptions.find((p) => p.label === priority)?.dot ?? "bg-yellow-400";

  const handleSubmit = () => {
    const errs = {};
    if (assignees.length === 0) errs.assignees = "Please select at least one employee.";
    if (!taskTitle.trim())      errs.taskTitle  = "Task title is required.";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    onAssign({
      id:          Date.now(),
      name:        taskTitle.trim(),
      assignedTo:  assignees[0],
      priority:    priority.toUpperCase(),
      status:      "ASSIGNED",
      dueDate:     formatDate(dueDate),
      lastUpdate:  "Just now",
      description: description.trim() || "No description provided.",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-slate-900">Assign New Task</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Assign To */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Assign To</label>
          <div className="flex flex-wrap items-center gap-1.5 min-h-[42px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all">
            {assignees.map((name) => (
              <span key={name} className="flex items-center gap-1 bg-cyan-100 text-cyan-700 text-xs font-semibold px-2 py-1 rounded-lg">
                <span className={`w-3 h-3 rounded-full ${avatarColor(name)} flex-shrink-0`} />
                {name}
                <button onClick={() => removeAssignee(name)} className="ml-0.5 hover:text-cyan-900">×</button>
              </span>
            ))}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={assignees.length === 0 ? "Search employee by name..." : ""}
              className="flex-1 min-w-[140px] text-sm outline-none placeholder-slate-400"
            />
          </div>
          {search && suggestions.length > 0 && (
            <div className="mt-1 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
              {suggestions.map((e) => (
                <button key={e} onClick={() => addAssignee(e)} className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left">
                  <span className={`w-5 h-5 rounded-full ${avatarColor(e)} flex items-center justify-center text-white text-xs font-bold`}>{e[0]}</span>
                  {e}
                </button>
              ))}
            </div>
          )}
          {errors.assignees && <p className="mt-1 text-xs text-red-500">{errors.assignees}</p>}
        </div>

        {/* Task Title */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Task Title</label>
          <input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Enter task title..."
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
          />
          {errors.taskTitle && <p className="mt-1 text-xs text-red-500">{errors.taskTitle}</p>}
        </div>

        {/* Task Description */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Task Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the task in detail..."
            rows={3}
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none"
          />
        </div>

        {/* Priority + Due Date */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Priority</label>
            <button
              type="button"
              onClick={() => setPriorityOpen(!priorityOpen)}
              className="w-full flex items-center justify-between gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 bg-white focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${currentDot}`} />
                {priority}
              </div>
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {priorityOpen && (
              <div className="absolute z-10 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
                {priorityOptions.map((opt) => (
                  <button key={opt.label} onClick={() => { setPriority(opt.label); setPriorityOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 text-left">
                    <span className={`w-2 h-2 rounded-full ${opt.dot}`} />{opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">Cancel</button>
          <button onClick={handleSubmit} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            Assign Task
          </button>
        </div>

      </div>
    </div>
  );
};

// ─── Assigned to Me Tab ───────────────────────────────────────────────────────

const AssignedToMe = () => {
  const [tasks, setTasks]               = useState(assignedToMeInitial);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleSubmit = (id) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status: "PENDING REVIEW" } : t));
    setSelectedTask((prev) => ({ ...prev, status: "PENDING REVIEW" }));
  };

  return (
    <div>
      {/* Task Detail Panel */}
      {selectedTask && <TaskDetailPanel task={selectedTask} onClose={() => setSelectedTask(null)} onSubmit={handleSubmit} />}

      {/* Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 tracking-wider uppercase">Task Name</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-400 tracking-wider uppercase">Status</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-400 tracking-wider uppercase">Project</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-400 tracking-wider uppercase">Assigned By</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-400 tracking-wider uppercase">Due Date</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-400 tracking-wider uppercase">Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tasks.map((task) => (
              <tr
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className={`hover:bg-slate-50 transition-colors cursor-pointer ${task.locked ? "opacity-60" : ""}`}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {task.locked ? (
                      <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0" />
                    )}
                    <span className={`font-semibold text-slate-800 ${task.locked ? "line-through text-slate-400" : ""}`}>{task.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4"><StatusBadge status={task.status} /></td>
                <td className="px-4 py-4 text-sm text-slate-500">{task.project}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Avatar name={task.assignedBy} />
                    <span className="text-sm text-slate-700">{task.assignedBy}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className={`text-sm font-semibold ${task.dueDate === "Oct 24" || task.dueDate === "Oct 20" ? "text-red-500" : "text-slate-700"}`}>{task.dueDate}</span>
                  </div>
                </td>
                <td className="px-4 py-4"><ProgressBar value={task.progress} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Assigned By Me — Detail Panel ───────────────────────────────────────────

const AssignedByMeDetailPanel = ({ task, onClose }) => {
  const [comment, setComment] = useState("");
  const p = priorityStyle[task.priority] ?? priorityStyle.MEDIUM;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="relative w-96 bg-white h-full flex flex-col shadow-2xl overflow-hidden">

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">

          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-slate-100">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-cyan-600 tracking-widest uppercase mb-1">Assigned by You</p>
                <h2 className="text-base font-bold text-slate-900 leading-snug">{task.name}</h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${p.badge}`}>
                    {task.priority} PRIORITY
                  </span>
                  <StatusBadge status={task.status} />
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors flex-shrink-0 mt-0.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="px-6 py-5 space-y-6">

            {/* Description */}
            <div>
              <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">Description</p>
              <p className="text-sm text-slate-600 leading-relaxed">{task.description}</p>
            </div>

            {/* Due Date */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Due Date</p>
                <p className="text-sm font-semibold text-cyan-600">{task.dueDate}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 mb-0.5">Last Update</p>
                <p className="text-sm font-semibold text-slate-700">{task.lastUpdate}</p>
              </div>
            </div>

            {/* Assigned To */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <Avatar name={task.assignedTo} size="w-9 h-9" />
              <div>
                <p className="text-xs text-slate-400">Assigned To</p>
                <p className="text-sm font-semibold text-slate-800">{task.assignedTo}</p>
              </div>
            </div>

            {/* Comments */}
            <div>
              <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">Add a Note</p>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Leave a comment or update for the assignee..."
                rows={3}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none"
              />
              {comment.trim() && (
                <button className="mt-2 w-full py-2 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors">
                  Post Comment
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex -space-x-1">
            <div className={`w-6 h-6 rounded-full ${avatarColor(task.assignedTo)} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
              {task.assignedTo[0]}
            </div>
          </div>
          <p className="text-xs text-slate-400 font-medium">LAST UPDATE: {task.lastUpdate}</p>
        </div>

      </div>
    </div>
  );
};

// ─── Assigned by Me Tab ───────────────────────────────────────────────────────

const AssignedByMe = () => {
  const [modalOpen, setModalOpen]     = useState(false);
  const [tasks, setTasks]             = useState(assignedByMeInitial);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAssign = (task) => {
    setTasks((prev) => [task, ...prev]);
    setModalOpen(false);
  };

  return (
    <div>
      {selectedTask && <AssignedByMeDetailPanel task={selectedTask} onClose={() => setSelectedTask(null)} />}
      {modalOpen && <AssignNewTaskModal onClose={() => setModalOpen(false)} onAssign={handleAssign} />}
      <div className="flex items-center justify-end mb-4">
        <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Assign New Task
        </button>
      </div>
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 tracking-wider uppercase">Task Title</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-400 tracking-wider uppercase">Assigned To</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-400 tracking-wider uppercase">Priority</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-400 tracking-wider uppercase">Status</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-400 tracking-wider uppercase">Due Date</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-400 tracking-wider uppercase">Last Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tasks.map((task) => {
              const p = priorityStyle[task.priority];
              return (
                <tr key={task.id} onClick={() => setSelectedTask(task)} className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${p.dot}`} />
                      <span className="font-semibold text-slate-800">{task.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Avatar name={task.assignedTo} />
                      <span className="text-sm text-slate-700">{task.assignedTo}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${p.dot}`} />
                      <span className={`text-xs font-bold ${p.text}`}>{task.priority}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><StatusBadge status={task.status} /></td>
                  <td className="px-4 py-4 text-sm text-slate-600">{task.dueDate}</td>
                  <td className="px-4 py-4 text-xs text-slate-400">{task.lastUpdate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export const TasksContent = () => {
  const [tab, setTab] = useState("assigned-to-me");
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">My Tasks</h2>
        <p className="text-sm text-slate-500 mt-0.5">Manage and monitor your tasks across all projects.</p>
      </div>
      <div className="flex items-center gap-1 border-b border-slate-200">
        <button onClick={() => setTab("assigned-to-me")} className={`px-4 py-2.5 text-sm font-semibold transition-colors border-b-2 -mb-px ${tab === "assigned-to-me" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}>
          Assigned to Me
        </button>
        <button onClick={() => setTab("assigned-by-me")} className={`px-4 py-2.5 text-sm font-semibold transition-colors border-b-2 -mb-px ${tab === "assigned-by-me" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}>
          Assigned by Me
        </button>
      </div>
      {tab === "assigned-to-me" && <AssignedToMe />}
      {tab === "assigned-by-me" && <AssignedByMe />}
    </div>
  );
};

const MyTasksPage = () => <TasksContent />;
export default MyTasksPage;
