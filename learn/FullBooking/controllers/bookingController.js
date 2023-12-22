// controllers/bookingController.js
const Booking = require('../models/booking');

exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.findAll();
  res.render('index', { bookings });
};

exports.addBooking = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const booking = await Booking.create({ name, email, phone });
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: 'Error adding booking' });
  }
};

exports.getEditBooking = async (req, res) => {
  const bookingId = req.params.id;
  const booking = await Booking.findByPk(bookingId);
  res.render('edit', { booking });
};

exports.updateBooking = async (req, res) => {
  const bookingId = req.params.id;
  const { name, email, phone } = req.body;

  try {
    await Booking.update({ name, email, phone }, { where: { id: bookingId } });
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: 'Error updating booking' });
  }
};

exports.deleteBooking = async (req, res) => {
  const bookingId = req.params.id;

  try {
    await Booking.destroy({ where: { id: bookingId } });
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: 'Error deleting booking' });
  }
};
