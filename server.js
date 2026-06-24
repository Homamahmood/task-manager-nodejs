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

    const newTask = {
        id: tasks.length + 1,
        title: req.body.title
    };

    tasks.push(newTask);

    res.json({
        message: "Task added successfully",
        task: newTask
    });
});

app.delete("/tasks/:id",(req,res) =>{
    const taskId= Number(req.params.id);
    const taskIndex= tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
        return res.json({message:"Task Not Found!"});
    }

    const deletedTask= tasks.splice(taskIndex,1);
    res.json(
        {message:"Task deleted succesfully",
            task:deletedTask[0]
        }
    );
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});