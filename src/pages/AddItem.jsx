// pages/AddItem.jsx
import React, { useState } from "react";
import { addTask } from "../services/api";
import { useNavigate } from "react-router-dom";

function AddItem() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert("Title is required");
            return;
        }
        await addTask({ title, description, completed: false });
        navigate("/list");
    };

    return (
        <div>
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddItem;
