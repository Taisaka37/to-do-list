// const Tasks = 

const projectsUpperContainer = document.querySelector('[data-projects]')
const newProjectForm = document.querySelector('[data-new-project-form]')
const newProjectInput = document.querySelector('[data-new-project-input]')

const LOCAL_STORAGE_PROJECT_KEY = 'task.projects'
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'task.selectedProjectId'

let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [{
  id: 1,
  name: 'Inbox',
  tasks: []
}, {
  id: 2,
  name: 'Today',
  tasks: []
}, {
  id: 3,
  name: 'Upcoming',
  tasks: []
}];

let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY)
console.log(selectedProjectId)

projectsUpperContainer.addEventListener('click', e => {
  if (e.target.className === 'projects-container' ) {
    selectedProjectId = e.target.querySelector('div').dataset.projectId          
    console.log(selectedProjectId)
    console.log(projects)
    saveAndRender()

  }
})
// const projectsContainer = document.querySelectorAll('.projects-container');
// projectsContainer.forEach(project => {
//   project.addEventListener('click', () => {
//     document.querySelector('.active-project')?.classList.remove('active-project');
//     project.classList.add('active-project')
//   })
// })

newProjectForm.addEventListener('submit', e => {
  e.preventDefault()
  const projectName = newProjectInput.value;
  if (projectName == null || projectName === '') return;
  const project = createProject(projectName)
  newProjectInput.value = null
  projects.push(project)
  saveAndRender()
})

function createProject(name) { 
  return { id: Date.now().toString(), name, tasks: []}
}

function saveAndRender() {
  save()
  render()
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects))
  localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProjectId)
}
function render() {
  clearElement(projectsUpperContainer)
    projects.forEach(project => {
    const projectsLowerContainer = document.createElement('div');
    const projectsElement = document.createElement('div');
    projectsLowerContainer.classList.add('projects-container');
    projectsElement.classList.add('projects-element')
    if (project.id == selectedProjectId) {
      projectsElement.classList.add('active-project')
    }
    projectsUpperContainer.append(projectsLowerContainer);
    projectsLowerContainer.append(projectsElement);
    projectsElement.innerText = project.name;
    projectsElement.dataset.projectId = project.id;
    // console.log(projectsElement)
    // projectsElement.addEventListener('click', () => {
    //   document.querySelector('.active-project')?.classList.remove('active-project');
    //   projectsElement.classList.add('active-project')
    // })

  })
}

function addSwitchActive() {

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