var mongoose = require('mongoose');

var seasonSchema = new mongoose.Schema({
  contestants: Array,
  year: Number,
  season: Number,
  episode: Number
})

var Season = mongoose.model('Season', seasonSchema);

module.exports = Season;
