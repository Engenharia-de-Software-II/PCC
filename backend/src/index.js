require("dotenv").config({
    path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o banco de dados: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do banco de dados');
});

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao banco de dados');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', 'https://threeplataform.web.app');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
});

const usersRoutes = require('./routes/user');
const ticketsRoutes = require('./routes/ticket');
const eventsRoutes = require('./routes/events')

app.use('/user', usersRoutes);
app.use('/ticket', ticketsRoutes);
app.use('/event', eventsRoutes);

const listener = app.listen(process.env.PORT || 3333);

module.exports = listener;