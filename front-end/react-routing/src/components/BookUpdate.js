// import React, { useState, useEffect } from 'react';
// import './BookUpdate.css';

// function BookUpdate() {
//     const [books, setBooks] = useState([]);
//     const [selectedBook, setSelectedBook] = useState(null);

//     useEffect(() => {
//         fetch('http://localhost:5000/fetchAllBooks')
//             .then(response => response.json())
//             .then(data => setBooks(data))
//             .catch(error => console.error('Error fetching books:', error));
//     }, []);

//     const handleEdit = (book) => {
//         setSelectedBook(book);
//     };

//     const handleCancelEdit = () => {
//         setSelectedBook(null);
//     };

//     const handleUpdate = (updatedBook) => {
//         fetch(`http://localhost:5000/updateBook`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedBook),
//         })
//         .then(response => {
//             if (response.ok) {
//                 setBooks(prevBooks => prevBooks.map(book => book.book_id === updatedBook.book_id ? updatedBook : book));
//                 setSelectedBook(null);
//             } else {
//                 console.error('Error updating book:', response.statusText);
//             }
//         })
//         .catch(error => console.error('Error updating book:', error));
//     };

//     return (
//         <div className="container">
//             <table className="table-container">
//                 <thead>
//                     <tr>
//                         <th>Book_Id</th>
//                         <th>Title</th>
//                         <th>Book_Description</th>
//                         <th>Publish_Year</th>
//                         <th>Quantity_Available</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {books.map((book, index) => (
//                         <tr key={index}>
//                             <td>{book.book_id}</td>
//                             <td>{book.title}</td>
//                             <td>{book.book_description}</td>
//                             <td>{book.publish_year}</td>
//                             <td>{book.quantity_available}</td>
//                             <td>
//                                 <button onClick={() => handleEdit(book)}>EDIT</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             {selectedBook && (
//                 <EditForm
//                     book={selectedBook}
//                     onUpdate={handleUpdate}
//                     onCancel={handleCancelEdit}
//                 />
//             )}
//         </div>
//     );
// }

// function EditForm({ book, onUpdate, onCancel }) {
//     const [formData, setFormData] = useState(book);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onUpdate(formData); // Call onUpdate with updated book data
//     };

//     return (
//         <form onSubmit={handleSubmit} className="edit-form">
//             <label htmlFor="title">Title:</label>
//             <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />

//             <label htmlFor="book_description">Description:</label>
//             <input type="text" id="book_description" name="book_description" value={formData.book_description} onChange={handleChange} />

//             <label htmlFor="publish_year">Publish Year:</label>
//             <input type="number" id="publish_year" name="publish_year" value={formData.publish_year} onChange={handleChange} />

//             <label htmlFor="quantity_available">Quantity Available:</label>
//             <input type="number" id="quantity_available" name="quantity_available" value={formData.quantity_available} onChange={handleChange} />

//             <div>
//                 <button type="submit">Update</button>
//                 <button type="button" onClick={onCancel}>Cancel</button>
//             </div>
//         </form>
//     );
// }

// export default BookUpdate;

import React, { useState, useEffect } from 'react';
import './BookUpdate.css';

function BookUpdate() {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/fetchAllBooks')
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const handleEdit = (book) => {
        setSelectedBook(book);
    };

    const handleCancelEdit = () => {
        setSelectedBook(null);
    };

    const handleUpdate = (updatedBook) => {
        fetch(`http://localhost:5000/updateBook`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook),
        })
        .then(response => {
            if (response.ok) {
                setBooks(prevBooks => prevBooks.map(book => book.book_id === updatedBook.book_id ? updatedBook : book));
                setSelectedBook(null);
            } else {
                console.error('Error updating book:', response.statusText);
            }
        })
        .catch(error => console.error('Error updating book:', error));
    };

    return (
        <div className="container">
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Book_Id</th>
                        <th>Title</th>
                        <th>Book_Description</th>
                        <th>Publish_Year</th>
                        <th>Quantity_Available</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={index}>
                            <td>{book.book_id}</td>
                            <td>{book.title}</td>
                            <td>{book.book_description}</td>
                            <td>{book.publish_year}</td>
                            <td>{book.quantity_available}</td>
                            <td>
                                <button onClick={() => handleEdit(book)}>EDIT</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedBook && (
                <EditForm
                    book={selectedBook}
                    onUpdate={handleUpdate}
                    onCancel={handleCancelEdit}
                />
            )}
        </div>
    );
}

function EditForm({ book, onUpdate, onCancel }) {
    const [formData, setFormData] = useState(book);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData); // Call onUpdate with updated book data
    };

    return (
        <form onSubmit={handleSubmit} className="edit-form">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />

            <label htmlFor="book_description">Description:</label>
            <input type="text" id="book_description" name="book_description" value={formData.book_description} onChange={handleChange} />

            <label htmlFor="publish_year">Publish Year:</label>
            <input type="number" id="publish_year" name="publish_year" value={formData.publish_year} onChange={handleChange} />

            <label htmlFor="quantity_available">Quantity Available:</label>
            <input type="number" id="quantity_available" name="quantity_available" value={formData.quantity_available} onChange={handleChange} />

            <div>
                <button type="submit">Update</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default BookUpdate;
