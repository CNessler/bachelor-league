var db = require('monk')('localhost/bachelor');
var seasonCollection = db.get('seasons')
// var Season = require('../lib/javascripts/season.js')


var Season = function(year, episode, season) {
  this.contestants = [],
  this.year = year,
  this.episode = episode,
  this.season = season
}

// var season19 = new Season(2015, 12, 19)
// seasonCollection.insert(season33)

// console.log(season19);

module.exports = Season;
