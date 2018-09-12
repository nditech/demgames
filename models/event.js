const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    _id: {type: String, required: true},
    name: {type: String, required: false, trim: true},
    city: {type: String, required: true, trim: true},
    region: {type: String, required: true, trim: true},
    country: {type: String, required: true, trim: true},
    date: {type: Date, required: true}
}, {_id: false});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;