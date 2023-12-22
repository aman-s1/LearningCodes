// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const Booking = require('./models/booking');
const bookingController = require('./controllers/bookingController');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs'); // Set EJS as the view engine

// Sync Sequelize models with the database
sequelize.sync();

// Routes
app.get('/', bookingController.getAllBookings);
app.post('/add-booking', bookingController.addBooking);
app.get('/edit-booking/:id', bookingController.getEditBooking);
app.post('/update-booking/:id', bookingController.updateBooking);
app.get('/delete-booking/:id', bookingController.deleteBooking);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
