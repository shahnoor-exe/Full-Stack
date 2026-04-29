import React, { useState, useEffect } from 'react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [listings, setListings] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch bookings
      const bRes = await fetch('/api/bookings');
      const bData = await bRes.json();
      setBookings(bData);

      // Fetch listings (spots where isMyListing is true)
      const sRes = await fetch('/api/spots');
      const sData = await sRes.json();
      setListings(sData.filter(s => s.isMyListing));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBookings(bookings.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
      }
    } catch (error) {
      alert("Error cancelling booking");
    }
  };

  const handleRemoveListing = async (id) => {
    if (!window.confirm("Are you sure you want to remove this listing?")) return;
    try {
      const res = await fetch(`/api/spots/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setListings(listings.filter(l => l.id !== id));
      }
    } catch (error) {
      alert("Error removing listing");
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">My Bookings & Listings</h2>

      <div style={{ marginBottom: '20px' }}>
        <button 
          className={`btn ${activeTab === 'bookings' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('bookings')}
          style={{ marginRight: '10px' }}
        >
          My Bookings
        </button>
        <button 
          className={`btn ${activeTab === 'listings' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('listings')}
        >
          My Listings
        </button>
      </div>

      <hr className="divider" />

      {loading ? (
        <p className="empty-message">Loading...</p>
      ) : activeTab === 'bookings' ? (
        <div>
          {bookings.length === 0 ? (
            <p className="empty-message">No bookings yet.</p>
          ) : (
            <div className="cards-grid">
              {bookings.map(booking => (
                <div key={booking.id} className="card">
                  <h3>{booking.spotName}</h3>
                  <p>{booking.area}, {booking.city}</p>
                  <p>Date: {booking.date}</p>
                  <p>Hours: {booking.hours}</p>
                  <p style={{ fontWeight: 'bold' }}>Total: ₹{booking.totalPrice}</p>
                  <p style={{ margin: '10px 0' }}>
                    Status: <span className={`badge ${booking.status === 'active' ? 'badge-green' : 'badge-red'}`}>
                      {booking.status.toUpperCase()}
                    </span>
                  </p>
                  {booking.status === 'active' && (
                    <button 
                      className="btn btn-danger" 
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          {listings.length === 0 ? (
            <p className="empty-message">You have not listed any spaces yet.</p>
          ) : (
            <div className="cards-grid">
              {listings.map(listing => (
                <div key={listing.id} className="card">
                  <h3>{listing.name}</h3>
                  <p>{listing.area}, {listing.city}</p>
                  <p>₹{listing.pricePerHour} / hour</p>
                  <p>Total Slots: {listing.totalSlots}</p>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleRemoveListing(listing.id)}
                    style={{ marginTop: '10px' }}
                  >
                    Remove Listing
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
