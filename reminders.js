document.addEventListener("DOMContentLoaded", function () {
    loadReminders();
});

function addReminder() {
    const reminder = document.getElementById("reminderInput").value;
    if (reminder.trim() !== "") {
        let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
        reminders.push(reminder);
        localStorage.setItem("reminders", JSON.stringify(reminders));
        loadReminders();
    }
}

function loadReminders() {
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    document.getElementById("reminderList").innerHTML = reminders
        .map((r, i) => `<li>${r} <button onclick="deleteReminder(${i})">X</button></li>`)
        .join("");
}

function deleteReminder(index) {
    let reminders = JSON.parse(localStorage.getItem("reminders"));
    reminders.splice(index, 1);
    localStorage.setItem("reminders", JSON.stringify(reminders));
    loadReminders();
}
