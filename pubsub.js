var redis = require('redis')
var url = process.env.REDISTOGO_URL || 'redis://localhost:6379'
var host = require('url').parse(url)
var config = require('./config')

function newClient() {
  var client = redis.createClient(host.port, host.hostname)
  client.auth(config.redisPass);
  return client
}

var client = newClient()

exports.publish = function (topic, data) {
  client.publish(topic, JSON.stringify(data))
}

exports.subscribe = function(topic, cb) {
  var client = newClient()
  client.auth(config.redisPass);
  client.subscribe(topic)
  client.on('message', function (channel, message) {
    cb(JSON.parse(message))
  })
}
