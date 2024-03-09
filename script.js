const username = localStorage.getItem('username') || '';
const nameInput = document.querySelector('#name');
nameInput.value = username;

nameInput.addEventListener('change', e => {
    localStorage.setItem('username', e.target.value);

})
let tasks = [];


function renderTasks() {
    const tasksContainer = document.getElementById("tasks");
    tasksContainer.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        if (task.completed) {
            taskElement.classList.add("completed");
        }
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTaskCompletion(index));
        const taskName = document.createElement("span");
        taskName.textContent = task.name;
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = task.name;
        editInput.style.display = "none"; // initially hide input
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => toggleEditTask(index));
        const saveButton = document.createElement("button");
        saveButton.id = 'btnSave'
        saveButton.textContent = "edit";
        saveButton.style.display = "none"; // initially hide button
        saveButton.addEventListener("click", () => saveEditedTask(index, editInput));
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTask(index));
        
        taskElement.appendChild(checkbox);
        taskElement.appendChild(taskName);
        taskElement.appendChild(editInput);
        taskElement.appendChild(editButton);
        taskElement.appendChild(saveButton);
        taskElement.appendChild(deleteButton);
        
        tasksContainer.appendChild(taskElement);
    });
}

function addTask() {
    const taskNameInput = document.getElementById("taskName");
    const taskName = taskNameInput.value.trim();
    const category = document.querySelector('input[name="category"]:checked').value;
    
    if (taskName !== "") {
        tasks.push({ name: taskName, category: category, completed: false });
        renderTasks();
        taskNameInput.value = "";
    }
}

function toggleEditTask(index) {
    const taskElement = document.querySelectorAll(".task")[index];
    const taskNameSpan = taskElement.querySelector("span");
    const editInput = taskElement.querySelector("input[type='text']");
    const editButton = taskElement.querySelector("button");
    const saveButton = taskElement.querySelector("button:nth-of-type(2)");
    
    taskNameSpan.style.display = "none";
    editInput.style.display = "inline-block";
    editInput.focus(); // focus the input field
    editButton.style.display = "none";
    saveButton.style.display = "inline-block";
}

function saveEditedTask(index, editInput) {
    const newName = editInput.value.trim();
    if (newName !== "") {
        tasks[index].name = newName;
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

renderTasks();
