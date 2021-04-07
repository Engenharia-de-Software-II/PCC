const jwt = require('jsonwebtoken');
const secret = require('../config/config.json').secret;

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({ message: 'No token provided' });

    const parts = authHeader.split(' ');

    if(!authHeader.length === 2)
        return res.status(401).semd({ message: 'Token error' });

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).semd({ message: 'Token malformatted' });

    jwt.verify(token, secret, (err, decoded) => {
        if(err)
            return res.status(401).send({ message: 'Token invalid' });

        req.userId = decoded.id;
        req.isAdmin = decoded.admin;
        return next()
    })
};