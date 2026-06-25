const express = require("express");
const connection = require("./db");

const app = express();

app.use(express.json());

const tasks = [
    {
        id: 1,
        title: "Learn Node.js",
        completed: false
    },
    {
        id: 2,
        title: "Practice Git",
        completed: false
    }
];

app.get("/", (req, res) => {
    res.send("Task Manager API Running...");
});

app.get("/tasks", (req, res) => {
    const sql = "SELECT * FROM tasks";

    connection.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({
                message: "Failed to get tasks"
            });
        }

        res.json(results);
    });
});

app.get("/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id);

    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json(task);
});

app.post("/tasks", (req, res) => {
    const title = req.body.title;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            message: "Task title is required"
        });
    }

    const sql = "INSERT INTO tasks (title, completed) VALUES (?, ?)";

    connection.query(sql, [title.trim(), false], (error, results) => {
        if (error) {
            return res.status(500).json({
                message: "Failed to add task"
            });
        }

        const newTask = {
            id: results.insertId,
            title: title.trim(),
            completed: false
        };

        res.status(201).json({
            message: "Task added successfully",
            task: newTask
        });
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

app.patch("/tasks/:id/complete", (req, res) => {
    const taskId = Number(req.params.id);

    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    task.completed = !task.completed;

    res.json({
        message: "Task completion status updated",
        task: task
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});