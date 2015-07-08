var router = require('express').Router()
var User = require('../../models/user')
var bcrypt = require('bcryptjs')
var jwt = require('jwt-simple')
var config = require('../../config')

router.get('/', function (req, res, next) {
  if (!req.headers['x-auth']) {
    return res.send(401)
  }
  var auth = jwt.decode(req.headers['x-auth'], config.secret)
  User.findOne({_id: auth.userid}, function (err, user) {
    if (err) { return next(err) }
    res.json(user)
  })
})

router.post('/', function (req, res, next) {
  var user = new User({username: req.body.username})
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      user.password = hash
      user.save(function (err, user) {
        if (err) {
          throw next(err)
        }
        res.send(201)
      })
    })
  })
})

router.post('/password', function (req, res, next) {
  if (!req.headers['x-auth']) {
    return res.send(401)
  }
  var auth = jwt.decode(req.headers['x-auth'], config.secret)
  User.findOne({_id: auth.userid})
  .select('password')
  .select('username')
  .exec(function (err, user) {
    bcrypt.compare(req.body.oldPassword, user.password, function (err, valid) {
      if (err) { return next(err) }
      if (!valid) { return res.send(401) }
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.newPassword, salt, function (err, hash) {
          user.password = hash
          user.save(function (err, user) {
            if (err) {
              throw next(err)
            }
            console.log(user.username + ' changed their password')
            res.send(200)
          })
        })
      })
    })
  })
})

router.post('/username', function (req, res, next) {
  if (!req.headers['x-auth']) {
    return res.send(401)
  }
  var auth = jwt.decode(req.headers['x-auth'], config.secret)
  User.findOne({_id: auth.userid})
  .select('username')
  .exec(function (err, user) {
    User.findOne({username: req.body.newUsername}, function (err, user2) {
      if (err) { return next(err) }
      if (user2) {
        if (user2.id != auth.userid) {
          return res.send(400)
        }
      }
    })
    user.username = req.body.newUsername
    user.save(function (err, user) {
      if (err) {
        throw next(err)
      }
      console.log(user.username + ' changed their name to ' + req.body.newUsername)
      res.send(200)
    })
  })
})

module.exports = router
