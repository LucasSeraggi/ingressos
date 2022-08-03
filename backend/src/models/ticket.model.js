const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    name: { type: String, maxlength: 50, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, maxlength: 20, required: true },
    imgPath: { type: String, maxlength: 20 },
}, {
    timestamps: true,
    collection: 'tickets',
});

ticketSchema.statics.findByCredentials = async (name) => {
    const ticket = await Ticket.findOne({ name });
    console.log(ticket);

    if (!ticket) {
        throw new Error({ error: 'Ticket Inválido!' });
    }

    return ticket;
};

ticketSchema.statics.findById = async (id) => {
    const ticket = await Ticket.findById({ id });
    console.log(ticket);

    if (!ticket) {
        throw new Error({ error: 'Ticket Inválido!' });
    }

    return ticket;
};

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;