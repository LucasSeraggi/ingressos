const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    quant: { type: Number, required: true },
    idUser: { type: String, required: true },
    idTicket: { type: String, required: true }
}, {
    timestamps: true,
    collection: 'reservations',
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;