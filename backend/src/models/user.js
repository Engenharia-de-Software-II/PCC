const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    tickets: {
        type: [String],
        default: []
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    amdin: {
        type: Boolean,
        require: false,
        default: false
    },
    blocked: {
        type: Boolean,
        require: false,
        default: false
    }
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

/*UserSchema.pre('update', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});*/

module.exports = mongoose.model('User', UserSchema);