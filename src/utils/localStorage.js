// Local storage utility functions for managing app data

export const STORAGE_KEYS = {
  EMPLOYEES: "deeprank_employees",
  TASKS: "deeprank_tasks",
  PROJECTS: "deeprank_projects",
};

// ============ EMPLOYEES ============
export const getEmployees = () => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading employees from localStorage:", error);
    return [];
  }
};

export const saveEmployee = (employee) => {
  if (typeof window === "undefined") return;
  try {
    const employees = getEmployees();
    const newEmployee = {
      ...employee,
      id: employee.id || Date.now(),
      assignedTasks: employee.assignedTasks || 0,
      completed: employee.completed || 0,
      tasksList: employee.tasksList || [],
    };
    employees.push(newEmployee);
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
    return newEmployee;
  } catch (error) {
    console.error("Error saving employee to localStorage:", error);
  }
};

export const updateEmployee = (id, updates) => {
  if (typeof window === "undefined") return;
  try {
    const employees = getEmployees();
    const index = employees.findIndex((emp) => emp.id === id);
    if (index !== -1) {
      employees[index] = { ...employees[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
      return employees[index];
    }
  } catch (error) {
    console.error("Error updating employee in localStorage:", error);
  }
};

// ============ TASKS ============
export const getTasks = () => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading tasks from localStorage:", error);
    return [];
  }
};

export const saveTask = (task) => {
  if (typeof window === "undefined") return;
  try {
    const tasks = getTasks();
    const newTask = {
      ...task,
      id: task.id || Date.now(),
      createdAt: task.createdAt || new Date().toISOString(),
    };
    tasks.push(newTask);
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    return newTask;
  } catch (error) {
    console.error("Error saving task to localStorage:", error);
  }
};

export const updateTask = (id, updates) => {
  if (typeof window === "undefined") return;
  try {
    const tasks = getTasks();
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      return tasks[index];
    }
  } catch (error) {
    console.error("Error updating task in localStorage:", error);
  }
};

// ============ PROJECTS ============
export const getProjects = () => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading projects from localStorage:", error);
    return [];
  }
};

export const saveProject = (project) => {
  if (typeof window === "undefined") return;
  try {
    const projects = getProjects();
    const newProject = {
      ...project,
      id: project.id || Date.now(),
      createdAt: project.createdAt || new Date().toISOString(),
    };
    projects.push(newProject);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    return newProject;
  } catch (error) {
    console.error("Error saving project to localStorage:", error);
  }
};

export const updateProject = (id, updates) => {
  if (typeof window === "undefined") return;
  try {
    const projects = getProjects();
    const index = projects.findIndex((proj) => proj.id === id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
      return projects[index];
    }
  } catch (error) {
    console.error("Error updating project in localStorage:", error);
  }
};
