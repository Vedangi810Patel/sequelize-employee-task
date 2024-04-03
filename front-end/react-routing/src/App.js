// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/HomePage.js';
import FetchAllBookData from './components/FetchAllBookData.js' 
import BookCreate from './components/BookCreate.js';
import BookUpdate from './components/BookUpdate.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/fetchAllBooks' element={<FetchAllBookData />} />
            <Route path='/insertBooks' element={<BookCreate />} />
            <Route path='/updateBooks' element={<BookUpdate />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
