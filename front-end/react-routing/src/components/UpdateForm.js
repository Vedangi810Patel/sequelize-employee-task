import React, { useState } from 'react';
import './UpdateForm.css';

function UpdateForm({ book, onUpdate, onCancel }) {
    const [formData, setFormData] = useState({
        book_id: book.book_id,
        title: book.title,
        book_description: book.book_description,
        publish_year: book.publish_year,
        quantity_available: book.quantity_available
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <div className="update-form">
            <h3> Update Book Details </h3>
            <form onSubmit={handleSubmit}>
                <input type="number" name="book_id" value={formData.book_id} onChange={handleChange} placeholder="Book ID" />
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
                <input type="text" name="book_description" value={formData.book_description} onChange={handleChange} placeholder="Book Description" />
                <input type="number" name="publish_year" value={formData.publish_year} onChange={handleChange} placeholder="Publish Year" />
                <input type="number" name="quantity_available" value={formData.quantity_available} onChange={handleChange} placeholder="Quantity Available" />
                <div className="form-buttons">
                    <button className="submit" type="submit">Submit</button>
                    <button className="cancel" type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateForm;
