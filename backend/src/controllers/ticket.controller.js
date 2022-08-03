const User = require('../models/user.model');
const Ticket = require('../models/ticket.model');
const Reservation = require('../models/reservation.model')
const reservationController = require('../controllers/reservation.controller')

exports.getAllTickets = async (req, res) =>  {
    try {
        const tickets = await Ticket.find({ status: 'available' });
        // console.log(tickets);

        if(tickets.length < 1) {
            return res
                .status(409)
                .json({ message: "Sem tickets cadastrados!" });
        }
        res.status(201).json({ message: 'Tickets encontrados!', tickets });
    } catch (err) {
        console.log(err)
        res.status(400).json({ err: err });
    }
};

exports.bookTicket = async (req, res) => {
    try {
        console.log(req.body)
        const before = await Ticket.findOne({ name: req.body.ticket.name, status: 'available' });
        
        const filter = {
            name: req.body.ticket.name
        }

        if (before.quantity - req.body.quant === 0) {
            const update = { 
                quantity: before.quantity - req.body.quant,
                status: 'unavailable'
            };

            const ticket = await Ticket.findOneAndUpdate(filter, update, {
                new: true
            });

            res.status(201).json({ message: 'Ticket reservado!', ticket });
        } else {
            const update = { 
                quantity: before.quantity - req.body.quant
            };

            const ticket = await Ticket.findOneAndUpdate(filter, update, {
                new: true
            });

            res.status(201).json({ message: 'Ticket reservado!', ticket });
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ err: err });
    }
};

exports.newTicket = async (req, res) => {
    try {
        const isTicket = await Ticket.find({ name: req.body.name });
        console.log(isTicket);

        if (isTicket.length >= 1) {
            return res
                .status(409)
                .json({ message: "Ticket já cadastrado!" });
        }

        const newTicket = new Ticket(req.body);
        const ticket = await newTicket.save();
        res.status(201).json({ message: 'Ticket criado com sucesso!', ticket });
    } catch (err) {
        console.log(err, req.body)
        res.status(400).json({ err: err });
    }
};
