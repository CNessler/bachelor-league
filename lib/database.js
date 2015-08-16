var db = require('../models');
var bcrypt = require('bcryptjs');
var globalVar = [];

module.exports = {

  newLeague: function (leagueObject) {
    return db.League.create({
    title: leagueObject.title,
    owner: leagueObject.first,
    emails: leagueObject.email,
    season: 19
    })
  },

  newMember: function (memberObj, password) {
    return db.Member.create({
      firstName: memberObj.first,
      lastName: memberObj.last,
      email: memberObj.email,
      league: memberObj.league,
      password: password
    })
  },

  newLeagueAndMember: function (newObj, password) {
    return db.Member.findOne({email: newObj.email})
    .then(function (foundUser) {
      if(!foundUser){
        newObj.password = bcrypt.hashSync(newObj.password, 8)
        return db.Member.create({
          firstName: newObj.first,
          lastName: newObj.last,
          email: newObj.email[0],
          league: newObj.title,
          password: password
        })
      }
    }).then(function (newMember) {
      globalVar.push(newMember)
      return db.League.create({
      title: newObj.title,
      owner: newObj.first,
      emails: newObj.email,
      season: 19
      })
    }).then(function (league) {
      return [league, globalVar[0]]
    })
  },

  signUp: function (user) {
    return db.Member.findOne({email: user.email})
    .then(function (foundUser) {
      if(!foundUser){
        user.password = bcrypt.hashSync(user.password, 8)
        return db.Member.create({
          firstName: user.first,
          lastName: user.last,
          email: user.email,
          league: user.league,
          password: user.password
        })
      }
    })
  },

  login: function (user) {
    return db.Member.findOne({email: user.email})
  },

  findMember: function (userId) {
    return db.Member.findOne({_id: userId})
  },

  findLeague: function (userId) {
    return db.Member.findOne({_id: userId})
    .then(function (foundUser) {
      // console.log(foundUser, "USER INFO");
      return db.League.findOne({title: foundUser.league})
    })
    .then(function (league) {
      globalVar.push(league);
      // console.log(league, 'LEAGUE FOUND');
      return db.Member.find({email:{$in: league.emails}})
    })
    .then(function (members) {
      console.log(globalVar, "GLOBAL VARIABLS");
      return[globalVar[0], members]
    })
  }
}
