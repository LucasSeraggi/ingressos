const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');

//Pegar todos
router.post('/findmy', reservationController.getMyReservations);

//Salvar nova reserva
router.post('/new', reservationController.newReservation);

module.exports = router;