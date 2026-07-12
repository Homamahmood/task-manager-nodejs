# 📋 Task Manager

A simple Task Manager web application built while learning **Node.js**, **Express.js**, and **MySQL**. This project helped me understand how the frontend, backend, and database work together to build a complete CRUD application.

Users can add tasks, edit them, mark them as completed, and delete them. All task data is stored in a MySQL database.

---

## 🚀 Features

- Add new tasks
- View all tasks
- Edit task titles
- Mark tasks as completed or pending
- Delete tasks
- Store tasks permanently using MySQL

---

## 🛠️ Technologies Used

### Frontend
- HTML
- CSS
- JavaScript
- Fetch API

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Tools
- Git
- GitHub
- VS Code
- Postman

---

## 📂 Project Structure

```
TO-DO APP
│
├── public
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── db.js
├── package.json
├── .env
└── README.md
```

---

## ⚙️ How to Run the Project

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a MySQL database

```sql
CREATE DATABASE task_manager;
```

Create the table:

```sql
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE
);
```

### 4. Configure the `.env` file

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_manager
PORT=3000
```

### 5. Start the server

```bash
node server.js
```

Open your browser and visit:

```
http://localhost:3000
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /tasks | Get all tasks |
| POST | /tasks | Add a new task |
| PUT | /tasks/:id | Update a task |
| PATCH | /tasks/:id/complete | Toggle task status |
| DELETE | /tasks/:id | Delete a task |

---

## 📸 Screenshots

### Home Page

(Add screenshot here)

### Task Added

(Add screenshot here)

### Completed Task

(Add screenshot here)

---

## 📚 What I Learned

While building this project, I learned how to:

- Build a REST API using Express.js
- Connect a Node.js application with MySQL
- Perform CRUD operations
- Use Fetch API to communicate between frontend and backend
- Handle asynchronous operations with `async/await`
- Organize a Node.js project into frontend and backend
- Use Git and GitHub for version control

---

## 🔮 Future Improvements

- User authentication
- Due dates for tasks
- Task categories
- Search and filter tasks
- Responsive design for mobile devices

---

## 👨‍💻 Author

**Homa Mahmood**

This project was built as part of my journey to learn full-stack web development with Node.js and MySQL.