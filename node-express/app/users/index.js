
var User   = require('users/model')
  , express = require('express')
  , app     = module.exports = express()
  ;
  
app.route('/users')


    // get all users
    .get(function(req, res) {
        
        // query mongo for users
        User.find(function(err, users) {
            if (err) {
                res.send(err);
            }
            
            // return users
            res.json(users);
        });
    })
    
    
    // create new user
    .post(function(req, res) {
        
        var user = new User();
        
        // set user info from the request
        user.name = req.body.name;
        user.username = req.body.username;
        
        // save user and check for errors
        user.save(function(err) {
            if (err) {
                
                // duplicate entry
                if (err.code == 11000) {
                    return res.json({
                        success: false,
                        message: 'A user with that name already exists.'
                    });
                } else {
                    return res.send(err);
                }
            }
            
            res.json({
                message: 'user created'
            });
        });
        
    })
