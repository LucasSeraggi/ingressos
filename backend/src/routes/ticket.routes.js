const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');

/*//Procurar por nome
router.get('/findbyname', ticketController.);

//Procurar por ID
router.get('/findbyid', ticketController.);*/

//Pegar todos
router.get('/findall', ticketController.getAllTickets);

//Salvar novo ticket
router.post('/new', ticketController.newTicket);

//Reservar
router.put('/book', ticketController.bookTicket);

module.exports = router;