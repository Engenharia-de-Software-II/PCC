const TicketModel = require('../models/ticket');
const EventModel = require('../models/event');
const UserModel = require('../models/user');

module.exports = {
    async get (req, res) {
        const { ticketId } = req.body;

        try {   
            const ticket = await TicketModel.findOne({ _id: ticketId });

            return res.send(ticket);
        }
        catch (err) {
            return res.status(500).send({ message: 'Internal Error' });
        }
    },

    async create (req, res) {
        const { eventId } = req.body;

        if(eventId == null)
            return res.status(400).send({ message: 'Event not found' });

        try {
            const user = await UserModel.findOne({ _id: req.userId });

            if(!user)
                return res.status(400).send({ message: 'User not found' });
            
            const event = await EventModel.findOne({ _id: eventId });
            
            if(!event)
                return res.status(400).send({ message: 'Event not found' });

            const ticket = await TicketModel.create({ 
                event: eventId
            });

            return res.send({ ticket })
        }
        catch (err) {
            return res.status(500).send({ message: 'Internal Error' });
        }
    },

    async delete (req, res) {
        const { ticketId } = req.body;

        if(ticketId == null)
            return res.status(400).send({ message: 'missing arguments' });

            try {
                const ticket = await TicketModel.findOne({ _id: ticketId });
                
                if(!ticket)
                    return res.status(400).send({ message: 'Ticket not found' });

                const user = UserModel.findOne({ _id: req.userId });

                if(!user)
                    return res.status(400).send({ message: 'User not found' });

                await user.updateOne({ 
                    $pull: {
                        tickets: ticketId
                    },
                });

                const ok = await TicketModel.deleteOne({ _id: ticketId });

                if(ok.n)
                    return res.send({ message: 'Ticket deleted' });
                
                return res.status(400).send({ message: 'Failed to delete ticket' });
            }
            catch (err) {
                console.log(err)
                return res.status(500).send({ message: 'Internal Error' });
            }
    }
}