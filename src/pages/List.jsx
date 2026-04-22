// pages/List.jsx
import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { getTasks } from "../services/api";

function List() {
    const [tasks, setTasks] = useState([]);

    const loadTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <div>
            <h2>Task List</h2>
            {tasks.map((task) => (
                <ItemCard key={task.id} task={task} onTaskUpdated={loadTasks} />
            ))}
        </div>
    );
}

export default List;
