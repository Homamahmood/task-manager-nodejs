const taskList = document.getElementById("task-list");

async function loadTasks() {
    try {
        const response = await fetch("/tasks");
        const tasks = await response.json();

        taskList.innerHTML = "";

        if (tasks.length === 0) {
            taskList.innerHTML = "<p>No tasks yet.</p>";
            return;
        }

        tasks.forEach((task) => {
            const taskItem = document.createElement("div");

            taskItem.classList.add("task-item");

            taskItem.innerHTML = `
                <span>${task.title}</span>
                <span>${task.completed ? "Completed" : "Pending"}</span>
            `;

            taskList.appendChild(taskItem);
        });
    } catch (error) {
        taskList.innerHTML = "<p>Could not load tasks.</p>";
        console.log(error);
    }
}

loadTasks();