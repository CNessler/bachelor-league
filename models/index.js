var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/bachelor-league");

module.exports = {
  League: require('./league.js'),
  Member: require('./members.js'),
  Season: require('./season.js'),
  Contestants: require('./contestants.js')
}
