// const Tasks = 

function createTask (title, description, dueDate, priority) {

  return { id: Date.now().toString(), title, description, dueDate, priority, complete: false }
}

function completeTask () {

}

function addProject () {

}

function addSection () {

}

const Task1 = createTask('work', 'gotta work', Date.now(), 'ultra');

console.log(Task1);

