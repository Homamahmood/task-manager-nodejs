const express = require("express");
const connection = require("./db");

const app = express();

app.use(express.json());

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

    const sql = "SELECT * FROM tasks WHERE id = ?";

    connection.query(sql, [taskId], (error, results) => {
        if (error) {
            return res.status(500).json({
                message: "Failed to get task"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(results[0]);
    });
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

app.delete("/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id);

    const sql = "DELETE FROM tasks WHERE id = ?";

    connection.query(sql, [taskId], (error, results) => {
        if (error) {
            return res.status(500).json({
                message: "Failed to delete task"
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });
    });
});

app.put("/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id);
    const title = req.body.title;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            message: "Task title is required"
        });
    }

    const sql = "UPDATE tasks SET title = ? WHERE id = ?";

    connection.query(sql, [title.trim(), taskId], (error, results) => {
        if (error) {
            return res.status(500).json({
                message: "Failed to update task"
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task updated successfully",
            task: {
                id: taskId,
                title: title.trim()
            }
        });
    });
});

app.patch("/tasks/:id/complete", (req, res) => {
    const taskId = Number(req.params.id);

    const findSql = "SELECT * FROM tasks WHERE id = ?";

    connection.query(findSql, [taskId], (error, results) => {
        if (error) {
            return res.status(500).json({
                message: "Failed to find task"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const task = results[0];
        const newCompletedStatus = !task.completed;

        const updateSql = "UPDATE tasks SET completed = ? WHERE id = ?";

        connection.query(
            updateSql,
            [newCompletedStatus, taskId],
            (updateError) => {
                if (updateError) {
                    return res.status(500).json({
                        message: "Failed to update task completion status"
                    });
                }

                res.json({
                    message: "Task completion status updated",
                    task: {
                        id: task.id,
                        title: task.title,
                        completed: newCompletedStatus
                    }
                });
            }
        );
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});