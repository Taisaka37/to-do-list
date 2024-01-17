const projectsUpperContainer = document.querySelector('[data-projects]')
const tasksContainer = document.querySelector('[data-board]')
const newProjectForm = document.querySelector('[data-new-project-form]')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newProjectInput = document.querySelector('[data-new-project-input]')
const newTaskInput = document.querySelector('[data-new-Task-input]')
const dueDateInput = document.querySelector('[data-dueDate-input]')
const priorityInput = document.querySelector('[data-priority-input]')

const LOCAL_STORAGE_PROJECT_KEY = 'task.projects'
const LOCAL_STORAGE_TASK_KEY = 'task.tasks'
// need to store tasks??????
//
//
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'task.selectedProjectId'

// My projects are stored in projects and they're taken from localStorage if available
let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [{
  id: 1,
  name: 'Inbox',
}, {
  id: 2,
  name: 'Today',
}, {
  id: 3,
  name: 'Upcoming',
}];

let tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || [];

// I get selectedProjectID
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY)

// I add an event listener that changes selectedProjectID on click
projectsUpperContainer.addEventListener('click', e => {
  if (e.target.className === 'projects-element' ) {
    selectedProjectId = e.target.dataset.projectId 
    saveAndRender()
  }
})

// When I submit a project it's added to projects
newProjectForm.addEventListener('submit', e => {
  e.preventDefault();
  const projectName = newProjectInput.value;
  if (projectName == null || projectName === '') return;
  const project = createProject(projectName);
  newProjectInput.value = null;
  projects.push(project);
  saveAndRender();
});

newTaskForm.addEventListener('input', e=> {
    const taskOptions = document.querySelector('.side');
    taskOptions.style.display = "flex";
    const taskName = newTaskInput.value;
    if (taskName == null || taskName === '') {
        taskOptions.style.display = "none"
    }
    dueDateInput.min = new Date().toISOString().split("T")[0];
});

newTaskForm.addEventListener('submit', e=> {
    e.preventDefault()
    const taskOptions = document.querySelector('.side');
    taskOptions.style.display = "none";
    const taskName = newTaskInput.value;
    if (taskName == null || taskName === '') return;
    let temp = Date.parse(dueDateInput.value)
    const taskDueDate = new Date(temp).toLocaleDateString();
    const taskPriority = priorityInput.value;
    const task = createTask(taskName, taskDueDate, taskPriority);
    newTaskInput.value = null;
    dueDateInput.value = null;
    // priorityInput.value = null;
    tasks.push(task);
    saveAndRender();
})

// Can I add tasks to a project somehow? project.tasks
function createProject(name) { 
  return { id: Date.now().toString(), name}
}

function saveAndRender() {
  save()
  render()
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects))
  localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProjectId)
  localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(tasks))
}
function render() {
  clearElement(projectsUpperContainer)
    projects.forEach(project => {
    const projectsElement = document.createElement('div');
    projectsElement.classList.add('projects-element')
    if (project.id == selectedProjectId) {
      projectsElement.classList.add('active-project')
    }
    projectsUpperContainer.append(projectsElement);
    projectsElement.innerText = project.name;
    projectsElement.dataset.projectId = project.id;
  })
  clearElement(tasksContainer)
  tasks.forEach(task => {
    if (task.id != selectedProjectId) return;
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('checkbox-container');
    const taskDiv2 = document.createElement('div');
    taskDiv.append(taskDiv2);

    switch (task.priority) {
        case 'high':
            taskDiv.classList.add('high-priority');
            break;
        case 'medium':
            taskDiv.classList.add('mid-priority');
            break;
        case 'low':
            taskDiv.classList.add('low-priority');
            break;
    }
    console.log(task);
    console.log(tasks.indexOf(task));
    tasksContainer.append(taskDiv);
    const taskInput = document.createElement('input');
    const taskLabel = document.createElement('label');
    taskInput.id = task.label;
    taskInput.type = 'checkbox';
    taskLabel.setAttribute('for', task.label)
    
    taskLabel.innerText = `${task.name} \n Due: ${task.dueDate}`
    if (task.dueDate == '' || task.dueDate == 'Invalid Date') {
        taskLabel.innerText = task.name

    }
    console.log(task.dueDate);
    taskDiv2.append(taskInput);
    taskDiv2.append(taskLabel);
    const btn = document.createElement('button');
    taskDiv.append(btn);
    btn.innerText = 'x';
    btn.classList.add('invis')
    btn.id = task.label;

    btn.addEventListener('click', e => {
        tasks.splice(tasks.indexOf(task), 1);
        saveAndRender();
    })

    taskLabel.addEventListener('click', e=> {
        
        sleep(500).then(() => { completeTask(task); });;
    })
    
})
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

function createTask (name, dueDate, priority) {
    
    return { id: selectedProjectId, name, dueDate, priority, label: Date.now().toString()}
}

function completeTask(task) {
    tasks.splice(tasks.indexOf(task), 1);
    saveAndRender();
    
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
render();