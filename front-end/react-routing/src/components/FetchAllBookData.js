import React, {useState, useEffect} from 'react';
import './FetchAllBookData.css'


function FetchAllBookData() {
    const [books, setBooks] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:5000/fetchAllBooks')
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error('Error fetching posts:', error));
    }, []);
  
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default FetchAllBookData;
  