import React, { useState, useEffect } from 'react';
import './BookUpdate.css';
import UpdateForm from './UpdateForm';

function BookUpdate() {
    const [books, setBooks] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/fetchAllBooks')
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching posts:', error));
    }, [showPopup]);

    const handleUpdate = (book) => {
        setSelectedBook(book);
        setShowPopup(true);
    };

    const handleUpdateSubmit = (updatedData) => {
        fetch('http://localhost:5000/updateBook', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Update response:", data);
                setShowPopup(false);
            })
            .catch(error => console.error('Error updating book:', error));
    };

    const handleCancel = () => {
        setShowPopup(false);
    };

    const handleDelete = async (book) => {
        const confirmDelete = window.confirm('Are you sure you want to delete?');
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:5000/deleteBook`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ book_id: book.book_id })
                });
                if (response.ok) {
                    console.log('Book deleted successfully.');
                    // Remove the deleted book from the state
                    setBooks(prevBooks => prevBooks.filter(b => b.book_id !== book.book_id));
                } else {
                    console.error('Failed to delete book:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    };

    return (
        <div className="container">
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Publish Year</th>
                        <th>Quantity Available</th>
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
                            <td className="button-container">
                                <button className="update" onClick={() => handleUpdate(book)}>Update</button>
                                <button className="delete" onClick={() => handleDelete(book)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showPopup && (
                <div className="popup-container">
                    <div className="popup">
                        <UpdateForm book={selectedBook} onUpdate={handleUpdateSubmit} onCancel={handleCancel} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookUpdate;

// import React, { useState, useEffect } from 'react';
// import './BookUpdate.css';
// import UpdateForm from './UpdateForm';

// function BookUpdate() {
//     const [books, setBooks] = useState([]);
//     const [showPopup, setShowPopup] = useState(false);
//     const [selectedBook, setSelectedBook] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [booksPerPage] = useState(5); // Change this value as needed

//     useEffect(() => {
//         fetch('http://localhost:5000/fetchAllBooks')
//             .then(response => response.json())
//             .then(data => setBooks(data))
//             .catch(error => console.error('Error fetching posts:', error));
//     }, [showPopup]);

//     const handleUpdate = (book) => {
//         setSelectedBook(book);
//         setShowPopup(true);
//     };

//     const handleUpdateSubmit = (updatedData) => {
//         fetch('http://localhost:5000/updateBook', {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(updatedData)
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log("Update response:", data);
//                 setShowPopup(false);
//             })
//             .catch(error => console.error('Error updating book:', error));
//     };

//     const handleCancel = () => {
//         setShowPopup(false);
//     };

//     const indexOfLastBook = currentPage * booksPerPage;
//     const indexOfFirstBook = indexOfLastBook - booksPerPage;
//     const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

//     const totalPages = Math.ceil(books.length / booksPerPage);

//     const paginate = (pageNumber) => {
//         setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
//     };

//     return (
//         <div className="container">
//             <table className="table-container">
//                 <thead>
//                     <tr>
//                         <th>Book ID</th>
//                         <th>Title</th>
//                         <th>Description</th>
//                         <th>Publish Year</th>
//                         <th>Quantity Available</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentBooks.map((book, index) => (
//                         <tr key={index}>
//                             <td>{book.book_id}</td>
//                             <td>{book.title}</td>
//                             <td>{book.book_description}</td>
//                             <td>{book.publish_year}</td>
//                             <td>{book.quantity_available}</td>
//                             <td className="button-container">
//                                 <button className="update" onClick={() => handleUpdate(book)}>Update</button>
//                                 <button className="delete">Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <div className="pagination">
//                 <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
//                 <span>{currentPage}</span>
//                 <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
//             </div>
//             {showPopup && (
//                 <div className="popup-container">
//                     <div className="popup">
//                         <UpdateForm book={selectedBook} onUpdate={handleUpdateSubmit} onCancel={handleCancel} />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default BookUpdate;
