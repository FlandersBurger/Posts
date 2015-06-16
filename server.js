var express = require('express')
var bodyParser = require('body-parser')
var websocket = require('./websockets')

var app = express()
app.use(bodyParser.json())
app.use(require('./auth'))
app.use('/api/posts', require('./controllers/api/posts'))
app.use('/api/sessions', require('./controllers/api/sessions'))
app.use('/api/users', require('./controllers/api/users'))
app.use(require('./controllers/static'))


var server = app.listen(3000, function () {
  console.log('Server listening on', 3000)
});

/*
var server = app.listen(8080, function () {
  console.log('Server Listening at http://162.243.132.240 on', 8080);
})
*/
websocket.connect(server)
