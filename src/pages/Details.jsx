// pages/Details.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskById } from "../services/api";

function Details() {
    const { id } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
        getTaskById(id).then(setTask);
    }, [id]);

    if (!task) return <p>Loading...</p>;

    return (
        <div>
            <h2>{task.title}</h2>
            <p>Description: {task.description}</p>
            <p>Status: {task.completed ? "✅ Completed" : "❌ Pending"}</p>
        </div>
    );
}

export default Details;
