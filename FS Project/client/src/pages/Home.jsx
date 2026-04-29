import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const cities = ["Mumbai", "Gurgaon", "Pune", "Bengaluru", "Hyderabad", "Kanpur"];

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '80px' }}>
      <h1 style={{ fontSize: '64px', marginBottom: '30px' }}>ParkEase</h1>
      <p style={{ fontSize: '24px', color: 'var(--empty-message)', marginBottom: '60px', maxWidth: '800px', margin: '0 auto 60px' }}>
        Find affordable parking spots in busy Indian cities — or earn money by listing your empty space.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '80px' }}>
        <button 
          className="btn btn-primary" 
          style={{ padding: '20px 40px', fontSize: '24px' }}
          onClick={() => navigate('/find')}
        >
          🔍 Find Parking
        </button>
        <button 
          className="btn btn-success" 
          style={{ padding: '20px 40px', fontSize: '24px' }}
          onClick={() => navigate('/list')}
        >
          ➕ List Your Space
        </button>
      </div>

      <h3 style={{ fontSize: '32px', marginBottom: '30px' }}>Supported Cities</h3>
      <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {cities.map(city => (
          <li 
            key={city} 
            style={{ 
              background: 'var(--card-bg)', 
              padding: '15px 30px', 
              border: '1px solid var(--border-color)', 
              borderRadius: '30px',
              cursor: 'pointer',
              fontSize: '20px',
              fontWeight: 'bold',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onClick={() => navigate(`/find?city=${city}`)}
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

