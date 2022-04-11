const mongoose = require('mongoose');
const mongostr = process.env.MONGODB_URI;

mongoose.connect(mongostr);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

module.exports = {
    url: mongostr,
    database: db
};