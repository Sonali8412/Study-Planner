const { render } = require("express/lib/response");

let currentDay = "Monday";
let tasks = JSON.parse(localStorage.getItem("plannerTasks")) || {};

// show task for selected day
function renderTask() {
    let taskList = document.getElementById("task List");
    taskList.innerHTML = "";

    let dayTasks = tasks[currentDay] || [];

    dayTasks.forEach((task, index) => {
        let card = document.createElement("div");
        card.className = "task-card";

        let title = document.createElement("h3");
        title.textContent = task.title;
        if (task.completed) title.classList.add("completed");

        let notes = document.createElement("p");
        notes.textContent = task.notes;

        // Actions
        let actions = document.createElement("div");
        actions.className = "task-actions";
        let completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "undo" : "complete";
        completeBtn.className = "complete-btn";
        completeBtn.onclick = () => {
            task.completed = !task.completed;
            saveTasks();
            
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "delete";
        deleteBtn.onclick = () => {
            dayTasks.splice(index,1);
            saveTask();
        };

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);

        card.appendChild(title);
        card.appendChild(notes);
        card.appendChild(actions);

        taskList.appendChild(card);
    });
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("plannerTasks", JSON.stringify(tasks));
    renderTask();
}

// Add new task
document.getElementById("addButton").addEventListener("click", () => {
    let title = document.getElementById("taskTitle").value;
    let notes = document.getElementById("taskNotes").value;

    if (!title) {
        alert("Please enter a task title!");
        return;
    }

    let day = document.getElementById("taskDate").value;
    if (!tasks[day]) tasks[day] = [];

    tasks[day].push({ title, notes, completed: false });
    saveTasks();

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskNotes").value = "";

    renderTasks();
});
//change day tab
document.querySelectorAll(".day-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".day-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentDay = tab.dataset.day;
      renderTask();
    });
  });
        