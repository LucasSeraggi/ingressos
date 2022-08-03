const User = require('../models/user.model');
const Ticket = require('../models/ticket.model');
const Reservation = require('../models/reservation.model')

exports.getAllReservations = async (req, res) =>  {
    try {
        const tickets = await Reservation.find({});
        // console.log(tickets);

        if(tickets.length < 1) {
            return res
                .status(409)
                .json({ message: "Sem reservas cadastradas!" });
        }
        res.status(201).json({ message: 'Reservas encontrados!', tickets });
    } catch (err) {
        console.log(err)
        res.status(400).json({ err: err });
    }
};

exports.getMyReservations = async (req, res) =>  {
    try {
        console.log(req.body)
        const reservations = await Reservation.find({ idUser: req.body.id });
        console.log(reservations);

        if(reservations.length < 1) {
            return res
                .status(409)
                .json({ message: "Sem reservas cadastradas!" });
        }

        let TicketList = []

        for (let i = 0; i < reservations.length; i++) {
            TicketList.push(reservations[i].idTicket)
        }

        console.log(TicketList)

        const tickets = await Ticket.find({_id: {$in: TicketList}})

        console.log('result', tickets)

        res.status(201).json({ message: 'Reservas encontradas!', reservations, tickets });
    } catch (err) {
        console.log(err)
        res.status(400).json({ err: err });
    }
};

exports.newReservation = async (req, res) => {
    try {
        console.log(req.body)

        const isReservation = await Reservation.find({ idUser: req.body.user._id, idTicket: req.body.ticket._id });

        if (isReservation.length >= 1) {
            const update = {
                quant: req.body.quant + isReservation[0].quant
            }

            const reserve = await Reservation.findOneAndUpdate({ _id: isReservation[0]._id }, update, {
                new: true
            });

            return res.status(201).json({ message: 'Reserva salva!', reserve });
        }

        const newReservation = new Reservation({
            quant: req.body.quant,
            idUser: req.body.user._id,
            idTicket: req.body.ticket._id,
        })

        const reservation = await newReservation.save();

        res.status(201).json({ message: 'Reserva criada com sucesso!', reservation });
    } catch (err) {
        console.log(err, req.body)
        res.status(400).json({ err: err });
    }
};