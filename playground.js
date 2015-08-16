var db = require('./models')
db.League.create({
  title: String,
  owner: String,
  emails: Array,
  season: Number
})
console.log(db.League);

// var season19 = new Season({
//   season: 19,
//   episode: 12,
//   year: 2015,
//   contestants: []
// })
// console.log(one);
