/*
    1. Create a page with a text input, button and an empty div [V]
    2. By clicking the button, the text will display in the div 
    3. Incase clicked again, it will add a NEW line with the new text 
    4. Save the data that was inserted into the list - JSON.Stringify, JSON.parse 
    5. Load the data 
    6. Make the task an object that contains: task name, isComplete 
    7. Add to each task button that will signify whether the task was marked as complete 
    8. If the task is complete, strikethrough it
*/

// Variables
const inputTask = document.getElementById('input-task');
const addTaskBtn = document.getElementById('add-task');
const taskListEl = document.getElementById('task-list');
let taskList = JSON.parse(localStorage.getItem('task-list')) || [];

// 
if (taskList.length != 0) {
    renderTaskList();
}

// Add task event
addTaskBtn.addEventListener('click', addTask);

function addTask() {
    // Remove whitespace
    const taskName = inputTask.value.trim();

    // Check if task is not empty (empty string is falsey!)
    if (taskName) {
        console.log(`Detected input: ${taskName}`);
        // Create task object
        const task = {taskName: taskName, isComplete: false};
        // Update tasklist array
        taskList.push(task);
        // Reset input-task
        inputTask.value = '';
        // Add task to tasklist element
        addTaskToList(task);
        // Save tasklist
        saveTaskList();
    }
}

// Sort tasklist based on compelted/incomplete tasks
function renderTaskList() {
    taskListEl.innerHTML = '';

    // Separate tasks between isComplete state
    const completedTasks = taskList.filter((task) => task.isComplete);
    const incompleteTasks = taskList.filter((task) => !task.isComplete);

    // Recombine to one 'sorted' array
    const tasks = [...completedTasks, ...incompleteTasks];

    // Send tasks to tasklist element
    tasks.forEach((task) => addTaskToList(task));
}

// Add task to list
function addTaskToList(task) {
    const taskEl = document.createElement('li');
    const taskCheckbox = document.createElement('input');
    const taskCheckmark = document.createElement('span');
    const taskContent = document.createElement('div');
    const taskDeleteBtn = document.createElement('button');

    taskCheckbox.type = 'checkbox';
    taskCheckbox.checked = task.isComplete;
    taskCheckbox.addEventListener('change', () => toggleComplete(task, taskEl));

    taskContent.innerText = task.taskName;

    taskDeleteBtn.innerText = 'X';
    taskDeleteBtn.addEventListener('click', () => deleteTask(task, taskEl));

    // Stylizes the task through CSS as complete
    if (task.isComplete) {
        taskEl.classList.add('completed-task');
    }

    taskEl.append(taskCheckbox, taskCheckmark, taskContent, taskDeleteBtn);
    taskListEl.prepend(taskEl);
}

// Toggle task completion functionality
function toggleComplete(task, taskEl) {
    // Switch state of completion
    task.isComplete = !task.isComplete;
    console.log(task.isComplete);
    taskEl.classList.toggle('completed-task');

    saveTaskList();
    renderTaskList();
}

// Delete task functionality
function deleteTask(task, taskEl) {
    // Filter and set tasklist to all tasks that are not equal to the current task being deleted; hence removing from tasklist the current deleted task
    taskList = taskList.filter((taskObject) => taskObject != task);
    taskEl.remove(); // Remove element method

    saveTaskList();
    renderTaskList();
}

// Save tasklist
function saveTaskList() {
    localStorage.setItem('task-list', JSON.stringify(taskList));
}