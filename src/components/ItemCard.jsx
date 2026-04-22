// components/ItemCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./ItemCard.css";

function ItemCard({ task }) {
    return (
        <div className="item-card">
            <h3>{task.title}</h3>
            <p>Status: {task.completed ? "✅ Completed" : "❌ Pending"}</p>
            <Link to={`/details/${task.id}`}>View Details</Link>
        </div>
    );
}

export default ItemCard;
