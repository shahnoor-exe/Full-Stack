import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FindParking from './pages/FindParking';
import ListSpace from './pages/ListSpace';
import MyBookings from './pages/MyBookings';
import './App.css';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find" element={<FindParking />} />
        <Route path="/list" element={<ListSpace />} />
        <Route path="/bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
