import React, { useState } from 'react';

const ListSpace = () => {
  const initialForm = {
    name: '',
    city: '',
    area: '',
    address: '',
    vehicle: 'Both',
    totalSlots: '',
    pricePerHour: '',
    parkingType: 'Open',
    openTime: '06:00',
    closeTime: '22:00',
    hasCCTV: false,
    hasGuard: false,
    hasEV: false,
    ownerPhone: '',
    mapUrl: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Simple validation
    if (!formData.name || !formData.city || !formData.area || !formData.address || !formData.ownerPhone) {
      setErrorMessage("Please fill all required fields.");
      return;
    }

    try {
      const response = await fetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          totalSlots: parseInt(formData.totalSlots),
          availableSlots: parseInt(formData.totalSlots),
          pricePerHour: parseInt(formData.pricePerHour)
        })
      });

      if (response.ok) {
        setSuccessMessage("Your parking space has been listed successfully!");
        setFormData(initialForm);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">List Your Parking Space</h2>
      <p className="page-subtitle">Fill the form to register your space</p>

      {successMessage && <p className="text-green" style={{ marginBottom: '15px' }}>{successMessage}</p>}
      {errorMessage && <p className="text-red" style={{ marginBottom: '15px' }}>{errorMessage}</p>}

      <form className="card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Space Name *</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="e.g. Sunny Parking Lot" 
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City *</label>
            <select name="city" value={formData.city} onChange={handleChange}>
              <option value="">Select City</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Pune">Pune</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Kanpur">Kanpur</option>
            </select>
          </div>
          <div className="form-group">
            <label>Area/Locality *</label>
            <input 
              type="text" 
              name="area" 
              value={formData.area} 
              onChange={handleChange} 
              placeholder="e.g. Andheri West" 
            />
          </div>
        </div>

        <div className="form-group">
          <label>Full Address *</label>
          <textarea 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            placeholder="Complete address of your parking space"
            rows="2"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Map Location URL (Optional)</label>
          <input 
            type="url" 
            name="mapUrl" 
            value={formData.mapUrl} 
            onChange={handleChange} 
            placeholder="e.g. https://goo.gl/maps/..." 
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Vehicle Type</label>
            <select name="vehicle" value={formData.vehicle} onChange={handleChange}>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Both">Both</option>
            </select>
          </div>
          <div className="form-group">
            <label>Parking Type</label>
            <select name="parkingType" value={formData.parkingType} onChange={handleChange}>
              <option value="Open">Open</option>
              <option value="Covered">Covered</option>
              <option value="Basement">Basement</option>
              <option value="Multi-level">Multi-level</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Total Slots *</label>
            <input 
              type="number" 
              name="totalSlots" 
              value={formData.totalSlots} 
              onChange={handleChange} 
              placeholder="Number of slots" 
            />
          </div>
          <div className="form-group">
            <label>Price per Hour (₹) *</label>
            <input 
              type="number" 
              name="pricePerHour" 
              value={formData.pricePerHour} 
              onChange={handleChange} 
              placeholder="Price in Rupees" 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Open Time</label>
            <input type="time" name="openTime" value={formData.openTime} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Close Time</label>
            <input type="time" name="closeTime" value={formData.closeTime} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group" style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input type="checkbox" name="hasCCTV" checked={formData.hasCCTV} onChange={handleChange} />
            CCTV
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input type="checkbox" name="hasGuard" checked={formData.hasGuard} onChange={handleChange} />
            Security Guard
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input type="checkbox" name="hasEV" checked={formData.hasEV} onChange={handleChange} />
            EV Charging
          </label>
        </div>

        <div className="form-group">
          <label>Owner Phone Number *</label>
          <input 
            type="text" 
            name="ownerPhone" 
            value={formData.ownerPhone} 
            onChange={handleChange} 
            placeholder="10-digit mobile number" 
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default ListSpace;
