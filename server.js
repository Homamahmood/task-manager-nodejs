const express = require("express");

const app = express();

app.use(express.json());

const tasks = [
    {
        id: 1,
        title: "Learn Node.js"
    },
    {
        id: 2,
        title: "Practice Git"
    }
];

app.get("/", (req, res) => {
    res.send("Task Manager API Running...");
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const title = req.body.title;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            message: "Task title is required"
        });
    }

    const newTask = {
        id: tasks.length + 1,
        title: title.trim()
    };

    tasks.push(newTask);

    res.status(201).json({
        message: "Task added successfully",
        task: newTask
    });
});

app.delete("/tasks/:id",(req,res) =>{
    const taskId= Number(req.params.id);
    const taskIndex= tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
    return res.status(404).json({
        message: "Task not found"
    });
}

    const deletedTask= tasks.splice(taskIndex,1);
    res.json(
        {message:"Task deleted succesfully",
            task:deletedTask[0]
        }
    );
});

app.put("/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id);

    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
    return res.status(404).json({
        message: "Task not found"
    });
}

const title = req.body.title;

if (!title || title.trim() === "") {
    return res.status(400).json({
        message: "Task title is required"
    });
}

task.title = title.trim();

    res.json({
        message: "Task updated successfully",
        task: task
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});