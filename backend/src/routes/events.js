const Router = require('express').Router();
const EventController = require('../controllers/event')
const authMiddleware = require('../middleware/auth');

Router.get('/getEvent', EventController.getEvent);
Router.get('/getEvents', EventController.getEvents);

Router.use(authMiddleware);

Router.post('/create', EventController.createEvent);
Router.delete('/delete', EventController.deleteEvent);

module.exports = Router;