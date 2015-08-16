var express = require('express');
var router = express.Router();
var database = require('../lib/database.js')
var db = require('../models')
var validate = require('../public/javascripts/validate.js')
var bcrypt = require('bcryptjs')
var cookieSession = require('cookie-session');


router.get('/league/new', function (req, res, next) {
  res.render('league/new')
})

router.post('/league/new', function (req, res, next) {
  var user = req.body;
  database.newLeagueAndMember(user)
  .then(function (leagueAndMember) {
    req.session.userID = leagueAndMember[1]._id
    console.log(req.session.userID);
    req.session.firstName = leagueAndMember[1].firstName
    res.redirect('/league/home')
  })
})

router.get('/league/home', function (req, res, next) {
  var userCookie = req.session.userID;
  database.findLeague(userCookie).then(function (leagueAndMember) {
    console.log(leagueAndMember, "LEAGUE and MEMBER for HOME");
  res.render('league/home', {league: leagueAndMember[0], members: leagueAndMember[1]})

  })
})

router.get('/league/member', function (req, res, next) {
  res.render('league/member')
})

router.get('/league/profile', function (req, res, next) {
  var userCookie = req.session.userId
  database.findMember(userCookie).then(function (member) {
    res.render('league/profile', {member: member})

  })
  // database.populateProfile(user).then(function (data) {
  //   console.log(data, 'IN ROUTE');
  // })
})

router.post('/league/member', function (req, res, next) {
  var user = req.body;
  database.signUp(user).then(function (newUser) {
    if(newUser){
      req.session.userID = newUser._id
      req.session.firstName = newUser.first
      res.redirect('/league/profile')
    } else {
      res.render('league/member', {errorOne: 'This email is already associated with a user'})
    }
  })
})

router.post('/league', function (req, res, next) {
  var user = req.body;
  // console.log(req.body);
  database.login(user)
  .then(function (foundUser) {
    if(foundUser){
      console.log(foundUser);
      if(bcrypt.compareSync(user.password, foundUser.password)) {
        req.session.userId = foundUser._id
        res.redirect('/league/profile')
      } else {
        res.render('league/member', {error: 'Incorrect password'})
      }
    } else {
      res.render('league/member', {error: 'User not found'})
    }
  })
})

router.get('/league/create', function (req, res, next) {
  res.render('league/create')
})

module.exports = router;
