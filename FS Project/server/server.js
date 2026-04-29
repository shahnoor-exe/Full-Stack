const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const spotsFilePath = path.join(__dirname, 'data', 'spots.json');
const bookingsFilePath = path.join(__dirname, 'data', 'bookings.json');

// Helper functions for file I/O
const readData = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// 1. GET /api/spots
app.get('/api/spots', (req, res) => {
  let spots = readData(spotsFilePath);
  const { city, vehicle } = req.query;

  if (city) {
    spots = spots.filter(s => s.city.toLowerCase() === city.toLowerCase());
  }
  if (vehicle && vehicle !== "Both") {
    spots = spots.filter(s => s.vehicle === vehicle || s.vehicle === "Both");
  }
  
  res.json(spots);
});

// 2. POST /api/spots
app.post('/api/spots', (req, res) => {
  const spots = readData(spotsFilePath);
  const newSpot = {
    ...req.body,
    id: spots.length > 0 ? Math.max(...spots.map(s => s.id)) + 1 : 1,
    isMyListing: true
  };
  spots.push(newSpot);
  writeData(spotsFilePath, spots);
  res.status(201).json(newSpot);
});

// 3. DELETE /api/spots/:id
app.delete('/api/spots/:id', (req, res) => {
  let spots = readData(spotsFilePath);
  const id = parseInt(req.params.id);
  spots = spots.filter(s => s.id !== id);
  writeData(spotsFilePath, spots);
  res.json({ message: "Spot removed" });
});

// 4. GET /api/bookings
app.get('/api/bookings', (req, res) => {
  const bookings = readData(bookingsFilePath);
  res.json(bookings);
});

// 5. POST /api/bookings
app.post('/api/bookings', (req, res) => {
  const bookings = readData(bookingsFilePath);
  const spots = readData(spotsFilePath);
  
  const newBooking = {
    ...req.body,
    id: "B" + Date.now(),
    status: "active",
    date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
  };

  // Find spot and reduce availableSlots
  const spotIndex = spots.findIndex(s => s.id === req.body.spotId);
  if (spotIndex !== -1) {
    if (spots[spotIndex].availableSlots > 0) {
      spots[spotIndex].availableSlots -= 1;
      writeData(spotsFilePath, spots);
      bookings.push(newBooking);
      writeData(bookingsFilePath, bookings);
      res.status(201).json(newBooking);
    } else {
      res.status(400).json({ message: "No slots available" });
    }
  } else {
    res.status(404).json({ message: "Spot not found" });
  }
});

// 6. DELETE /api/bookings/:id
app.delete('/api/bookings/:id', (req, res) => {
  const bookings = readData(bookingsFilePath);
  const id = req.params.id;
  const bookingIndex = bookings.findIndex(b => b.id === id);
  
  if (bookingIndex !== -1) {
    bookings[bookingIndex].status = "cancelled";
    writeData(bookingsFilePath, bookings);
    res.json({ message: "Booking cancelled" });
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
