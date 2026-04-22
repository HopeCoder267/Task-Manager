// components/ItemCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { deleteTask, updateTask } from "../services/api";
import "./ItemCard.css";

function ItemCard({ task, onTaskUpdated }) {
    const handleDelete = async () => {
        await deleteTask(task.id);
        onTaskUpdated(); // refresh list after deletion
    };

    const handleToggleStatus = async () => {
        await updateTask(task.id, {
            ...task,
            completed: !task.completed,
        });
        onTaskUpdated(); // refresh list after update
    };

    return (
        <div className="item-card">
            <h3>{task.title}</h3>
            <p>Status: {task.completed ? "✅ Completed" : "❌ Pending"}</p>
            <p>{task.description}</p>
            <Link to={`/details/${task.id}`}>View Details</Link>
            <button onClick={handleToggleStatus}>
                {task.completed ? "Mark Pending" : "Mark Complete"}
            </button>
            <button onClick={handleDelete} style={{ color: "red" }}>
                Delete
            </button>
        </div>
    );
}

export default ItemCard;
