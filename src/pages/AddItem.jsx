// pages/AddItem.jsx - Modern task creation form with validation and styling
import React, { useState } from "react";
import { addTask } from "../services/api";
import { useNavigate } from "react-router-dom";

/**
 * AddItem/Task creation form, validation
 */
function AddItem() {
    // State for form fields
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [detailedDescription, setDetailedDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();

    /**
     * Validate form fields before submission----@returns {boolean} - True if form is valid, false otherwise
     */
    const validateForm = () => {
        const newErrors = {};
        
        if (!title.trim()) {
            newErrors.title = "Task title is required";
        } else if (title.length < 3) {
            newErrors.title = "Task title must be at least 3 characters";
        }
        
        if (!description.trim()) {
            newErrors.description = "Short description is required";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


     // * Handle form submission with validation and loading states
     // * @param {Event} e - Form submission event

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        try {
            setIsSubmitting(true);
            
            // Send task data to backend API
            await addTask({
                title: title.trim(),
                description: description.trim(),
                detailed_description: detailedDescription.trim(),
                completed: false,
            });

            // Redirect to task list on success
            navigate("/list");
        } catch (error) {
            console.error("Failed to add task:", error);
            setErrors({ submit: "Failed to create task. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };


     // * Handle input changes,clear errors for that field
     // * @param {Function} setter- State setter function
     // * @param {string} fieldName - Name of the field to clear errors for

    const handleInputChange = (setter, fieldName) => {
        return (e) => {
            setter(e.target.value);
            if (errors[fieldName]) {
                setErrors(prev => ({ ...prev, [fieldName]: undefined }));
            }
        };
    };

    return (
        <div className="main-container page-section">
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                {/* Page header */}
                <div className="mb-xl">
                    <h2>Create New Task</h2>
                    <p className="text-secondary">
                        Fill in the details below to create a new task.
                    </p>
                </div>

                {/* Task creation form */}
                <form onSubmit={handleSubmit} className="card">
                    {/* Title field */}
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">
                            Task Title *
                        </label>
                        <input
                            id="title"
                            type="text"
                            className={`form-control ${errors.title ? 'error' : ''}`}
                            placeholder="Enter task title..."
                            value={title}
                            onChange={handleInputChange(setTitle, 'title')}
                            disabled={isSubmitting}
                            maxLength={100}
                        />
                        {errors.title && (
                            <p className="text-danger" style={{ fontSize: '0.875rem', marginTop: 'var(--spacing-xs)', color: 'var(--danger-color)' }}>
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Short description field */}
                    <div className="form-group">
                        <label htmlFor="description" className="form-label">
                            Short Description *
                        </label>
                        <input
                            id="description"
                            type="text"
                            className={`form-control ${errors.description ? 'error' : ''}`}
                            placeholder="Brief description of the task..."
                            value={description}
                            onChange={handleInputChange(setDescription, 'description')}
                            disabled={isSubmitting}
                            maxLength={200}
                        />
                        {errors.description && (
                            <p className="text-danger" style={{ fontSize: '0.875rem', marginTop: 'var(--spacing-xs)', color: 'var(--danger-color)' }}>
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Detailed description field */}
                    <div className="form-group">
                        <label htmlFor="detailedDescription" className="form-label">
                            Detailed Description
                        </label>
                        <textarea
                            id="detailedDescription"
                            className="form-control"
                            placeholder="Add more details about this task (optional)..."
                            value={detailedDescription}
                            onChange={handleInputChange(setDetailedDescription, 'detailedDescription')}
                            disabled={isSubmitting}
                            rows={5}
                            maxLength={1000}
                            style={{ resize: 'vertical' }}
                        />
                        <p className="text-secondary" style={{ fontSize: '0.75rem', marginTop: 'var(--spacing-xs)' }}>
                            {detailedDescription.length}/1000 characters
                        </p>
                    </div>

                    {/* Form submission error */}
                    {errors.submit && (
                        <div className="form-group">
                            <p className="text-danger" style={{ color: 'var(--danger-color)' }}>
                                {errors.submit}
                            </p>
                        </div>
                    )}

                    {/* Form action buttons */}
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'flex-end' }}>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate("/list")}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Creating...' : 'Create Task'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddItem;
