import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import Detail from './pages/Detail.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Login from './components/Login.jsx';
import Profile from './pages/Profile.jsx';
import NotFound from './pages/NotFound.jsx';
import AuthDebugger from './components/AuthDebugger.jsx';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<div><Navbar /><Home /><Footer /></div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<div><Navbar /><Cart /><Footer /></div>} />
            <Route path="/profile" element={<div><Navbar /><Profile /><Footer /></div>} />
            <Route path="/detail/:id" element={<div><Navbar /><Detail /><Footer /></div>} />
            <Route path="/auth-debug" element={<AuthDebugger />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
