var redis = require('redis')
var url = process.env.REDISTOGO_URL || 'redis://localhost:6379'
var host = require('url').parse(url)

function newClient() {
  var client = redis.createClient(host.port, host.hostname)
  if (host.auth) {
    client.auth("PunchM0nkeyPr0ducti0n$RedisP@ssw0rd");
  }
  return client
}

var client = newClient()

exports.publish = function (topic, data) {
  client.publish(topic, JSON.stringify(data))
}

exports.subscribe = function(topic, cb) {
  var client = newClient()
  if (host.auth) {
    client.auth("PunchM0nkeyPr0ducti0n$RedisP@ssw0rd");
  }
  client.subscribe(topic)
  client.on('message', function (channel, message) {
    cb(JSON.parse(message))
  })
}
