import React, { useState, useEffect } from 'react';
import './BookUpdate.css';
import UpdateForm from './UpdateForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function BookUpdate() {
    const [books, setBooks] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5); // Change this value as needed

    useEffect(() => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:5000/fetchAllBooks');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    setBooks(data);
                } else {
                    console.error('Error fetching posts:', xhr.statusText);
                }
            }
        };
        xhr.send();
    }, [showPopup]);

    const handleUpdate = (book) => {
        setSelectedBook(book);
        setShowPopup(true);
    };

    const handleUpdateSubmit = (updatedData) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', 'http://localhost:5000/updateBook');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    console.log("Update response:", data);
                    setShowPopup(false);
                    toast.success('Book Data Updated Successfully !');
                } else {
                    console.error('Error updating book:', xhr.statusText);
                    toast.error('Unable to Update the Data !');
                }
            }
        };
        xhr.send(JSON.stringify(updatedData));
    };

    const handleCancel = () => {
        setShowPopup(false);
    };

    const handleDelete = async (book) => {
        const confirmDelete = window.confirm('Are you sure you want to delete?');
        if (confirmDelete) {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open('DELETE', 'http://localhost:5000/deleteBook');
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            // console.log('Book deleted successfully.');
                            toast.success('Book deleted successfully!');
                            setBooks(prevBooks => prevBooks.filter(b => b.book_id !== book.book_id));
                        } else {
                            console.error('Failed to delete book:', xhr.statusText);
                            toast.error('An error occurred while deleting the book.');
                        }
                    }
                };
                xhr.send(JSON.stringify({ book_id: book.book_id }));
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    };


    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const totalPages = Math.ceil(books.length / booksPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
    };

    const handlePageChange = (event) => {
        const pageNumber = parseInt(event.target.value);
        if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="container">
            <div>
                <ul>
                    <li> <Link to={'/insertBooks'}> <button className="link"> Insert Book </button> </Link> </li> <br />
                    <li> <Link to={'/'}> <button className='link'> Home Page </button> </Link> </li>
                </ul>
            </div>
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Publish Year</th>
                        <th>Quantity Available</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {currentBooks.map((book, index) => (
                        <tr key={index}>
                            <td>{book.book_id}</td>
                            <td>{book.title}</td>
                            <td>{book.book_description}</td>
                            <td>{book.publish_year}</td>
                            <td>{book.quantity_available}</td>
                            <td> <button className="update" onClick={() => handleUpdate(book)}>Update</button> </td>
                            <td> <button className="delete" onClick={() => handleDelete(book)}>Delete</button> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <input
                    type="number"
                    value={currentPage}
                    min={1}
                    max={totalPages}
                    onChange={handlePageChange}
                />
                <span> of {totalPages}</span>
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
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
