
var User    = require('users/model')
  , ACL     = require('access-control-list')
  , express = require('express')
  , config  = require('config')
  , app     = module.exports = express()
  ;


app.route('/users')

    .all(function(req, res, next) {
        
        
        console.log(ACL);
        ACL.allow('guest', 'post', 'view');
        ACL.allow('user',  'post', ['view', 'create']);
        ACL.allow('admin', 'post', '*');
        
        console.log(req.decoded);
        
        if (req.decoded) {
            var userId = req.decoded.userId;
            var username = req.decoded.username;
            var roles = req.decoded.roles;
        } else {
            userId = 0;
        }
/*
        
        ACL.isAllowed(userId, 'users', 'view', function(err, allowed) {
            console.log(err, allowed);
        })
*/
        
        next();
    })
    
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
        user.email = req.body.email;
        user.password = req.body.password;
        
        // save user and check for errors
        user.save(function(err, user) {
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
            
            // 
/*
            console.log(user);
            var userId = user._id;
            ACL.addUserRoles(JSON.stringify(userId), ['user'], function(err) {
                console.log(err);
            });
*/
            
            res.json({
                message: 'user created'
            });
        });
        
    });

app.route('/users/:user/:role')
    
    .get(function(req, res) {       
//         acl.addUserRoles(req.params.user, req.params.role);
        console.log(req.params);
    });
