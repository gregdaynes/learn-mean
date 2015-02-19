
var express = require('express')
  , app     = module.exports = express()
  ;

app.get('/users', function(req, res) {
    res.send('list of users');
});