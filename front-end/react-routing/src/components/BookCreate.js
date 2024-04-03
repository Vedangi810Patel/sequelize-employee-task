import React, { useState } from 'react';
import './BookCreate.css';
// import xhttprequest from 'xhttprequst';

const BookCreate = () => {

    const [formData, setFormData] = useState({
        book_id : '',
        title: '',
        book_description: '',
        publish_year: '',
        quantity_available: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/insertBooks', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    alert('Book added successfully');
                    setFormData({
                        book_id: '',
                        title: '',
                        book_description: '',
                        publish_year: '',
                        quantity_available: ''
                    });
                } else {
                    console.error('Error adding book:', xhr.statusText);
                    alert('Error adding book');
                }
            }
        };
        xhr.send(JSON.stringify(formData));
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit} className='form'>
                <label htmlFor="book_id"> Id: </label>
                <input type="number" name="book_id" id="book_id" value={formData.book_id} placeholder="1" onChange={handleChange}/>

                <label htmlFor="title"> Name: </label>
                <input type="text" name="title" id="title" value={formData.title} placeholder="Cloud Nine" onChange={handleChange}/>

                <label htmlFor="book_description"> Description: </label>
                <input type="text" name="book_description" id="book_description" value={formData.book_description} placeholder="Write Something About Book" onChange={handleChange}/>

                <label htmlFor="publish_year"> Publish Year: </label>
                <input type="number" name="publish_year" id="publish_year" value={formData.publish_year} placeholder="1997" onChange={handleChange}/>

                <label htmlFor="quantity_available"> Quantity Available: </label>
                <input type="number" name="quantity_available" id="quantity_available" value={formData.quantity_available} placeholder="10" onChange={handleChange}/>

                <button type="submit">Add Book</button>
            </form>
        </div>

    )

}


export default BookCreate;