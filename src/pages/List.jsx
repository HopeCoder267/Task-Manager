// pages/List.jsx ,task list page with responsive grid layout
import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { getTasks } from "../services/api";

/**
 * List -  all tasks in a responsive grid layout.....loading states and empty state handling
 */
function List() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    /**
     * Load tasks from API and update state.............Handle loading states and error scenarios
     */
    const loadTasks = async () => {
        try {
            setLoading(true);
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error("Failed to load tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    // Load tasks on component mount
    useEffect(() => {
        loadTasks();
    }, []);

    // Loading state display
    if (loading) {
        return (
            <div className="main-container page-section">
                <div className="text-center">
                    <h2>Loading Tasks...</h2>
                    <p className="text-secondary">Please wait while we fetch your tasks.</p>
                </div>
            </div>
        );
    }

    // Empty state display
    if (tasks.length === 0) {
        return (
            <div className="main-container page-section">
                <div className="text-center">
                    <h2>No Tasks Found</h2>
                    <p className="text-secondary mb-xl">
                        You haven't created any tasks yet. Get started by adding your first task!
                    </p>
                    <a href="/add" className="btn btn-primary">
                        Create Your First Task
                    </a>
                </div>
            </div>
        );
    }

    // Main task list display
    return (
        <div className="main-container page-section">
            {/* Page header with task count */}
            <div className="mb-xl">
                <h2>Task List</h2>
                <p className="text-secondary">
                    You have {tasks.length} task{tasks.length !== 1 ? 's' : ''} in total
                </p>
            </div>

            {/* Responsive grid of task cards */}
            <div className="item-card-grid">
                {tasks.map((task) => (
                    <ItemCard 
                        key={task.id} 
                        task={task} 
                        onTaskUpdated={loadTasks} 
                    />
                ))}
            </div>
        </div>
    );
}

export default List;
