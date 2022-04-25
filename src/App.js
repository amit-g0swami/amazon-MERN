import React, { useEffect } from 'react';
import './App.css';
import Header from "./components/header/Header"
import Home from './components/home/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CheckOut from './components/checkout/CheckOut';
import Login from './components/login/Login';
import Payment from './components/payment/Payment';
import { auth } from "./firebase";
import { useStateValue } from "./components/StateProvider";

const App = () => {
  const [{ }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
