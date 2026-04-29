import React, { useState } from 'react';

const BookingModal = ({ spot, onClose, onConfirm }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [hours, setHours] = useState(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vehicleNumber) {
      alert("Please enter vehicle number");
      return;
    }
    onConfirm(vehicleNumber, hours);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Book: {spot.name}</h3>
        <p style={{ marginBottom: '10px' }}>{spot.area}, {spot.city}</p>
        <p style={{ marginBottom: '10px' }}>Price: ₹{spot.pricePerHour} / hour</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Vehicle Number</label>
            <input 
              type="text" 
              placeholder="e.g. MH 01 AB 1234" 
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>How many hours?</label>
            <input 
              type="number" 
              min="1" 
              max="12" 
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
              required
            />
          </div>

          <p style={{ fontWeight: 'bold', margin: '10px 0' }}>
            Total: ₹{hours * spot.pricePerHour}
          </p>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="submit" className="btn btn-success">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
