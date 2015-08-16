// var db = require('mongoose');
//
// function Season(season, episode, year) {
//   this.contestants: [],
//   this.season = season,
//   this.episode = episode,
//   this.year = year
// }
//
// var season19 = new Season(19, 12, 2015);

var db = require('../models')

var season19 = new Season({
  season: 19,
  episode: 12,
  year: 2015,
  contestants: []
})
