const UserModel = require('../models/user');
const TicketModel = require('../models/ticket');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

module.exports = {
    async getUser (req, res) {
        try {   
            const user = await UserModel.findOne({ _id: req.userId });

            return res.send({ user });
        }
        catch (err) {
            return res.status(500).send({ message: 'Internal Error' });
        }
    },

    async getUsers (req, res) {
        const pageLimit = req.headers.limit == null ? 9 : Number(req.headers.limit);
        const pageNumber = Number( req.headers.page ) > 0 ? ( Number(req.headers.page) - 1 ) * pageLimit : 0;

        try {   
            const total = await UserModel.find({}).length;
            const users = await UserModel.find({})
            .skip( pageNumber )
            .limit( Number(pageLimit) );

            return res.send({ users: users, pages: Math.ceil((total / pageLimit)) });
        }
        catch (err) {
            return res.status(500).send({ message: 'Internal Error' });
        }
    },

    async createUser (req, res) {
        const { email, password, name, admin = false } = req.body;

        if(email == null || password == null || name == null)
            return res.status(400).send({ message: 'Missing arguments' });

        try {
            if(await UserModel.findOne({ email: email }))
                return res.status(400).send({ message: 'User already eists' });

            const user = await UserModel.create({
                email, password, name, admin
            });

            user.password = undefined;

            return res.send({ user, token: await generateToken({ id: user._id, admin: admin }) });
        }
        catch (err) {
            return res.status(500).send({ message: 'Internal Error' });
        }
    },

    async auth (req, res) {
        const { email, password, name } = req.body;

        if(email == null || password == null)
            return res.status(400).send({ message: 'Missing arguments' });

        try {
            const user = await UserModel.findOne({ email: email }).select('+password');

            if(!user)
                return res.status(400).send({ message: 'Invalid email or password' });
                
            if(!await bcrypt.compare(password, user.password))
                return res.status(400).send({ message: 'Invalid email or password' });

            return res.send({ user, token: await generateToken({ id: user._id, admin: user.amdin }) });

        }
        catch (err) {
            return res.status(500).send({ message: 'Internal Error' });
        }
    },

    async deleteUser (req, res) {
        try {
            const ok = await UserModel.deleteOne({ _id: req.userId });

            if(ok.n)
                return res.send({ message: 'User deleted' });

            return res.status(400).send({ message: 'Failed to delete user' });
        }
        catch (err) {
            return res.status(500).send({ message: 'Internal Error' });
        }
    },

    async updateUser (req, res) {
        const { name, email, password } = req.body;

        try {
            if(name) {
                await UserModel.updateOne({ _id: req.userId }, {
                    $set: {
                        name
                    }
                });
            }

            if(email) {
                await UserModel.updateOne({ _id: req.userId }, {
                    $set: {
                        email
                    }
                });
            }

            return res.send({ user: await UserModel.findOne({ _id: req.userId }) });
        }
        catch (err) {
            return res.status(500).send({ message: 'Internal Error' });
        }
    },

    async buyTicket (req, res) {
        const { ticketId } = req.body;

        try {
            const ticket = await TicketModel({ _id: ticketId });

            if(!ticket)
                return res.status(400).send({ message: 'ticket not found' });

            const user = await UserModel.findOneAndUpdate({ _id: req.userId }, {
                $push: {
                    tickets: ticketId
                }
            });

            return res.send({ user: user });
        }
        catch (err) {
            console.log(err)
            return res.status(500).send({ message: 'Internal Error' });
        }
    }
};