var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var seasonCollection = db.get('seasons')
var Season = require('../lib/javascripts/season.js')
// var db = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {

  // console.log(db.Season);
  res.render('index', { title: 'Express' });
});

router.get('/season', function (req, res, next) {
  res.render('season')
})

module.exports = router;
