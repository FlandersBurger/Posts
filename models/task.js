var db = require('../db')

var Task = db.model('Task', {
  name: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  creator: { type: String, ref: 'User', required: true },
  voters: [{ type: String, ref: 'User', required: false }]
})

module.exports = Task
