document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

// Show and Hide Task Form
function showTaskForm() {
    document.getElementById("taskForm").classList.remove("hidden");
}
function hideTaskForm() {
    document.getElementById("taskForm").classList.add("hidden");
}

// Add a new task
function addTask() {
    const title = document.getElementById("taskTitle").value.trim();
    const priority = document.getElementById("taskPriority").value;
    const category = document.getElementById("taskCategory").value;
    const deadline = document.getElementById("taskDeadline").value;
    const status = document.getElementById("taskStatus").value;
    const description = document.getElementById("taskDescription").value.trim();

    if (title === "") {
        alert("Task title is required!");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const newTask = {
        id: Date.now(),
        title,
        priority,
        category,
        deadline,
        status,
        description
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    hideTaskForm();
    loadTasks();
}

// Load tasks
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = tasks.map((task, i) => `
        <li>
            <strong>${task.title}</strong> (${task.priority})  
            <br> Category: ${task.category}
            <br> Deadline: ${task.deadline || "No deadline"}
            <br> Status: <span class="${task.status === "Completed" ? "completed" : "pending"}">${task.status}</span>
            <br> ${task.description}
            <br> 
            <button onclick="markAsCompleted(${task.id})">Complete</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        </li>
    `).join("");
}

// Mark task as completed
function markAsCompleted(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let task = tasks.find(t => t.id === taskId);
    if (task) {
        task.status = "Completed";
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

// Delete task
function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
