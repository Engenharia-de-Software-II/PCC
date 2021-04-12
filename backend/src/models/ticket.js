const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
    ceated_ad: {
        type: Date,
        default: Date.now()
    },
    event: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);