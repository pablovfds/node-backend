require('dotenv/config');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', error => console.error(error));
db.once('open', error => console.log('Connected to mongodb'));

module.exports = mongoose;