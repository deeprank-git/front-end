"use client";
import { useSidebar } from "../SidebarContext";
import { TasksContent } from "../my-tasks/page";

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

const recentTasks = [
  { name: "Refactor Auth Middleware",    project: "Visionary Project · Enterprise Dashboard", tag: "Coding",      tagColor: "bg-blue-100 text-blue-700" },
  { name: "Design Glassmorphism UI Kit", project: "DeepRank Core · Design System",            tag: "Design",      tagColor: "bg-purple-100 text-purple-700" },
  { name: "Sync with Marketing Team",    project: "Global Q3 · Marketing",                    tag: "Meeting",     tagColor: "bg-cyan-100 text-cyan-700" },
  { name: "Update API Documentation",    project: "Backend API · Documentation",               tag: "Docs",        tagColor: "bg-slate-100 text-slate-600" },
  { name: "Optimize Database Queries",   project: "Performance Patch · Core",                  tag: "Performance", tagColor: "bg-orange-100 text-orange-700" },
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

// ─── Section Components ───────────────────────────────────────────────────────

const DashboardContent = () => (
  <div className="space-y-5">

    {/* Greeting */}
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm px-7 py-6 flex items-center justify-between">
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

      {/* Recent Tasks */}
      <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900">Recent Tasks Summary</h3>
          <a href="/employee/my-tasks" className="text-xs font-medium text-blue-600 hover:underline">View All</a>
        </div>
        <div className="space-y-1">
          {recentTasks.map((task) => (
            <div key={task.name} className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0">
              <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{task.name}</p>
                <p className="text-xs text-slate-400 truncate">{task.project}</p>
              </div>
              <span className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${task.tagColor}`}>{task.tag}</span>
            </div>
          ))}
        </div>
      </div>

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

const Placeholder = ({ label }) => (
  <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-14 flex flex-col items-center justify-center text-center">
    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
    </div>
    <p className="text-sm font-semibold text-slate-700">{label}</p>
    <p className="text-xs text-slate-400 mt-1">This section is coming soon.</p>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const EmployeeDashboardPage = () => {
  const { activeSection } = useSidebar();

  return (
    <>
      {activeSection === "dashboard" && <DashboardContent />}
      {activeSection === "tasks"     && <TasksContent />}
      {activeSection === "teams"     && <Placeholder label="Teams" />}
      {activeSection === "settings"  && <Placeholder label="Settings" />}
    </>
  );
};

export default EmployeeDashboardPage;
