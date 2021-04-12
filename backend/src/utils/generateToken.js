const jwt = require('jsonwebtoken');
const secret = require('../config/config.json').secret;

async function generateToken(params = {}) {
    return await jwt.sign(params, secret, {
        expiresIn: 86400, // a day
    });
}

module.exports = generateToken;