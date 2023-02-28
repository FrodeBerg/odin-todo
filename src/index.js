import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  addFunction("addProject", "click", toggleInput, "projects");
  addFunction("addTask", "click", toggleInput, "tasks");
  updateDisplay();
});

const newProject = (name) => {
  const tasks = [];

  return {
    name,
    tasks,
  };
};

function projectId(project){
    return projects.indexOf(project);
}


const projects = localStorage.getItem("projects") ? JSON.parse(localStorage.getItem("projects")) : [newProject("default")];
let currentProject = projects[0];

const newTask = (name) => {
  return {
    name,
  };
};

function addFunction(id, type, func, parameters = null) {
  const element = typeof id === "string" ? document.getElementById(id) : id;

  element.addEventListener(type, (event) => {
    if (parameters === null) func(event);
    else func(parameters);
  });
}

function toggleInput(parentId) {
  if (document.getElementById("input")) return;

  const parent = document.getElementById(parentId);
  const input = document.createElement("input");
  parent.prepend(input);
  input.setAttribute("id", "input");

  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const value = event.srcElement.value;
      if (value !== "")
        parentId === "projects" ? addProject(value) : addTask(value);
      input.remove();
    }
  });
}

function addProject(name) {
  const project = newProject(name);
  projects.push(project);
  updateDisplay();
}

function addTask(name) {
  const task = newTask(name);
  currentProject.tasks.push(task);
  updateDisplay();
}

function removeTask(index) {
  currentProject.tasks.splice(index, 1);
  updateDisplay()
}

function showProject(id) {
  const project = projects[id];
  currentProject = project;
  updateDisplay();
}

function updateDisplay() {
  localStorage.setItem("projects", JSON.stringify(projects));

  const projectsTab = document.getElementById("projects");
  const tasksTab = document.getElementById("tasks");
  const projectTitle = document.getElementById("projectTitle");

  projectsTab.innerHTML = "";
  tasksTab.innerHTML = "";
  projectTitle.innerHTML = currentProject.name;

  projects.forEach((project) => {
    const button = document.createElement("button");
    button.textContent = project.name;
    addFunction(button, "click", showProject, projectId(project));
    projectsTab.prepend(button);
  });

  currentProject.tasks.forEach((task) => {
    const button = document.createElement("button");
    button.textContent = task.name;
    addFunction(button, "click", removeTask, currentProject.tasks.indexOf(task))
    tasksTab.prepend(button);
  });
}

// Link add button

// Load data on login

// Nodes

// Each node is a project or a task

// Tasks can be completed or not

// Projects have percentages corresponding to the amount of finished tasks

// Projects can be linked 100% = finished

// Add logic for projects
