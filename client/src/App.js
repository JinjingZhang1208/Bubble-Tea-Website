import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import Detail from './pages/Detail.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<div><Navbar /><Home /><Footer /></div>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/detail/:id" element={<div><Navbar /><Detail /><Footer /></div>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
