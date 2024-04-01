// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/HomePage.js';
import FetchAllBookData from './components/FetchAllBookData.js' 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/fetchAllBooks' element={<FetchAllBookData />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
