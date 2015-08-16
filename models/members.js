var mongoose = require('mongoose');

var memberSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  league: String,
  password: String
})

var Member = mongoose.model('Member', memberSchema)

module.exports = Member;
