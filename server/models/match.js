let mongoose = require('mongoose');


let matchModel = mongoose.Schema({
    match: String,
    teams: String,
    game: String,
    time: String,
    price: Number,

}, {
    collection: "matches"
});

module.exports = mongoose.model('Match', matchModel);