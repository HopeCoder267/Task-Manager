// Centralized API service for Task Manager frontend
// CRUD functions to interact with backend (Express + PostgreSQL)

// Hosted backend URL from Render logs
const API_URL = "https://task-manager-backend-x6xm.onrender.com/api/tasks";

// ------------ READ ALL TASKS --------------------
export async function getTasks() {
    // Fetch all tasks (list view shows only title + short description + status)
    const res = await fetch(API_URL);
    return res.json();
}

// ----------------- READ SINGLE TASK -------------------------
export async function getTaskById(id) {
    // Fetch one task by ID (details view shows full info including detailed description)
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
}

// --------------- CREATE TASK --------------------
export async function addTask(task) {
    // Add new task with title, description, detailed_description, completed
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    return res.json();
}

// -------------------- UPDATE TASK ----------------------
export async function updateTask(id, task) {
    // Update existing task (title, description, detailed_description, completed)
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    return res.json();
}

// -------------------- DELETE TASK ------------------------
export async function deleteTask(id) {
    // Delete task by ID
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return res.json();
}