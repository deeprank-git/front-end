"use client";

import { useState, useEffect } from "react";
import AssignTaskModal from "@/components/AssignTaskModal";
import AddEmployeeModal from "@/components/AddEmployeeModal";
import { getEmployees } from "@/utils/localStorage";

const EmployeesPage = () => {
  // State for search filter
  const [searchQuery, setSearchQuery] = useState("");
  
  // States to manage opening/closing modals & dynamic profiles
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isAssignTaskOpen, setIsAssignTaskOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Dummy data matching the Figma layout details
  const dummyEmployees = [
    {
      id: 1,
      name: "Adrian Thorne",
      email: "adrian.t@vantage.io",
      role: "Lead Architect",
      assignedTasks: 12,
      completed: 75,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      phone: "+1 (555) 234-5678",
      department: "Engineering",
      joinDate: "Jan 12, 2024",
      tasksList: [
        { id: "t1", title: "Refactor core authentication engine", status: "In Progress", due: "June 18" },
        { id: "t2", title: "Optimize Redis caching layers for API gateways", status: "Completed", due: "June 05" }
      ]
    },
    {
      id: 2,
      name: "Sienna Vance",
      email: "sienna.v@vantage.io",
      role: "Senior UX Designer",
      assignedTasks: 8,
      completed: 45,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      phone: "+1 (555) 876-5432",
      department: "Product Design",
      joinDate: "Mar 22, 2024",
      tasksList: [
        { id: "t3", title: "Figma design system revamp for enterprise suite", status: "In Progress", due: "June 25" }
      ]
    },
    {
      id: 3,
      name: "Marcus Kane",
      email: "marcus.k@vantage.io",
      role: "DevOps Engineer",
      assignedTasks: 15,
      completed: 90,
      avatar: "https://images.unsplash.com/photo-139893122415-993d6d53f2cb?w=100&auto=format&fit=crop&q=80",
      phone: "+1 (555) 432-1098",
      department: "Infrastructure",
      joinDate: "Oct 05, 2023",
      tasksList: [
        { id: "t4", title: "Migrate multi-region Kubernetes nodes", status: "Completed", due: "May 29" }
      ]
    },
  ];

  const [employees, setEmployees] = useState(dummyEmployees);

  // Load from localStorage on mount - prevents hydration mismatch
  useEffect(() => {
    const storedEmployees = getEmployees();
    setEmployees([...dummyEmployees, ...storedEmployees]);
    setIsHydrated(true);
  }, []);

  // Handle new employee added
  const handleEmployeeAdded = (newEmployee) => {
    setEmployees(prev => [...prev, newEmployee]);
  };

  // Handle task assigned
  const handleTaskAssigned = (newTask) => {
    console.log("Task assigned:", newTask);
    // Refresh employee data from localStorage
    const updated = getEmployees();
    const updatedEmployee = updated.find(e => e.id === newTask.assigneeId);
    if (updatedEmployee) {
      setEmployees(prev => 
        prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp)
      );
      setSelectedEmployee(updatedEmployee);
    }
  };

  // Filter logic: Matches search input against employee names
  const filteredEmployees = employees.filter((employee) =>
    (employee.fullName || employee.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-0 sm:p-1 w-full space-y-4 sm:space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Employees</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your visionary talent and workforce velocity.
          </p>
        </div>
        
        {/* Actions Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <button
            onClick={() => { setSelectedEmployee(null); setIsAssignTaskOpen(true); }}
            className="px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition shadow-sm"
          >
            Assign Task
          </button>
          <button
            onClick={() => setIsAddEmployeeOpen(true)}
            className="px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition shadow-sm flex items-center justify-center gap-1.5"
          >
            <span className="text-base font-medium">+</span> <span className="hidden sm:inline">Add</span> Employee
          </button>
        </div>
      </div>

      {/* Filter and Search Bar Control */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder-slate-400"
          />
          <span className="absolute right-3 top-2.5 text-slate-400 pointer-events-none">🔍</span>
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <select className="px-3 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:border-slate-300 focus:outline-none">
            <option>Sort by Name: A-Z</option>
            <option>Sort by Name: Z-A</option>
          </select>
        </div>
      </div>

      {/* Employees Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto\">\n          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] sm:text-xs font-bold tracking-wider text-slate-400 uppercase">
                <th className="py-3 sm:py-4 px-3 sm:px-6">Employee Name</th>
                <th className="py-3 sm:py-4 px-3 sm:px-6">Job Role</th>
                <th className="py-3 sm:py-4 px-3 sm:px-6 text-center">Tasks</th>
                <th className="py-3 sm:py-4 px-3 sm:px-6">Completed</th>
                <th className="py-3 sm:py-4 px-3 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    onClick={() => setSelectedEmployee(emp)}
                    className="hover:bg-slate-50/60 transition-colors group cursor-pointer border-b border-slate-50"
                  >
                    {/* Name & Email Field */}
                    <td className="py-3 sm:py-4 px-3 sm:px-6 flex items-center gap-2 sm:gap-3">
                      <img
                        src={emp.avatar}
                        alt={emp.fullName || emp.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-slate-100 bg-slate-100 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate text-xs sm:text-sm">
                          {emp.fullName || emp.name}
                        </div>
                        <div className="text-[10px] sm:text-xs text-slate-400 truncate hidden sm:block">{emp.email}</div>
                      </div>
                    </td>
                    
                    {/* Job Role */}
                    <td className="py-3 sm:py-4 px-3 sm:px-6 font-medium text-slate-600 hidden sm:table-cell text-xs sm:text-sm">{emp.role}</td>
                    
                    {/* Tasks Count */}
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-center font-semibold text-slate-800 text-xs sm:text-sm">
                      {emp.assignedTasks}
                    </td>
                    
                    {/* Completed Progress Percentage Bar */}
                    <td className="py-3 sm:py-4 px-3 sm:px-6 min-w-20 sm:min-w-35">
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-slate-100 rounded-full h-2 max-w-25">
                          <div
                            className={`h-2 rounded-full ${
                              emp.completed > 70
                                ? "bg-emerald-500"
                                : emp.completed > 40
                                ? "bg-blue-500"
                                : "bg-rose-500"
                            }`}
                            style={{ width: `${emp.completed}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-500">{emp.completed}%</span>
                      </div>
                    </td>
                    
                    {/* Actions Menu Trigger */}
                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition">
                        •••
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400 font-medium">
                    No records match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Table Pagination Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500 bg-slate-50/30">
          <div>Showing {filteredEmployees.length} of {employees.length} visionary employees</div>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1.5 border border-slate-200 rounded-lg hover:bg-white disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white">2</button>
            <button className="px-2.5 py-1.5 border border-slate-200 rounded-lg hover:bg-white">Next</button>
          </div>
        </div>
      </div>

      {/* Employee Detail Slide-over Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col animate-fade-in">
            
            {/* Header / Banner area */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-3xl">
              <div className="flex items-center gap-4">
                <img
                  src={selectedEmployee.avatar}
                  alt={selectedEmployee.fullName || selectedEmployee.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedEmployee.fullName || selectedEmployee.name}</h2>
                  <p className="text-xs font-semibold text-blue-600 tracking-wide uppercase">
                    {selectedEmployee.role} — {selectedEmployee.department}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-2 text-lg rounded-xl hover:bg-slate-100 transition"
              >
                ✕
              </button>
            </div>

            {/* Profile Content Body */}
            <div className="p-6 space-y-6">
              {/* Detailed Specs Fields Block */}
              <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-100 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-medium block uppercase tracking-wider">Email Address</span>
                  <span className="font-bold text-slate-800 text-sm mt-0.5 block">{selectedEmployee.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block uppercase tracking-wider">Contact Phone</span>
                  <span className="font-bold text-slate-800 text-sm mt-0.5 block">{selectedEmployee.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block uppercase tracking-wider">Department</span>
                  <span className="font-bold text-slate-800 text-sm mt-0.5 block">{selectedEmployee.department}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block uppercase tracking-wider">Onboarding Date</span>
                  <span className="font-bold text-slate-800 text-sm mt-0.5 block">{selectedEmployee.joinDate}</span>
                </div>
              </div>

              {/* Progress Chart Statistics Panel */}
              <div className="border border-slate-100 rounded-2xl p-5 bg-white shadow-sm space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                  <span className="uppercase tracking-wider text-slate-400">Task Velocity Breakdown</span>
                  <span className="text-blue-600 text-sm">{selectedEmployee.completed}% Overall Completion</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-2.5 rounded-full transition-all" style={{ width: `${selectedEmployee.completed}%` }} />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 text-center text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="text-slate-400 font-bold uppercase tracking-wide">Total Assigned</div>
                    <div className="text-lg font-black text-slate-800 mt-0.5">{selectedEmployee.assignedTasks}</div>
                  </div>
                  <div className="bg-emerald-50/40 p-3 rounded-xl border border-emerald-100/30">
                    <div className="text-emerald-600 font-bold uppercase tracking-wide">Pending Metrics</div>
                    <div className="text-lg font-black text-emerald-600 mt-0.5">
                      {Math.round(selectedEmployee.assignedTasks * (1 - selectedEmployee.completed / 100))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Individual Micro-Task Milestones table segment */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Task Tracks</h4>
                <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 border-b border-slate-100 font-bold uppercase tracking-wider">
                        <th className="py-2.5 px-4">Task Description</th>
                        <th className="py-2.5 px-4">Status</th>
                        <th className="py-2.5 px-4 text-right">Target Due</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
                      {selectedEmployee.tasksList.map((task) => (
                        <tr key={task.id} className="hover:bg-slate-50/50 transition">
                          <td className="py-3 px-4 font-bold text-slate-800">{task.title}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              task.status === "Completed" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                            }`}>
                              {task.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right text-slate-400">{task.due}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex justify-end gap-2 rounded-b-3xl">
              <button
                onClick={() => {
                  setIsAssignTaskOpen(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 shadow-sm transition"
              >
                Assign Urgent Task
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Reusable Modal Triggers */}
      {isAssignTaskOpen && (
        <AssignTaskModal 
          isOpen={isAssignTaskOpen} 
          onClose={() => setIsAssignTaskOpen(false)} 
          onTaskAssigned={handleTaskAssigned}
          allEmployees={employees}
          initialEmployeeId={selectedEmployee?.id}
        />
      )}
      {isAddEmployeeOpen && (
        <AddEmployeeModal 
          isOpen={isAddEmployeeOpen} 
          onClose={() => setIsAddEmployeeOpen(false)} 
          onEmployeeAdded={handleEmployeeAdded}
        />
      )}
    </div>
  );
};

export default EmployeesPage;