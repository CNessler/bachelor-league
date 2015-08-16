var mongoose = require('mongoose')

var leagueSchema = ({
  title: String,
  owner: String,
  emails: Array,
  season: Number
})

var League = mongoose.model('League', leagueSchema);

module.exports = League;
