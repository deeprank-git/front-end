"use client";
import { useRouter } from "next/navigation";

const USER = {
  name:       "James Wright",
  email:      "james.wright@deeprank.io",
  role:       "Manager",
  department: "Product",
  initial:    "J",
  joined:     "January 2022",
  status:     "Active",
  workspace:  "DeepRank",
};

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="space-y-5">

      {/* Profile hero */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Banner strip */}
        <div className="h-24 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500" />

        <div className="px-6 pb-6">
          {/* Avatar overlapping banner */}
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="w-20 h-20 rounded-full bg-blue-600 border-4 border-white flex items-center justify-center text-white text-3xl font-bold shadow-md flex-shrink-0">
              {USER.initial}
            </div>
            <button
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 active:bg-red-100 transition-colors bg-white"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log Out
            </button>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{USER.name}</h2>
              <p className="text-sm text-slate-500 mt-0.5">{USER.email}</p>
              <div className="flex items-center gap-2 mt-2.5">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">{USER.role}</span>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">{USER.department}</span>
                <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {USER.status}
                </span>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">Workspace</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{USER.workspace}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Contact */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contact</p>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 mb-0.5">Email Address</p>
              <p className="text-sm font-semibold text-slate-800 truncate">{USER.email}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400 mb-0.5">Full Name</p>
              <p className="text-sm font-semibold text-slate-800">{USER.name}</p>
            </div>
          </div>
        </div>

        {/* Work */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Work</p>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 mb-0.5">Role</p>
              <p className="text-sm font-semibold text-slate-800">{USER.role}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400 mb-0.5">Department</p>
              <p className="text-sm font-semibold text-slate-800">{USER.department}</p>
            </div>
          </div>
        </div>

        {/* Account */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account</p>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 mb-0.5">Member Since</p>
              <p className="text-sm font-semibold text-slate-800">{USER.joined}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400 mb-0.5">Account Status</p>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {USER.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Workspace card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-500/20">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">{USER.workspace}</p>
            <p className="text-xs text-slate-400 mt-0.5">Manager Suite · {USER.department}</p>
          </div>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">Admin</span>
      </div>

    </div>
  );
}
