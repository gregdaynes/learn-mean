
var express = require('express')
  , app     = module.exports = express()
  ;

app.get('/posts', function(req, res) {
    res.sennd('list of posts');
});