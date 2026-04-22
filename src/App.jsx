// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import List from "./pages/List";
import Details from "./pages/Details";
import AddItem from "./pages/AddItem";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                {/* Redirect root "/" to "/home" */}
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/list" element={<List />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/add" element={<AddItem />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
