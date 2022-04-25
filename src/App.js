import React from 'react';
import './App.css';
import Header from "./components/header/Header"
import Home from './components/home/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CheckOut from './components/checkout/CheckOut';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
