var express = require('express');
var router = express.Router();
var database = require('../lib/database.js')
var validate = require('../public/javascripts/validate.js')
var bcrypt = require('bcryptjs')
var cookieSession = require('cookie-session');


router.get('/league/new', function (req, res, next) {
  res.render('league/new')
})

router.post('/league/new', function (req, res, next) {
  var user = req.body;
  database.newLeagueAndMember(user).then(function (leagueAndMember) {
    if(leagueAndMember){
    req.session.userID = leagueAndMember.member._id
    req.session.firstName = leagueAndMember.member.firstName
    res.redirect('/league/home')
    }
    else {
      res.render('league/new', {error: 'Paddwords  do not match'})
    }
  })
})

router.get('/league/home', function (req, res, next) {
  var userCookie = req.session.userID;
  database.findLeague(userCookie).then(function (leagueAndMemberObject) {
    console.log(leagueAndMemberObject, "Home Page");
    if(leagueAndMemberObject.length === 0){
      res.render('league/new')
    }
    else {
      res.render('league/home', {league: leagueAndMemberObject.oneLeague, members: leagueAndMemberObject.allMembers})
    }
  })
})

router.get('/league/member', function (req, res, next) {
  res.render('league/member')
})

router.get('/league/profile', function (req, res, next) {
  var userCookie = req.session.userID
  console.log(userCookie, 'COOKIE');
  database.findMember(userCookie).then(function (member) {
    console.log(member, "MEMBER FOUND");
    res.render('league/profile', {member: member})
  })
})

router.post('/league/member', function (req, res, next) {
  var user = req.body;
  database.signUp(user).then(function (newUser) {
    console.log(newUser, "NEW USER CREATED");
      req.session.userID = newUser._id
      req.session.firstName = newUser.first
      res.redirect('/league/profile')
  })
})

router.post('/league', function (req, res, next) {
  var user = req.body;
  // console.log(req.body);
  database.login(user)
  .then(function (foundUser) {
    if(foundUser){
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
  var userCookie = req.session.userId;
  console.log('GETS HERE');
  console.log(database.findContestants);
  database.findContestants(userCookie).then(function (seasonFind) {
    console.log(seasonFind, "SEASON FOUND");
    res.render('league/create', {season: seasonFind})
  })
})

router.post('/season', function (req, res, next) {
  var formBody = req.body;
  console.log(formBody, "FORM BODY");
  console.log(database.newSeason, "fucntion should show");
  database.newSeason(formBody).then(function (season) {
    console.log(season, "CREATED!!!!!!!!!!");
    res.redirect('/')
  })
})

module.exports = router;
