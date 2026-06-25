const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Homa@123",
    database: "task_manager_db"
});

connection.connect((error) => {
    if (error) {
        console.log("Database connection failed:", error.message);
        return;
    }

    console.log("Connected to MySQL database");
});

module.exports = connection;