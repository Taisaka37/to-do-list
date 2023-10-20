// const Tasks = 

const projectsUpperContainer = document.querySelector('[data-projects]')
const newProjectForm = document.querySelector('[data-new-project-form]')
const newProjectInput = document.querySelector('[data-new-project-input]')
let projects = [{
  id: 1,
  name: 'Inbox'
}, {
  id: 2,
  name: 'Today'
}, {
  id: 3,
  name: 'Upcoming'
}];

newProjectForm.addEventListener('submit', e => {
  e.preventDefault()
  const projectName = newProjectInput.value;
  if (projectName == null || projectName === '') return;
  const project = createProject(projectName)
  newProjectInput.value = null
  projects.push(project)
  render()
})

function createProject(name) {
  return { id: Date.now().toString(), name, tasks: []}
}

function render() {
  clearElement(projectsUpperContainer)
    projects.forEach(project => {
    const projectsLowerContainer = document.createElement('div');
    const projectsElement = document.createElement('div');
    projectsLowerContainer.classList.add('projects-container');
    projectsUpperContainer.append(projectsLowerContainer);
    projectsLowerContainer.append(projectsElement);
    projectsElement.innerText = project.name;
    projectsElement.dataset.projectId = project.id;

  })
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

function createTask (title, description, dueDate, priority) {

  return { id: Date.now().toString(), title, description, dueDate, priority, complete: false }
}

function completeTask() {

}

function addProject() {

}

function addSection() {

}


const Task1 = createTask('work', 'gotta work', Date.now(), 'ultra');

console.log(Task1);

render();