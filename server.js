const express = require("express");

const app = express();

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

app.listen(3000, () => {
    console.log("Server running on port 3000");
});