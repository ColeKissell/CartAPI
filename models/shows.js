const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShowsSchema = new Schema ({
    name: String,
    description: String,
    price: Number,
    genre: String
})

module.exports = mongoose.model('Shows', ShowsSchema);