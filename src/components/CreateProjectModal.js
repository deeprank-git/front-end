"use client";
import { useEffect, useState } from "react";
import { saveProject } from "@/utils/localStorage";

export default function CreateProjectModal({ isOpen, onClose, onProjectCreated }) {
  const [animate, setAnimate] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    description: "", 
    priority: "Medium Priority", 
    team: [], 
    startDate: "", 
    dueDate: "" 
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to localStorage
    const newProject = saveProject({
      name: formData.name,
      description: formData.description,
      priority: formData.priority,
      team: formData.team,
      startDate: formData.startDate,
      dueDate: formData.dueDate,
      status: "Active",
    });

    console.log("Project created:", newProject);
    
    if (onProjectCreated) onProjectCreated(newProject);
    
    setFormData({ name: "", description: "", priority: "Medium Priority", team: [], startDate: "", dueDate: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300">
      <div 
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300 ${animate ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose} 
      />

      <div className={`relative w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl border border-slate-100 transform transition-all duration-300 ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <button onClick={onClose} className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <h3 className="text-xl font-bold text-slate-900">Create New Project</h3>
        <p className="text-xs text-slate-500 mt-0.5">Initialize a new strategic initiative within Vantage.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-[10px] font-bold tracking-wider text-blue-600 uppercase flex items-center gap-1.5 mb-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              Project Name
            </label>
            <input type="text" required placeholder="e.g. Q4 Infrastructure Modernization" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full rounded-xl border border-slate-200 py-2.5 px-4 text-sm text-slate-900 focus:border-blue-500 focus:outline-none transition-all" />
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-wider text-blue-600 uppercase flex items-center gap-1.5 mb-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
              Description
            </label>
            <textarea rows={3} placeholder="Define the high-level objectives and expected outcomes..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full rounded-xl border border-slate-200 py-2.5 px-4 text-sm text-slate-900 focus:border-blue-500 focus:outline-none transition-all resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold tracking-wider text-blue-600 uppercase flex items-center gap-1.5 mb-1.5">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Priority Level
              </label>
              <div className="relative">
                <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})} className="w-full appearance-none rounded-xl border border-slate-200 py-2.5 px-4 text-sm text-slate-700 focus:border-blue-500 focus:outline-none transition-all">
                  <option>Medium Priority</option>
                  <option>High Priority</option>
                  <option>Critical Priority</option>
                </select>
                <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold tracking-wider text-blue-600 uppercase flex items-center gap-1.5 mb-1.5">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                Assign Team
              </label>
              <div className="flex flex-wrap items-center gap-1.5 border border-slate-200 rounded-xl px-3 py-1.5 bg-white min-h-10.5">
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded-md">Sarah C. <svg className="h-3 w-3 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" /></svg></span>
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded-md">Marcus V. <svg className="h-3 w-3 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" /></svg></span>
                <input type="text" placeholder="Add member..." className="outline-none border-none text-xs text-slate-800 p-1 flex-1 min-w-15" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold tracking-wider text-blue-600 uppercase flex items-center gap-1.5 mb-1.5">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Start Date
              </label>
              <input type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} className="w-full rounded-xl border border-slate-200 py-2.5 px-4 text-xs text-slate-700 focus:border-blue-500 focus:outline-none transition-all" />
            </div>
            <div>
              <label className="text-[10px] font-bold tracking-wider text-blue-600 uppercase flex items-center gap-1.5 mb-1.5">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Due Date
              </label>
              <input type="date" required value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="w-full rounded-xl border border-slate-200 py-2.5 px-4 text-xs text-slate-700 focus:border-blue-500 focus:outline-none transition-all" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-wider text-blue-600 uppercase flex items-center gap-1.5 mb-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Project Cover <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
              <svg className="h-6 w-6 text-blue-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              <span className="text-xs text-slate-500 font-medium">Click to upload or drag and drop thumbnail</span>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
            <button type="submit" className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 shadow-md transition-colors flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}