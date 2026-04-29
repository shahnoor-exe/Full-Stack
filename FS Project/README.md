# ParkEase

ParkEase is a beginner-level urban parking platform for Indian cities.

## How to Run ParkEase

### Quick Start (Single Command)
If you have `npm` installed, you can launch both frontend and backend from the root folder:
```bash
npm start
```
*Alternatively, on Windows, you can simply double-click the `start.bat` file.*

### Manual Start
If you prefer to start them separately:

#### 1. Start the Backend
```bash
cd server
node server.js
```

#### 2. Start the Frontend
```bash
cd client
npm start
```

The app will open on [http://localhost:3000](http://localhost:3000).

## Features
- **Find Parking**: Search by city, vehicle type, and area.
- **Book Now**: Reserve a spot with vehicle number and duration.
- **List Your Space**: Register your own parking area for others.
- **My Bookings**: View active bookings and cancel them if needed.
- **My Listings**: Manage the spaces you have listed.

## Tech Stack
- **Frontend**: React (Hooks, React Router)
- **Backend**: Node.js, Express.js
- **Database**: JSON file-based storage
- **Styling**: Plain CSS
