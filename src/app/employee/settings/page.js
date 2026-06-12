"use client";
import { useState } from "react";

// ─── Static user data (matches Navbar avatar) ─────────────────────────────────
const USER = {
  name:       "Adrian Cole",
  email:      "adrian.cole@deeprank.io",
  role:       "Employee",
  department: "Engineering",
  initial:    "A",
  joined:     "March 2023",
};

// ─── Toggle switch ────────────────────────────────────────────────────────────
const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none ${checked ? "bg-blue-600" : "bg-slate-200"}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-4" : "translate-x-0.5"}`}
    />
  </button>
);

// ─── Section row ──────────────────────────────────────────────────────────────
const Row = ({ label, sub, children }) => (
  <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
    <div>
      <p className="text-sm font-semibold text-slate-800">{label}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
    <div className="flex-shrink-0 ml-6">{children}</div>
  </div>
);

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV = [
  {
    id: "profile",
    label: "Profile",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    id: "security",
    label: "Security",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];

// ─── Profile section ──────────────────────────────────────────────────────────
const ProfileSection = () => {
  const [name,  setName]  = useState(USER.name);
  const [bio,   setBio]   = useState("Frontend-focused engineer passionate about clean UIs and developer tooling.");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Avatar card */}
      <div className="flex items-center gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-sm shadow-blue-500/20">
          {USER.initial}
        </div>
        <div>
          <p className="text-base font-bold text-slate-900">{USER.name}</p>
          <p className="text-sm text-slate-500 mt-0.5">{USER.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">{USER.role}</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{USER.department}</span>
            <span className="text-[11px] text-slate-400">Joined {USER.joined}</span>
          </div>
        </div>
      </div>

      {/* Editable fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email Address</label>
          <input
            value={USER.email}
            readOnly
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-400 bg-slate-50 cursor-not-allowed"
          />
          <p className="text-[11px] text-slate-400 mt-1">Email is managed by your organisation.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Role</label>
            <input
              value={USER.role}
              readOnly
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-400 bg-slate-50 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Department</label>
            <input
              value={USER.department}
              readOnly
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-400 bg-slate-50 cursor-not-allowed"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        {saved && <span className="text-xs font-semibold text-green-600">Changes saved!</span>}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

// ─── Notifications section ────────────────────────────────────────────────────
const NotificationsSection = () => {
  const [prefs, setPrefs] = useState({
    taskAssigned:   true,
    taskUpdated:    true,
    dueDateReminder:true,
    projectUpdates: false,
    teamMentions:   true,
    weeklyDigest:   false,
  });

  const toggle = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="space-y-1">
      <Row label="Task assigned to me" sub="Get notified when a manager assigns you a new task">
        <Toggle checked={prefs.taskAssigned} onChange={() => toggle("taskAssigned")} />
      </Row>
      <Row label="Task status updated" sub="Receive updates when a task you're on changes status">
        <Toggle checked={prefs.taskUpdated} onChange={() => toggle("taskUpdated")} />
      </Row>
      <Row label="Due date reminders" sub="Reminders 24 hours before a task is due">
        <Toggle checked={prefs.dueDateReminder} onChange={() => toggle("dueDateReminder")} />
      </Row>
      <Row label="Project updates" sub="Updates when a project you're part of is modified">
        <Toggle checked={prefs.projectUpdates} onChange={() => toggle("projectUpdates")} />
      </Row>
      <Row label="Team mentions" sub="Notify me when someone mentions me in comments">
        <Toggle checked={prefs.teamMentions} onChange={() => toggle("teamMentions")} />
      </Row>
      <Row label="Weekly digest" sub="A summary of your task activity every Monday">
        <Toggle checked={prefs.weeklyDigest} onChange={() => toggle("weeklyDigest")} />
      </Row>
    </div>
  );
};

// ─── Appearance section ───────────────────────────────────────────────────────
const AppearanceSection = () => {
  const [theme,    setTheme]    = useState("light");
  const [density,  setDensity]  = useState("comfortable");
  const [language, setLanguage] = useState("English");

  const ThemeCard = ({ value, label, preview }) => (
    <button
      onClick={() => setTheme(value)}
      className={`flex-1 rounded-xl border-2 p-3 text-left transition-all ${theme === value ? "border-blue-500 bg-blue-50/40" : "border-slate-200 hover:border-slate-300"}`}
    >
      <div className={`w-full h-14 rounded-lg mb-2.5 ${preview}`} />
      <p className="text-xs font-semibold text-slate-700">{label}</p>
      {theme === value && <p className="text-[11px] text-blue-600 font-semibold mt-0.5">Active</p>}
    </button>
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Theme</p>
        <div className="flex gap-3">
          <ThemeCard value="light"  label="Light"  preview="bg-slate-100 border border-slate-200" />
          <ThemeCard value="dark"   label="Dark"   preview="bg-slate-800" />
          <ThemeCard value="system" label="System" preview="bg-gradient-to-r from-slate-100 to-slate-800" />
        </div>
      </div>

      <div className="border-t border-slate-100 pt-5 space-y-1">
        <Row label="Sidebar density" sub="How compact the sidebar navigation appears">
          <div className="flex items-center gap-2">
            {["compact", "comfortable"].map((d) => (
              <button
                key={d}
                onClick={() => setDensity(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${density === d ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {d}
              </button>
            ))}
          </div>
        </Row>
        <Row label="Language" sub="Display language for the interface">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-sm font-medium text-slate-700 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
          >
            {["English", "Spanish", "French", "German", "Japanese"].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </Row>
      </div>
    </div>
  );
};

// ─── Security section ─────────────────────────────────────────────────────────
const SecuritySection = () => {
  const [current,  setCurrent]  = useState("");
  const [newPw,    setNewPw]    = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [twoFA,    setTwoFA]    = useState(false);
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState(false);

  const handlePasswordSave = () => {
    if (!current || !newPw || !confirm) { setError("All fields are required."); return; }
    if (newPw !== confirm)               { setError("New passwords do not match."); return; }
    if (newPw.length < 8)                { setError("Password must be at least 8 characters."); return; }
    setError("");
    setSuccess(true);
    setCurrent(""); setNewPw(""); setConfirm("");
    setTimeout(() => setSuccess(false), 2500);
  };

  const PwField = ({ label, value, onChange }) => (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
        placeholder="••••••••"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Change password */}
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Change Password</p>
        <div className="space-y-4">
          <PwField label="Current Password"  value={current} onChange={setCurrent} />
          <PwField label="New Password"      value={newPw}   onChange={setNewPw}   />
          <PwField label="Confirm Password"  value={confirm} onChange={setConfirm} />
          {error   && <p className="text-xs text-red-500 font-medium">{error}</p>}
          {success && <p className="text-xs text-green-600 font-semibold">Password updated successfully!</p>}
          <div className="flex justify-end">
            <button
              onClick={handlePasswordSave}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>

      {/* 2FA + active session */}
      <div className="border-t border-slate-100 pt-5 space-y-1">
        <Row label="Two-factor authentication" sub="Add an extra layer of security to your account">
          <Toggle checked={twoFA} onChange={setTwoFA} />
        </Row>
        <Row label="Active session" sub="This device — Chrome on Windows · Last active just now">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-600">Active</span>
        </Row>
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [active, setActive] = useState("profile");

  const content = {
    profile:       <ProfileSection />,
    notifications: <NotificationsSection />,
    appearance:    <AppearanceSection />,
    security:      <SecuritySection />,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-slate-900">Settings</h1>

      <div className="flex gap-6 items-start">
        {/* Left nav */}
        <div className="w-52 flex-shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold transition-colors text-left ${
                active === item.id
                  ? "bg-blue-50/60 text-blue-600 border-l-2 border-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className={active === item.id ? "text-blue-600" : "text-slate-400"}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Right content */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 min-w-0">
          <h2 className="text-base font-bold text-slate-900 mb-5">
            {NAV.find((n) => n.id === active)?.label}
          </h2>
          {content[active]}
        </div>
      </div>
    </div>
  );
}
