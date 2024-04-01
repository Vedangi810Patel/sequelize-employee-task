import React, { useState } from 'react';
// import xhttprequest from 'xhttprequst';

const BookCrudReact = () => {

    const [formData, setFormData] = useState({
        book_id : '',
        title: '',
        book_description: '',
        publish_year: 1234,
        quantity_available: 0
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/insertBooks', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    alert('Book added successfully');
                    setFormData({
                        book_id: 1,
                        title: '',
                        book_description: '',
                        publish_year: 1234,
                        quantity_available: 0
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
        <div className='main-div'>
            {/* <h1> Form Creation </h1> */}
            <form onSubmit={handleSubmit}>
                <label id='book_id' htmlFor="book_id"> Book Id : </label>
                <input type="number" name="book_id" id="book_id" value={formData.book_id} placeholder="1" onChange={handleChange}/><br />

                <label id='title' htmlFor="title"> Book Name : </label>
                <input type="text" name="title" id="title" value={formData.title} placeholder="Cloud Nine" onChange={handleChange}/> <br />

                <label id='book_description' htmlFor="book_description"> BookDescription : </label>
                <input type="text" name="book_description" id="book_description" value={formData.book_description} placeholder="Write Something About Book" onChange={handleChange}/> <br />

                <label id='publish_year' htmlFor="publish_year"> Pulish Year : </label>
                <input type="number" id="publish_year" name="publish_year" value={formData.publish_year} placeholder="1997" onChange={handleChange} /> <br />

                <label id='quantity_available' htmlFor="quantity_available"> Quantity Available : </label>
                <input type="number" id="quantity_available" name="quantity_available" value={formData.quantity_available} placeholder="1997" onChange={handleChange}/> <br />

                <button type="submit">Add Book</button>
            </form>
        </div>
    )

}

export default BookCrudReact;