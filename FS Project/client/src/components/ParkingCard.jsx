import React from 'react';

const ParkingCard = ({ spot, onBook }) => {
  const isFull = spot.availableSlots === 0;

  return (
    <div className="card">
      <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>{spot.name}</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <p style={{ fontSize: '18px', margin: 0 }}>{spot.area}, {spot.city}</p>
        <a 
          href={spot.mapUrl ? spot.mapUrl : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${spot.name}, ${spot.area}, ${spot.city}`)}`}
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#007bff', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          🗺️ Directions
        </a>
      </div>
      <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '5px 0' }}>₹{spot.pricePerHour} / hour</p>
      <p>Type: {spot.parkingType}</p>
      <p>Accepts: {spot.vehicle}</p>
      <p>Timing: {spot.openTime} – {spot.closeTime}</p>
      
      <p className={isFull ? "text-red" : "text-green"} style={{ fontSize: '20px', margin: '10px 0' }}>
        {isFull ? "Full" : `Available: ${spot.availableSlots} slots`}
      </p>

      <div style={{ margin: '15px 0', fontSize: '16px' }}>
        {spot.hasCCTV && <span style={{ marginRight: '12px' }}>✓ CCTV</span>}
        {spot.hasGuard && <span style={{ marginRight: '12px' }}>✓ Guard</span>}
        {spot.hasEV && <span style={{ marginRight: '12px' }}>✓ EV Charging</span>}
        {spot.hasCarWash && <span style={{ marginRight: '12px' }}>✓ Car Wash</span>}
      </div>

      <button 
        className="btn btn-primary" 
        style={{ width: '100%', marginTop: '10px' }}
        onClick={() => onBook(spot)}
        disabled={isFull}
      >
        {isFull ? "Full" : "Book Now"}
      </button>
    </div>
  );

};

export default ParkingCard;
