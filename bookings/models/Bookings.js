const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    timeSlot: { type: Date, required: true },
    quantity: { type: Number, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
