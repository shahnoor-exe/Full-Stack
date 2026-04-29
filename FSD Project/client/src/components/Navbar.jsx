import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span style={{ fontWeight: 'bold', fontSize: '20px' }}>🅿 ParkEase</span>
      </div>
      <div className="navbar-links" style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/">Home</Link>
        <Link to="/find">Find Parking</Link>
        <Link to="/list">List Space</Link>
        <Link to="/bookings">My Bookings</Link>
        <button 
          onClick={toggleTheme} 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'inherit', 
            fontSize: '24px', 
            marginLeft: '24px', 
            cursor: 'pointer',
            padding: '0'
          }}
          title="Toggle Dark Mode"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
