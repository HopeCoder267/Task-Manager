// pages/Details.jsx - Modern task details page with enhanced functionality
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, updateTask, deleteTask } from "../services/api";


// * Details - Displays comprehensive task information with action buttons
// * Features modern design, loading states, and user-friendly interactions

function Details() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);


    // * Load task data from API
    // * Handle loading states and error scenarios

    useEffect(() => {
        const loadTask = async () => {
            try {
                setLoading(true);
                const data = await getTaskById(id);
                setTask(data);
                setError(null);
            } catch (err) {
                console.error("Failed to load task:", err);
                setError("Failed to load task details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadTask();
    }, [id]);


    // * Toggle task completion status
    // * Updates the task and refreshes the data

    const handleToggleStatus = async () => {
        if (!task || isUpdating) return;

        try {
            setIsUpdating(true);
            const updatedTask = { ...task, completed: !task.completed };
            await updateTask(task.id, updatedTask);

            // Refresh task data to get latest state
            const refreshed = await getTaskById(id);
            setTask(refreshed);
        } catch (err) {
            console.error("Failed to update task:", err);
            setError("Failed to update task status. Please try again.");
        } finally {
            setIsUpdating(false);
        }
    };

    /**
     * Delete task with confirmation
     * confirmation dialog before deletion
     */
    const handleDelete = async () => {
        if (!task) return;

        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${task.title}"? This action cannot be undone.`
        );

        if (!confirmDelete) return;

        try {
            await deleteTask(task.id);
            navigate("/list");
        } catch (err) {
            console.error("Failed to delete task:", err);
            setError("Failed to delete task. Please try again.");
        }
    };

    // Loading state display
    if (loading) {
        return (
            <div className="main-container page-section">
                <div className="text-center">
                    <h2>Loading Task Details...</h2>
                    <p className="text-secondary">Please wait while we fetch the task information.</p>
                </div>
            </div>
        );
    }

    // Error state display
    if (error || !task) {
        return (
            <div className="main-container page-section">
                <div className="text-center">
                    <h2>Error</h2>
                    <p className="text-danger" style={{ color: 'var(--danger-color)' }}>
                        {error || "Task not found."}
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/list")}
                    >
                        Back to Task List
                    </button>
                </div>
            </div>
        );
    }

    // Determine status styling
    const statusClass = task.completed ? "status-completed" : "status-pending";
    const statusText = task.completed ? "Completed" : "Pending";
    const statusIcon = task.completed ? "✓" : "○";

    return (
        <div className="main-container page-section">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {/* Task header */}
                <div className="mb-xl">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-md)', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
                        <h1 style={{ margin: 0, flex: 1 }}>{task.title}</h1>
                        <span className={`status-badge ${statusClass}`}>
                            <span>{statusIcon}</span>
                            <span>{statusText}</span>
                        </span>
                    </div>
                    <p className="text-secondary" style={{ fontSize: '1.125rem', marginBottom: 0 }}>
                        {task.description}
                    </p>
                </div>

                {/* Task details card */}
                <div className="card mb-xl">
                    <h3 className="mb-md">Task Details</h3>

                    {/* Detailed description */}
                    <div className="mb-lg">
                        <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 'var(--spacing-sm)', color: 'var(--text-primary)' }}>
                            Detailed Description
                        </h4>
                        <p style={{
                            whiteSpace: 'pre-wrap',
                            lineHeight: 1.6,
                            color: task.detailed_description ? 'var(--text-secondary)' : 'var(--text-secondary)',
                            fontStyle: task.detailed_description ? 'normal' : 'italic'
                        }}>
                            {task.detailed_description || "No detailed description provided."}
                        </p>
                    </div>

                    {/* Task metadata */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 'var(--spacing-md)',
                        paddingTop: 'var(--spacing-md)',
                        borderTop: '1px solid var(--border-color)'
                    }}>
                        <div>
                            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 'var(--spacing-xs)', color: 'var(--text-primary)' }}>
                                Status
                            </h4>
                            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                                {task.completed ? "Completed" : "Pending"}
                            </p>
                        </div>

                        <div>
                            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 'var(--spacing-xs)', color: 'var(--text-primary)' }}>
                                Task ID
                            </h4>
                            <p style={{ margin: 0, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                                #{task.id}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Error message display */}
                {error && (
                    <div className="card mb-lg" style={{ borderColor: 'var(--danger-color)', backgroundColor: '#fef2f2' }}>
                        <p style={{ margin: 0, color: 'var(--danger-color)' }}>
                            {error}
                        </p>
                    </div>
                )}

                {/* Action buttons */}
                <div className="card" style={{ backgroundColor: 'var(--background-color)' }}>
                    <h3 className="mb-md">Actions</h3>
                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                        <button
                            className="btn btn-primary"
                            onClick={handleToggleStatus}
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Updating...' : (task.completed ? 'Mark as Pending' : 'Mark as Complete')}
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                            disabled={isUpdating}
                        >
                            Delete Task
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate("/list")}
                        >
                            Back to List
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;
