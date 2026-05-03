// pages/Home.jsx - Modern home page with hero section and navigation
import React from "react";
import { Link } from "react-router-dom";


 // * Home/Landing page with hero section,quick navigation
 // * call-to-action buttons and app overview

function Home() {
    return (
        <div className="main-container page-section">
            {/* Hero section */}
            <div className="text-center mb-xl">
                <h1 className="mb-md">Task Manager</h1>
                <p className="text-secondary mb-xl" style={{ fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto var(--spacing-xl) auto' }}>

                    Create, track, and complete your tasks with ease.
                </p>
                
                {/* Call-to-action buttons */}
                <div className="flex-center" style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/add" className="btn btn-primary">
                        Create New Task
                    </Link>
                    <Link to="/list" className="btn btn-secondary">
                        View All Tasks
                    </Link>
                </div>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-3 mb-xl">
                <div className="card text-center">
                    <h3 className="mb-md">📝 Create Tasks</h3>
                    <p className="text-secondary">
                       You can add new tasks with titles, descriptions, and detailed information.
                    </p>
                </div>
                
                <div className="card text-center">
                    <h3 className="mb-md">📋 Track Progress</h3>
                    <p className="text-secondary">
                        Monitor your task completion status and stay organized.
                    </p>
                </div>
                
                <div className="card text-center">
                    <h3 className="mb-md">✅ Stay Productive</h3>
                    <p className="text-secondary">
                        Mark completed tasks
                    </p>
                </div>
            </div>

            {/* additional info */}
            <div className="text-center">
                <p className="text-secondary">
                   @HopeKenosi22000476
                </p>
            </div>
        </div>
    );
}

export default Home;
