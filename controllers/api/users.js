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

module.exports = router
