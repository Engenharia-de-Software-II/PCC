const Router = require('express').Router();
const UserController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

Router.get('/getUsers', UserController.getUsers);
Router.post('/create', UserController.createUser);
Router.get('/auth', UserController.auth);

Router.use(authMiddleware);

Router.get('/getUser', UserController.getUser);
Router.delete('/delete', UserController.deleteUser);
Router.put('/update', UserController.updateUser);
Router.put('/buyTicket', UserController.buyTicket);

module.exports = Router;