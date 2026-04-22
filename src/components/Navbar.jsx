// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // optional styling

function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/list">List</Link></li>
                <li><Link to="/add">Add Task</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
