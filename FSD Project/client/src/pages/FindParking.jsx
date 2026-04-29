import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ParkingCard from '../components/ParkingCard';
import BookingModal from '../components/BookingModal';
import Toast from '../components/Toast';

const FindParking = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCity = queryParams.get('city') || '';

  const [city, setCity] = useState(initialCity);
  const [vehicle, setVehicle] = useState('');
  const [keyword, setKeyword] = useState('');
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [toast, setToast] = useState(null);

  const fetchSpots = async () => {
    setLoading(true);
    try {
      let url = `/api/spots?city=${city}&vehicle=${vehicle}`;
      const response = await fetch(url);
      let data = await response.json();

      if (keyword) {
        data = data.filter(spot => 
          spot.name.toLowerCase().includes(keyword.toLowerCase()) ||
          spot.area.toLowerCase().includes(keyword.toLowerCase())
        );
      }

      setSpots(data);
    } catch (error) {
      setToast({ message: "Failed to fetch spots", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpots();
  }, []); // Initial fetch

  const handleBook = (spot) => {
    setSelectedSpot(spot);
  };

  const handleConfirmBooking = async (vehicleNumber, hours) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spotId: selectedSpot.id,
          spotName: selectedSpot.name,
          city: selectedSpot.city,
          area: selectedSpot.area,
          vehicleNumber,
          hours,
          totalPrice: hours * selectedSpot.pricePerHour
        })
      });

      if (response.ok) {
        // Update local state
        setSpots(spots.map(s => 
          s.id === selectedSpot.id 
          ? { ...s, availableSlots: s.availableSlots - 1 } 
          : s
        ));
        setToast({ message: "Booking confirmed!", type: "success" });
        setSelectedSpot(null);
      } else {
        const error = await response.json();
        setToast({ message: error.message || "Booking failed", type: "error" });
      }
    } catch (error) {
      setToast({ message: "Something went wrong", type: "error" });
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">Find Parking</h2>
      
      <div className="card" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
          <label>City</label>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">All Cities</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Pune">Pune</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Kanpur">Kanpur</option>
          </select>
        </div>

        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
          <label>Vehicle Type</label>
          <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
            <option value="">Any</option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
          <label>Keyword</label>
          <input 
            type="text" 
            placeholder="Search by area or name..." 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={fetchSpots} style={{ height: '38px' }}>
          Search
        </button>
      </div>

      {loading ? (
        <p className="empty-message">Loading...</p>
      ) : spots.length === 0 ? (
        <p className="empty-message">No parking spots found. Try a different city.</p>
      ) : (
        <div className="cards-grid">
          {spots.map(spot => (
            <ParkingCard key={spot.id} spot={spot} onBook={handleBook} />
          ))}
        </div>
      )}

      {selectedSpot && (
        <BookingModal 
          spot={selectedSpot} 
          onClose={() => setSelectedSpot(null)} 
          onConfirm={handleConfirmBooking}
        />
      )}

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
};

export default FindParking;
