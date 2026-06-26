const taskList = document.getElementById("task-list");
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");

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
                <div class="task-info">
                    <strong>${task.title}</strong>
                    <p>${task.completed ? "Completed ✅" : "Pending ⏳"}</p>
                </div>

                <div class="task-buttons">
                    <button class="complete-btn" data-id="${task.id}">
                        ${task.completed ? "Undo" : "Complete"}
                    </button>

                    <button class="edit-btn" data-id="${task.id}">
                        Edit
                    </button>
                </div>
            `;

            taskList.appendChild(taskItem);

            // Complete Button
            const completeButton = taskItem.querySelector(".complete-btn");

            completeButton.addEventListener("click", async () => {

                const taskId = completeButton.dataset.id;

                await fetch(`/tasks/${taskId}/complete`, {
                    method: "PATCH"
                });

                loadTasks();
            });

            // Edit Button
            const editButton = taskItem.querySelector(".edit-btn");

            editButton.addEventListener("click", async () => {

                const taskId = editButton.dataset.id;

                const newTitle = prompt("Enter new title:", task.title);

                if (!newTitle || newTitle.trim() === "") {
                    return;
                }

                await fetch(`/tasks/${taskId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: newTitle.trim()
                    })
                });

                loadTasks();

            });

        });

    } catch (error) {
        taskList.innerHTML = "<p>Could not load tasks.</p>";
        console.log(error);
    }
}

// Add Task
taskForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const title = taskInput.value.trim();

    if (title === "") {
        alert("Please enter a task title.");
        return;
    }

    try {

        const response = await fetch("/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        taskInput.value = "";
        loadTasks();

    } catch (error) {

        alert("Could not add task.");
        console.log(error);

    }

});

loadTasks();