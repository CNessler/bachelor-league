var mongoose = require('mongoose')


var contestantsSchema = new mongoose.Schema ({
  image: String,
  name: String,
  stillIn: Boolean,
  Bachelor: Boolean
})

var Contestant = mongoose.model('Contestant', contestantsSchema)

module.exports = Contestant;
