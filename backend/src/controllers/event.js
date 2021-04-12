const EventModel = require('../models/event');
const UserModel = require('../models/user');

module.exports = {
    async getEvents (req, res) {
        const pageLimit = req.headers.limit == null ? 9 : Number(req.headers.limit);
        const pageNumber = Number( req.headers.page ) > 0 ? ( Number(req.headers.page) - 1 ) * pageLimit : 0;

        try {   
            const total = await EventModel.find({}).length;
            const events = await EventModel.find({})
            .skip( pageNumber )
            .limit( Number(pageLimit) );

            return res.send({ events, pages: Math.ceil((total / pageLimit)) });
        }
        catch (err) {
            return res.status(500).send({ message: 'Internal Error' });
        }
    },

    async getEvent (req, res) {
        const { eventId } = req.body;

        try {   
            const event = await EventModel.findOne({ _id: eventId });

            return res.send(event);
        }
        catch (err) {
            return res.status(500).send({ message: 'Internal Error' });
        }
    },

    async createEvent (req, res) {
        const { latitude, longitude, description, name, value, date, images } = req.body;

        if(latitude == null || longitude == null || description == null || name == null || value == null || date == null)
            return res.status(400).send({ message: 'missing arguments' });

        try {
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            const event = await EventModel.create({
                location,
                description, 
                name, 
                value, 
                date, 
                images
            });

            return res.send(event);
        }
        catch (err) {
           // console.log(err)
            return res.status(500).send({ message: 'Internal Error' });
        }
    },

    async deleteEvent (req, res) {
        const { eventId } = req.body;

        if(eventId == null)
            return res.status(400).send({ message: 'event not found' });

        try {
            const user = await UserModel.findOne({
                tickets: {
                    $elemMatch: {
                        $eq: eventId
                    }
                }
            });

            if(user) 
                return res.status(400).send({ message: 'There is at least that still have a ticket' })

            const ok = await EventModel.deleteOne({ _id: eventId });

            if(ok.n) 
                return res.send({ message: 'Evente deleted' });

            return res.status(400).send({ message: 'Failed to delete event' })
        }
        catch (err) {
            return res.status(500).send({ message: 'Internal Error' });
        }
    }
}