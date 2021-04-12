const mongoose = require('mongoose');
const PointSchema = require('./utils/pointSchema');

const EventSchema = mongoose.Schema({
    location: {
        type: PointSchema,
        index: '2dsphere',
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: Date,
        required: true
    },
    ceated_ad: {
        type: Date,
        default: Date.now()
    },
    images: {
        type: [String],
        required: false,
        default: []
    }
});

module.exports = mongoose.model('Event', EventSchema);