document.addEventListener("DOMContentLoaded", function () {
    setupDarkMode();
    loadUserProfile();
    updateDate();
    loadTasks();
    loadAllTasks();
    
    document.getElementById("task-form")?.addEventListener("submit", saveTask);
    document.getElementById("logout-btn")?.addEventListener("click", logoutUser);
});

// 📌 Dark Mode System-Wide
function setupDarkMode() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const darkModeEnabled = localStorage.getItem("dark-mode") === "true";

    if (darkModeEnabled || prefersDark) {
        document.body.classList.add("dark-mode");
    }

    document.getElementById("toggle-dark-mode")?.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode"));
    });
}

// 📌 Load User Profile
function loadUserProfile() {
    let user = JSON.parse(localStorage.getItem("userProfile")) || {
        name: "Arnold",
        email: "test@test.com"
    };

    document.getElementById("user-name").textContent = user.name;
    document.getElementById("user-email").textContent = user.email;
}

// 📌 Update Date
function updateDate() {
    document.getElementById("current-date").textContent = new Date().toDateString();
}

// 📌 Save Task
function saveTask(event) {
    event.preventDefault();

    let title = document.getElementById("task-title").value;
    let category = document.getElementById("task-category").value;
    let date = document.getElementById("task-date").value;
    let priority = document.getElementById("task-priority").value;
    let status = document.getElementById("task-status").value;
    let description = document.getElementById("task-description").value;

    let newTask = { title, category, date, priority, status, description };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Redirect to Dashboard
    window.location.href = "dashboard.html";
}

// 📌 Load Tasks to Dashboard
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("task-list");

    taskList.innerHTML = "";
    
    if (tasks.length === 0) {
        taskList.innerHTML = "<p id='no-tasks'>No tasks scheduled for today</p>";
    } else {
        tasks.forEach((task, index) => {
            let taskItem = document.createElement("div");
            taskItem.classList.add("task-item");
            taskItem.innerHTML = `
                <h4>${task.title} (${task.priority})</h4>
                <p><strong>Category:</strong> ${task.category}</p>
                <p><strong>Status:</strong> ${task.status}</p>
                <p><strong>Deadline:</strong> ${task.date}</p>
                <p><strong>Description:</strong> ${task.description}</p>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
    }
}

// 📌 Load All Tasks for "All Tasks" Page
function loadAllTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let tasksContainer = document.getElementById("tasks-container");

    tasksContainer.innerHTML = "";  // Clear previous content

    if (tasks.length === 0) {
        tasksContainer.innerHTML = "<p>No tasks available.</p>";
        return;
    }

    tasks.forEach((task, index) => {
        let taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        taskCard.innerHTML = `
            <h3>${task.title} (${task.priority})</h3>
            <p><strong>Category:</strong> ${task.category}</p>
            <p><strong>Deadline:</strong> ${task.date}</p>
            <p><strong>Status:</strong> ${task.status}</p>
            <p><strong>Description:</strong> ${task.description}</p>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        tasksContainer.appendChild(taskCard);
    });
}

// 📌 Edit Task
function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let task = tasks[index];

    document.getElementById("task-title").value = task.title;
    document.getElementById("task-category").value = task.category;
    document.getElementById("task-date").value = task.date;
    document.getElementById("task-priority").value = task.priority;
    document.getElementById("task-status").value = task.status;
    document.getElementById("task-description").value = task.description;

    // Remove the old task and save the updated one
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("save-task-btn").textContent = "Update Task";
}

// 📌 Delete Task
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Reload Tasks
    loadTasks();
    loadAllTasks();
}

// 📌 Logout User
function logoutUser() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}
