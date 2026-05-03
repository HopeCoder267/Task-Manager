// pages/Details.jsx

import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { getTaskById, updateTask, deleteTask } from "../services/api";



function Details() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [task, setTask] = useState(null);



    useEffect(() => {

        getTaskById(id).then(setTask);

    }, [id]);



    if (!task) return <p>Loading...</p>;



    const handleToggleStatus = async () => {

        await updateTask(task.id, { ...task, completed: !task.completed });

        const updated = await getTaskById(id);

        setTask(updated);

    };



    const handleDelete = async () => {

        await deleteTask(task.id);

        navigate("/list");

    };



    return (

        <div>

            <h2>{task.title}</h2>

            <h4>{task.description}</h4>

            <p>{task.detailed_description}</p> {/* ✅ show detailed description */}

            <p>Status: {task.completed ? "✅ Completed" : "❌ Pending"}</p>

            <button onClick={handleToggleStatus}>

                {task.completed ? "Mark Pending" : "Mark Complete"}

            </button>

            <button onClick={handleDelete} style={{ color: "red" }}>

                Delete

            </button>

            <button onClick={() => navigate("/list")}>Close Details</button>

        </div>

    );

}



export default Details;

