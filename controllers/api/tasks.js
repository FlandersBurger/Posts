var Task = require('../../models/task')
var router = require('express').Router()
var pubsub = require('../../pubsub')
var websockets = require('../../websockets')

router.get('/', function (req, res, next) {
  Task.find()
  .sort('+name')
  .exec(function(err, tasks) {
    if (err) { return next(err) }
    res.json(tasks)
  })
})

router.get('/categories', function (req, res, next) {
  Task.distinct('category')
  .exec(function(err, categories) {
    if (err) { return next(err) }
    res.json(categories)
  })
})


router.post('/', function (req, res, next) {
  var task = new Task({name: req.body.name, category: req.body.category})
  task.creator = req.auth.userid
  task.save(function (err, task) {
    if (err) { return next(err) }
    /*
    pubsub.publish('new_task', task)
    pubsub.subscribe('new_task', function(task) {
      websockets.broadcast('new_task', task)
    })
    */
    res.status(201).json(task)
  })
})

router.post('/:name', function (req, res, next) {
  Task.findOne({name: req.params.name})
  .exec(function (err, task) {
    if (err) { return next(err) }
    res.json(task)
  })
})

module.exports = router
