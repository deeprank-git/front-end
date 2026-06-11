"use client";

import { useState, useEffect } from "react";
import { getProjects, saveProject } from "@/utils/localStorage";
// Import your reusable modal layers
import CreateProjectModal from "@/components/CreateProjectModal";
import AssignTaskModal from "@/components/AssignTaskModal";

const ProjectsPage = () => {
  // Navigation tabs and search states
  const [activeTab, setActiveTab] = useState("Ongoing Projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);

  // Modal open states
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isAssignTaskOpen, setIsAssignTaskOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null); // Tracks project for detail view

  // Hardcoded mockup data matching your Figma cards & detailed specifications
  const [projects, setProjects] = useState([
    {
      id: "p1",
      name: "Project Aethelgard",
      category: "Ongoing Projects",
      tag: "ACTIVE",
      tagColor: "bg-blue-50 text-blue-600 border-blue-200",
      description: "Next-gen spatial data processing for real-time asset tracking in distributed networks.",
      progress: 72,
      startDate: "Oct 12, 2025",
      dueDate: "Due Oct 24, 2026",
      lead: "S. Peterson",
      budget: "$1.4M",
      team: [
        { name: "Marcus", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80" },
        { name: "Sarah", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80" }
      ],
      tasks: [
        { title: "Core API Refactoring", team: "Marcus T.", priority: "High", status: "REVIEW", due: "Feb 14" },
        { title: "UX/UI Glass Design Polish", team: "Sarah J.", priority: "Medium", status: "PROGRESS", due: "Feb 18" }
      ]
    },
    {
      id: "p2",
      name: "Quantum Ledger",
      category: "Ongoing Projects",
      tag: "REVIEW",
      tagColor: "bg-amber-50 text-amber-600 border-amber-200",
      description: "Implementation of post-quantum cryptographic standards across global decentralized ledger nodes.",
      progress: 94,
      startDate: "Nov 01, 2025",
      dueDate: "Due Sep 12, 2026",
      lead: "E. Rodriguez",
      budget: "$850K",
      team: [
        { name: "David", avatar: "https://images.unsplash.com/photo-139893122415-993d6d53f2cb?w=80" }
      ],
      tasks: [
        { title: "Node Security Audit", team: "Elena R.", priority: "High", status: "COMPLETED", due: "Jan 10" }
      ]
    },
    {
      id: "p3",
      name: "Neural Bridge",
      category: "Ongoing Projects",
      tag: "ALPHA",
      tagColor: "bg-purple-50 text-purple-600 border-purple-200",
      description: "Cognitive assistance layer for industrial operation managers leveraging fine-tuned edge LLMs.",
      progress: 35,
      startDate: "Jan 15, 2026",
      dueDate: "Due Dec 05, 2026",
      lead: "M. Thorne",
      budget: "$2.1M",
      team: [
        { name: "Sarah", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80" },
        { name: "David", avatar: "https://images.unsplash.com/photo-139893122415-993d6d53f2cb?w=80" }
      ],
      tasks: []
    }
  ]);

  // Load projects from localStorage on mount
  useEffect(() => {
    const storedProjects = getProjects();
    const defaultProjects = projects.filter(p => p.category === "Ongoing Projects" || p.category === "Deployed Projects");
    
    // Merge stored projects with defaults, converting stored projects to display format
    const mergedProjects = [
      ...defaultProjects,
      ...storedProjects.map(p => ({
        id: p.id,
        name: p.name,
        category: "Ongoing Projects",
        tag: "ACTIVE",
        tagColor: "bg-blue-50 text-blue-600 border-blue-200",
        description: p.description || "",
        progress: 0,
        startDate: p.startDate || new Date().toLocaleDateString(),
        dueDate: `Due ${p.dueDate || new Date().toLocaleDateString()}`,
        lead: "Team",
        budget: "$0",
        team: [],
        tasks: []
      }))
    ];
    
    setProjects(mergedProjects);
    setIsHydrated(true);
  }, []);

  const handleProjectCreated = (newProject) => {
    const newProjectFormatted = {
      id: newProject.id,
      name: newProject.name,
      category: "Ongoing Projects",
      tag: "ACTIVE",
      tagColor: "bg-blue-50 text-blue-600 border-blue-200",
      description: newProject.description || "",
      progress: 0,
      startDate: newProject.startDate || new Date().toLocaleDateString(),
      dueDate: `Due ${newProject.dueDate || new Date().toLocaleDateString()}`,
      lead: "Team",
      budget: "$0",
      team: [],
      tasks: []
    };
    setProjects(prev => [...prev, newProjectFormatted]);
  };

  // Compute filtering matches based on both active top-tabs and user input string
  const filteredProjects = projects.filter(
    (proj) =>
      proj.category === activeTab &&
      proj.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-1 w-full space-y-6">
      
      {/* Upper Header Grid Panel Layout */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Projects</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and track your organization's high-impact initiatives.
          </p>
        </div>
        
        <button
          onClick={() => setIsCreateProjectOpen(true)}
          className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition shadow-sm self-start md:self-auto"
        >
          + Create Project
        </button>
      </div>

      {/* Filter Toolbar Controls Group */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-px">
        {/* Navigation Section Subcategories */}
        <div className="flex gap-6">
          {["Ongoing Projects", "Deployed Projects"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold transition-all border-b-2 px-1 ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600 font-bold"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Input Bar Filtering Element */}
        <div className="mb-2 relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Filter projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 placeholder-slate-400"
          />
          <span className="absolute right-3 top-2.5 text-slate-400 text-xs pointer-events-none">🔍</span>
        </div>
      </div>

      {/* Grid Dashboard Card Layout Wrapper */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Upper Icon & Badge Indicator Category Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                    📊
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${project.tagColor}`}>
                    {project.tag}
                  </span>
                </div>

                {/* Title & Metadata Descriptions */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                  {project.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              {/* Progress Slider Status Metrics Segment */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-1.5">
                    <span>Progress</span>
                    <span className="text-blue-600">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Team Avatars & Target Target Due Dates Footer */}
                <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-1">
                  <div className="flex -space-x-2 overflow-hidden">
                    {project.team.map((m, idx) => (
                      <img
                        key={idx}
                        src={m.avatar}
                        alt={m.name}
                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-slate-400">
                    <span>📅</span>
                    <span>{project.dueDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-slate-400 font-medium bg-white rounded-2xl border border-slate-100">
          No records match your filters in this category.
        </div>
      )}

      {/* Reusable Component Hook Layers */}
      {isCreateProjectOpen && (
        <CreateProjectModal
          isOpen={isCreateProjectOpen}
          onClose={() => setIsCreateProjectOpen(false)}
          onProjectCreated={handleProjectCreated}
        />
      )}

      {isAssignTaskOpen && (
        <AssignTaskModal onClose={() => setIsAssignTaskOpen(false)} />
      )}

      {/* High-Fidelity Project Detail Slide-over Modal Backdrop Sheet Layout */}
      {selectedProject && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col">
            
            {/* Header Sticky Container */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-xl text-lg">🏢</div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedProject.name}</h2>
                  <p className="text-xs font-medium text-slate-400 tracking-wider uppercase mt-0.5">
                    Digital Infrastructure & Deployment
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-200/50 text-sm">✏️</button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold p-2 text-base rounded-xl hover:bg-slate-200/50"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Main Content Layout Body */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-y-auto">
              
              {/* Left Grid Side Section (2/3 width grid on standard desktops) */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Meta Overview Summary Panel Layout */}
                <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-600 flex items-center gap-1">📋 Overview</span>
                    <div className="flex gap-2">
                      <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md font-bold text-[10px]">● Active</span>
                      <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded-md font-bold text-[10px]">High Priority</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedProject.description}
                  </p>
                  
                  {/* Internal Sub-Meta Rows Grid fields layout */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 text-xs border-t border-slate-200/40">
                    <div>
                      <div className="text-slate-400 font-medium">START DATE</div>
                      <div className="font-bold text-slate-700 mt-0.5">{selectedProject.startDate}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-medium">DUE DATE</div>
                      <div className="font-bold text-blue-600 mt-0.5">{selectedProject.dueDate.replace("Due ", "")}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-medium">LEAD</div>
                      <div className="font-bold text-slate-700 mt-0.5">{selectedProject.lead}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-medium">BUDGET</div>
                      <div className="font-bold text-slate-800 mt-0.5">{selectedProject.budget}</div>
                    </div>
                  </div>
                </div>

                {/* Sub Task-List Segment */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Milestones & Tasks</h4>
                    <button
                      onClick={() => setIsAssignTaskOpen(true)}
                      className="text-xs bg-blue-600 hover:bg-blue-700 font-semibold text-white px-3 py-1.5 rounded-xl transition shadow-sm"
                    >
                      + Add Task
                    </button>
                  </div>

                  <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 text-slate-400 border-b border-slate-100 font-bold uppercase tracking-wider">
                          <th className="py-3 px-4">Task Title</th>
                          <th className="py-3 px-4">Team</th>
                          <th className="py-3 px-4">Priority</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Due Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
                        {selectedProject.tasks.length > 0 ? (
                          selectedProject.tasks.map((t, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition">
                              <td className="py-3 px-4 font-bold text-slate-800">{t.title}</td>
                              <td className="py-3 px-4 text-slate-500">{t.team}</td>
                              <td className="py-3 px-4">
                                <span className={t.priority === "High" ? "text-rose-500 font-bold" : "text-amber-500 font-bold"}>
                                  {t.priority}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold">
                                  {t.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right text-slate-400">{t.due}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="py-8 text-center text-slate-400 italic">
                              No micro-tasks assigned to this specific epic container.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Side Stats Panel column (1/3 area space coverage width layout) */}
              <div className="space-y-6">
                {/* Distribution Layout Indicators Cards */}
                <div className="border border-slate-100 rounded-2xl p-4 bg-white shadow-sm space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Task Distribution</h4>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="text-slate-400 text-[10px] font-bold uppercase">Total Tasks</div>
                      <div className="text-xl font-extrabold text-slate-800 mt-0.5">142</div>
                    </div>
                    <div className="bg-emerald-50/30 p-3 rounded-xl border border-emerald-100/40">
                      <div className="text-emerald-600 text-[10px] font-bold uppercase">Completed</div>
                      <div className="text-xl font-extrabold text-emerald-600 mt-0.5">96</div>
                    </div>
                    <div className="bg-blue-50/30 p-3 rounded-xl border border-blue-100/40">
                      <div className="text-blue-600 text-[10px] font-bold uppercase">Pending</div>
                      <div className="text-xl font-extrabold text-blue-600 mt-0.5">38</div>
                    </div>
                    <div className="bg-rose-50/30 p-3 rounded-xl border border-rose-100/40">
                      <div className="text-rose-600 text-[10px] font-bold uppercase">Overdue</div>
                      <div className="text-xl font-extrabold text-rose-600 mt-0.5">8</div>
                    </div>
                  </div>
                </div>

                {/* Progress Status Card Metrics Slider Block layout component */}
                <div className="border border-slate-100 rounded-2xl p-4 bg-white shadow-sm space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Progress</h4>
                  <div>
                    <div className="text-2xl font-black text-slate-900">{selectedProject.progress}%</div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${selectedProject.progress}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase mt-2">
                      <span>Architecture Setup (100%)</span>
                      <span>Global Sync (42%)</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Control Bar Block */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex justify-end gap-2 rounded-b-3xl">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-white"
              >
                Archive Project
              </button>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectsPage;