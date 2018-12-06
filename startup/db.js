const mongoose = require('mongoose');
const keys = require('../config/keys');
module.exports = function () {
    mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
        .then(() => console.log('MongoDB connected...'))
        .catch(err => console.error('Could not connect to database', err));
}