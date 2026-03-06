const express = require("express");
const app = express();

app.use(express.json());

const TOTAL_SEATS = 50;

const bookings = [];

function getSeatsByMobile(mobile) {
  return bookings.filter(function (b) {
    return b.mobile === mobile;
  });
}


function isSeatBooked(seatNumber) {
  return bookings.some(function (b) {
    return b.seatNumber === seatNumber;
  });
}


app.post("/book", function (req, res) {
  var mobile = req.body.mobile;
  var seats = req.body.seats;

  
  if (!mobile) {
    return res.status(400).json({ message: "Mobile number is required." });
  }

  
  if (!seats || !Array.isArray(seats) || seats.length === 0) {
    return res.status(400).json({ message: "Seats array is required and cannot be empty." });
  }



  if (seats.length > 10) {
    return res.status(400).json({ message: "Cannot book more than 10 seats in one transaction." });
  }

  if (bookings.length >= TOTAL_SEATS) {
    return res.status(400).json({ message: "Houseful! No seats available." });
  }

  if (bookings.length + seats.length > TOTAL_SEATS) {
    return res.status(400).json({
      message: "Not enough seats available. Only " + (TOTAL_SEATS - bookings.length) + " seat(s) left."
    });
  }

  for (var i = 0; i < seats.length; i++) {
    if (seats[i] < 1 || seats[i] > TOTAL_SEATS) {
      return res.status(400).json({ message: "Seat number " + seats[i] + " is invalid. Valid range is 1 to " + TOTAL_SEATS + "." });
    }
  }

  var uniqueSeats = [];
  for (var i = 0; i < seats.length; i++) {
    if (uniqueSeats.indexOf(seats[i]) !== -1) {
      return res.status(400).json({ message: "Duplicate seat number " + seats[i] + " in your request." });
    }
    uniqueSeats.push(seats[i]);
  }

  for (var i = 0; i < seats.length; i++) {
    if (isSeatBooked(seats[i])) {
      return res.status(400).json({ message: "Seat " + seats[i] + " is already booked." });
    }
  }

  for (var i = 0; i < seats.length; i++) {
    bookings.push({ seatNumber: seats[i], mobile: mobile });
  }

  return res.status(200).json({
    message: "Booking successful!",
    mobile: mobile,
    bookedSeats: seats
  });
});

app.delete("/cancel", function (req, res) {
  var mobile = req.body.mobile;
  var seat = req.body.seat;

  if (!mobile) {
    return res.status(400).json({ message: "Mobile number is required." });
  }
  if (!seat) {
    return res.status(400).json({ message: "Seat number is required." });
  }

  var index = -1;
  for (var i = 0; i < bookings.length; i++) {
    if (bookings[i].mobile === mobile && bookings[i].seatNumber === seat) {
      index = i;
      break;
    }
  }

  if (index === -1) {
    return res.status(404).json({ message: "No booking found for mobile " + mobile + " with seat " + seat + "." });
  }

  bookings.splice(index, 1);

  return res.status(200).json({
    message: "Booking cancelled successfully.",
    mobile: mobile,
    cancelledSeat: seat
  });
});

app.get("/seats/:mobile", function (req, res) {
  var mobile = req.params.mobile;

  var mySeats = getSeatsByMobile(mobile);

  if (mySeats.length === 0) {
    return res.status(404).json({ message: "No bookings found for mobile number " + mobile + "." });
  }

  var seatNumbers = mySeats.map(function (b) {
    return b.seatNumber;
  });

  return res.status(200).json({
    mobile: mobile,
    seats: seatNumbers,
    totalSeats: seatNumbers.length
  });
});

app.get("/available", function (req, res) {
  var bookedSeatNumbers = bookings.map(function (b) {
    return b.seatNumber;
  });

  var availableSeats = [];
  for (var i = 1; i <= TOTAL_SEATS; i++) {
    if (bookedSeatNumbers.indexOf(i) === -1) {
      availableSeats.push(i);
    }
  }

  if (availableSeats.length === 0) {
    return res.status(200).json({ message: "Houseful! No seats available." });
  }

  return res.status(200).json({
    availableSeats: availableSeats,
    totalAvailable: availableSeats.length
  });
});

app.listen(3000, function () {
  console.log("Ticket Booking Server is running on port 3000");
});
