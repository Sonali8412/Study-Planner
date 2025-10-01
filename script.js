let currentDay = "Monday";
let tasks = JSON.parse(localStorage.getItem("plannerTasks")) || {};
const taskList = document.getElementById("taskList");

// Render tasks for the current day
function renderTask() {
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
        }
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => {
            dayTasks.splice(index, 1);
            saveTasks();
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
document.getElementById("addTaskbtn").addEventListener("click", () => {
    let title = document.getElementById("taskTitle").value;
    let notes = document.getElementById("taskNotes").value;

    if (title.trim() === "") {
        alert("Please enter a task title!");
        return;
    }
    if (!tasks[currentDay]) tasks[currentDay] = [];
    tasks[currentDay].push({ title, notes, completed: false });
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskNotes").value = "";
    saveTasks();
});

// Change day tab
document.querySelectorAll(".day-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".day-btn.active").forEach(el => el.classList.remove("active"));
        btn.classList.add("active");
        currentDay = btn.dataset.day;
        renderTask();
    });
});

// Initial render
renderTask();
