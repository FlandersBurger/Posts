var mongoose = require('mongoose');

mongoose.connect('mongodb://Admin:PunchM0nkeyProductions@ds055680.mongolab.com:55680/posts', function(err) {
//mongoose.connect('mongodb://localhost/social', function() {
  if (err) { console.log(err.message) }
  console.log('mongodb connected')
})

module.exports = mongoose;
