// Reusable navbar for both Employee and Manager layouts.
// Props:
//   onMenuClick  — pass a handler to show the hamburger button
//   sectionTitle — shown after the DeepRank | divider (e.g. "Dashboard")
//   userInitial  — single letter shown in the avatar circle (e.g. "A")
//   userName     — full name shown on hover / screen readers

const Navbar = ({ onMenuClick, sectionTitle, userInitial = "U", userName = "User" }) => (
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

        {sectionTitle && (
          <>
            <span className="text-slate-300 font-light text-lg">|</span>
            <span className="text-sm font-semibold text-slate-600">{sectionTitle}</span>
          </>
        )}
      </div>

      {/* Right — Search, Bell, Avatar */}
      <div className="flex items-center gap-2">

        <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors" aria-label="Search">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors" aria-label="Notifications">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
        </button>

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

export default Navbar;
