const Router = require('express').Router();
const TicketController = require('../controllers/ticket')
const authMiddleware = require('../middleware/auth');

Router.use(authMiddleware);

Router.post('/create', TicketController.create);
Router.delete('/delete', TicketController.delete);
Router.get('/getTicket', TicketController.get);

module.exports = Router;