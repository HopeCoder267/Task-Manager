// components/ItemCard.jsx - Modern task card component with responsive design
import React from "react";
import { Link } from "react-router-dom";
import "./ItemCard.css";


 // * ItemCard- Displays a single task with modern styling
 // * @param {Object} task - Task object containing id, title, description, completed status.
 // * @param {Function} onTaskUpdated - Callback function to refresh task list after updates.

function ItemCard({ task, onTaskUpdated }) {
    // Determine status badge class and text based on completion status
    const statusClass = task.completed ? "status-completed" : "status-pending";
    const statusText = task.completed ? "Completed" : "Pending";
    const statusIcon = task.completed ? "✓" : "○";

    // Determine priority class for visual indicator (optional enhancement)
    const priorityClass = task.priority ? `priority-${task.priority}` : "";

    return (
        <div className={`item-card ${priorityClass}`}>
            {/* Task title with truncation for long titles */}
            <h3 title={task.title}>{task.title}</h3>
            
            {/* Task description with line clamping */}
            <p title={task.description}>{task.description}</p>
            
            {/* Status badge with visual indicator */}
            <div className="status-container">
                <span className={`status-badge ${statusClass}`}>
                    <span>{statusIcon}</span>
                    <span>{statusText}</span>
                </span>
            </div>
            
            {/* Card footer with action link */}
            <div className="card-footer">
                <Link to={`/details/${task.id}`} className="link">
                    View Details →
                </Link>
            </div>
        </div>
    );
}

export default ItemCard;
