var express = require('express')
var router = express.Router()
var path = require('path')

router.use(express.static(__dirname + '/../assets'))
router.use(express.static(__dirname + '/../resources'))
router.use(express.static(__dirname + '/../images'))
router.use(express.static(__dirname + '/../templates'))

router.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../layouts/app.html'))
})

module.exports = router
