"use client";
import { useEffect, useState } from "react";
import { saveTask, updateEmployee, getEmployees } from "@/utils/localStorage";

export default function AssignTaskModal({ isOpen, onClose, onTaskAssigned, allEmployees = [], initialEmployeeId = null }) {
  const [animate, setAnimate] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(initialEmployeeId || "");
  const [formData, setFormData] = useState({ project: "", title: "", description: "", priority: "Medium", startDate: "", dueDate: "" });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimate(true), 10);
      if (initialEmployeeId) setSelectedEmployeeId(initialEmployeeId);
    } else {
      setAnimate(false);
    }
  }, [isOpen, initialEmployeeId]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedEmployeeId) {
      alert("Please select an employee to assign the task to");
      return;
    }

    // Get selected employee details
    const selectedEmp = allEmployees.find(emp => emp.id === parseInt(selectedEmployeeId));
    if (!selectedEmp) {
      alert("Employee not found");
      return;
    }

    // Save task to localStorage
    const newTask = saveTask({
      project: formData.project,
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      startDate: formData.startDate,
      dueDate: formData.dueDate,
      assigneeId: parseInt(selectedEmployeeId),
      assigneeName: selectedEmp.fullName || selectedEmp.name,
      status: "Pending",
    });

    // Update employee's task count
    const employees = getEmployees();
    const employee = employees.find((emp) => emp.id === parseInt(selectedEmployeeId));
    if (employee) {
      updateEmployee(parseInt(selectedEmployeeId), {
        assignedTasks: (employee.assignedTasks || 0) + 1,
        tasksList: [...(employee.tasksList || []), { id: newTask.id, title: formData.title, status: "Pending", due: formData.dueDate }],
      });
    }

    console.log("Task assigned:", newTask);
    
    if (onTaskAssigned) onTaskAssigned(newTask);
    
    setFormData({ project: "", title: "", description: "", priority: "Medium", startDate: "", dueDate: "" });
    setSelectedEmployeeId("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end transition-opacity duration-300">
      {/* Drawer Layer Glass Backdrop */}
      <div 
        className={`absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity duration-300 ${animate ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose} 
      />

      {/* Slide-out Drawer Panel Container */}
      <div className={`relative h-full w-full max-w-md bg-white shadow-2xl border-l border-slate-100 flex flex-col transform transition-transform duration-300 ease-out ${animate ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Assign Task</h3>
              <p className="text-xs text-slate-500 mt-0.5">Assigning to <span className="text-blue-600 font-medium">Alex Rivera</span></p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1.5">Select Employee</label>
              <div className="relative">
                <select value={selectedEmployeeId} onChange={(e) => setSelectedEmployeeId(e.target.value)} required className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 px-4 text-sm text-slate-700 focus:border-blue-500 focus:outline-none transition-all">
                  <option value="">-- Select an employee --</option>
                  {allEmployees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.fullName || emp.name} ({emp.role || emp.email})
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1.5">Ongoing Project</label>
              <div className="relative">
                <select value={formData.project} onChange={(e) => setFormData({...formData, project: e.target.value})} className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 px-4 text-sm text-slate-700 focus:border-blue-500 focus:outline-none transition-all">
                  <option value="">Select a project</option>
                  <option value="Horizon AI - Core Engine">Horizon AI - Core Engine</option>
                  <option value="DeepRank Dashboard System">DeepRank Dashboard System</option>
                </select>
                <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1.5">Task Title</label>
              <input type="text" required placeholder="Enter task title..." value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full rounded-xl border border-slate-200 py-2.5 px-4 text-sm text-slate-900 focus:border-blue-500 focus:outline-none transition-all" />
            </div>

            <div>
              <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1.5">Task Description</label>
              <textarea rows={4} placeholder="Describe the specific requirements and deliverables..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full rounded-xl border border-slate-200 py-2.5 px-4 text-sm text-slate-900 focus:border-blue-500 focus:outline-none transition-all resize-none" />
            </div>

            <div>
              <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1.5">Priority Level</label>
              <div className="grid grid-cols-3 gap-3">
                <button type="button" onClick={() => setFormData({...formData, priority: "Low"})} className={`py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${formData.priority === "Low" ? "border-red-300 bg-red-50 text-red-700" : "border-slate-100 bg-slate-50 text-slate-600"}`}><span className="h-1.5 w-1.5 rounded-full bg-red-400" /> Low</button>
                <button type="button" onClick={() => setFormData({...formData, priority: "Medium"})} className={`py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${formData.priority === "Medium" ? "border-amber-300 bg-amber-50 text-amber-700" : "border-slate-100 bg-slate-50 text-slate-600"}`}><span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Medium</button>
                <button type="button" onClick={() => setFormData({...formData, priority: "High"})} className={`py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${formData.priority === "High" ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-slate-100 bg-slate-50 text-slate-600"}`}><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> High</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1.5">Start Date</label>
                <input type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} className="w-full rounded-xl border border-slate-200 py-2.5 px-4 text-xs text-slate-700 focus:border-blue-500 focus:outline-none transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1.5">Due Date</label>
                <input type="date" required value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="w-full rounded-xl border border-slate-200 py-2.5 px-4 text-xs text-slate-700 focus:border-blue-500 focus:outline-none transition-all" />
              </div>
            </div>
          </form>
        </div>

        <div className="px-8 py-5 border-t border-slate-100 flex flex-col gap-3 bg-white">
          <button type="submit" onClick={handleSubmit} className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
            Assign Task
          </button>
          <button type="button" onClick={onClose} className="w-full py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">Cancel</button>
        </div>
      </div>
    </div>
  );
}