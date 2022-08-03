const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const mongooseConnection = require('./config/mongooseConnection.config');

const app = express();

//ROTAS
const index = require('./routes/index');
const userRoutes = require('./routes/user.routes');
const ticketRoutes = require('./routes/ticket.routes');
const reservationRoutes = require('./routes/reservation.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());
app.use(morgan('dev'));

app.set('mongoose connection', mongooseConnection);

app.use(index);
app.use('/api/v1', userRoutes);
app.use('/api/ticket', ticketRoutes);
app.use('/api/ticket/reservation', reservationRoutes);

module.exports = app;