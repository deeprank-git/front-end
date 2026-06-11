"use client";
import { useEffect, useState } from "react";
import { saveEmployee } from "@/utils/localStorage";

export default function AddEmployeeModal({ isOpen, onClose, onEmployeeAdded }) {
  const [formData, setFormData] = useState({ fullName: "", email: "", contact: "", role: "" });
  const [animate, setAnimate] = useState(false);

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
    const newEmployee = saveEmployee({
      fullName: formData.fullName,
      email: formData.email,
      contact: formData.contact,
      role: formData.role,
      avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000000)}?w=100&auto=format&fit=crop&q=80`,
      department: "Not specified",
      joinDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      assignedTasks: 0,
      completed: 0,
      tasksList: [],
    });

    console.log("Employee added to localStorage:", newEmployee);
    
    // Trigger callback to refresh parent component
    if (onEmployeeAdded) onEmployeeAdded(newEmployee);
    
    // Reset form
    setFormData({ fullName: "", email: "", contact: "", role: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300">
      {/* Glassmorphic Backdrop */}
      <div 
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300 ${animate ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose} 
      />
      
      {/* Modal Box */}
      <div className={`relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl border border-slate-100 transform transition-all duration-300 ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <button onClick={onClose} className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <h3 className="text-xl font-bold text-slate-900">Add New Employee</h3>
        <p className="mt-1 text-xs text-slate-500">Onboard a new member to the Vantage executive suite.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1.5">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </span>
              <input type="text" placeholder="e.g. Alexander Sterling" required className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none transition-all" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1.5">Work Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </span>
              <input type="email" placeholder="a.sterling@vantage.corp" required className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none transition-all" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1.5">Contact Number</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </span>
                <input type="tel" placeholder="+1 (555) 000-0000" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none transition-all" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1.5">Job Role</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </span>
                <select className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-8 text-sm text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none transition-all" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                  <option value="">Select Role</option>
                  <option value="frontend">Frontend Engineer</option>
                  <option value="manager">Product Manager</option>
                  <option value="designer">UI/UX Designer</option>
                </select>
                <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">Cancel</button>
            <button type="submit" className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 shadow-md shadow-blue-500/10 flex items-center gap-1.5 transition-colors">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20h10a4 4 0 00-4-4H5a4 4 0 00-4 4z" /></svg>
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}