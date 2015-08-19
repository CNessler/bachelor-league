var db = require('../models');
var bcrypt = require('bcryptjs');

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

  newLeagueAndMember: function (newObj) {
    return db.Member.findOne({email: newObj.email}).then(function (foundUser) {
      if(!foundUser){
        newObj.password = bcrypt.hashSync(newObj.password, 8)
        return db.Member.create({
          firstName: newObj.first,
          lastName: newObj.last,
          email: newObj.email[0],
          league: newObj.title,
          password: newObj.password
        })
      }
    }).then(function (newMember) {
      var newLeague = db.League.create({
        title: newObj.title,
        owner: newObj.first,
        emails: newObj.email,
        season: 19
      })
      var result = {
        league: newLeague,
        member: newMember
      }
      return result
    })
  },

  signUp: function (user) {
    return db.Member.findOne({email: user.email}).then(function (foundUser) {
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
    return this.findMember(userId)

      .then(function f1(foundUser) {
        return db.League.findOne({title: foundUser.league})
          .then(function f5(league) {
            return {
              member: foundUser,
              league: league
            }
          })
      })

      .then(function f2(leagueAndMember) {
        return db.Member.find({email:{$in: leagueAndMember.league.emails}})
          .then(function f3(members) {
            var results = {
                allMembers: members,
                oneLeague: leagueAndMember.league,
                member: foundUser
              }
            return results
          })
      })
  },

  newSeasonMade: function (formBody) {
    var allContestants = formBody.contestantName.map(function (contestant, i) {
      return db.Contestants.create({
      image: formBody.contestantPic[i],
      name: formBody.contestantName[i],
      stillIn: true,
      Bachelor: false
      })
    });
    //why does not returning this work
    Promise.all(allContestants)
    .then(function (contestantsAdded) {
      return db.Season.create({
      contestants: contestantsAdded,
      year: formBody.year,
      season: formBody.season,
      episode: formBody.episode
      })
    })
    .then(function (season) {
      return season
    })
  },

  findContestants: function (userId) {
    return db.Member.findOne({_id: userId})
    .then(function (foundUser) {
      return db.League.findOne({title: foundUser.league})
    })
    .then(function (league) {
      return db.Season.findOne({season: league.season})
    })
  }

}
