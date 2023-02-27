import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  addFunction("addButton", "click", toggleInput);
});

const projects = [];

const newProject = (name) => {
  return {
    name,
  };
};

function addFunction(id, type, func) {
  const element = document.getElementById(id);
  element.addEventListener(type, () => func("projects"));
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
      if (value !== "") addProject(value);
      input.remove();
    }
  });
}

function addProject(test) {
  const project = newProject(test);
  projects.push(project);
  updateDisplay();
}

function showProject(project) {
  console.log(project);
}

function updateDisplay() {
  const projectsTab = document.getElementById("projects");
  projectsTab.innerHTML = "";

  projects.forEach((project) => {
    const button = document.createElement("button");
    button.textContent = project.name;
    button.setAttribute("onclick", `showProject(${project})`);
    projectsTab.prepend(button);
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
