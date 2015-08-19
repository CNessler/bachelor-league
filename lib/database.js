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

  // TO: reimplement this without the global variable
  // TO: you cannot declare any variables outside the `then` functions
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

  // TODO: maybe (consider) refactoring this to remove duplication
  signUp: function (user) {
    return db.Member.findOne({email: user.email})
    .then(function (foundUser) {
      if(!foundUser){
        console.log('User NOT found');
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
    this.findMember(userId)
    .then(function (foundUser) {
      return db.League.findOne({title: foundUser.league})
    })
    .then(function (league) {
      return db.Member.find({email:{$in: league.emails}})
      .then(function (members) {
        var results = {
          allMembers: members,
          oneLeague: league
          }
        return results
      })
    })
  },

  newSeason: function (formBody) {
      var allContestants = formBody.contestantName.map(function (contestant, i) {
          return db.Contestants.create({
          image: formBody.contestantPic[i],
          name: formBody.contestantName[i],
          stillIn: true,
          Bachelor: false
        })
      });
      Promise.all(allContestants)
      .then(function (contestantsAdded) {
        // console.log(contestantsAdded, "new array");
        return db.Season.create({
          contestants: contestantsAdded,
          year: formBody.year,
          season: formBody.season,
          episode: formBody.episode
        })
      })
  },
        // season.contestants += contestantsAdded
        // season.save()

        // season.contestants.push(contestantsAdded)
        // return db.Season.update({_id: season._id}, {year: 99})
        // console.log(season, "SEASON ADDED");

  findContestants: function (userId) {
    return db.Member.findOne({_id: userId})
    .then(function (foundUser) {
      console.log(foundUser, "THIS WORKS");
      return db.League.findOne({title: foundUser.league})
    })
    .then(function (league) {
      console.log(league, "league Season");
      return db.Season.findOne({season: league.season})
    })
  }

}
