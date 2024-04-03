import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function Home() {

    return (
        <div>
            <h1> Home Page </h1>
            <ul>
                <li> <Link to={'/updateBooks'}> <button> CRUD PAGE </button> </Link> </li> <br />
                <li> <Link to={'/insertBooks'}> <button> Add Book </button> </Link> </li>
            </ul>
        </div>
    );
};

export default Home;