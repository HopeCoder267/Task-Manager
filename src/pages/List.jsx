// pages/List.jsx
import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { getTasks } from "../services/api";

function List() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks().then(setTasks);
    }, []);

    return (
        <div>
            <h2>Task List</h2>
            {tasks.map((task) => (
                <ItemCard key={task.id} task={task} />
            ))}
        </div>
    );
}

export default List;
