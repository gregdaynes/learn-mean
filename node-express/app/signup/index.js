
var express = require('express')
  , app     = module.exports = express()
  ;


app.get('/signup', function(req, res) {
    res.send('form');
});
