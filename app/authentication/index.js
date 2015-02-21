
var User    = require('users/model')
  , jwt     = require('jsonwebtoken')
  , config  = require('config')
  , express = require('express')
  , app     = module.exports = express()
  ;

app.post('/authenticate', function(req, res) {
    
    // find the user
    // select the name username and password explicitly
    User.findOne({ username: req.body.username })
        .select('name username password')
        .exec(function(err, user) {
            
            if (err) {
                throw err;
            }
            
            // no user with that username was found
            if (!user) {
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else {
                
                var validPassword = user.comparePassword(req.body.password);
                
                // check if password matches
                if (!validPassword) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                } else {
                    
                    // user found and password ok
                    var token = jwt.sign({
                        name: user.name,
                        username: user.username
                    }, config.secret, {
                        expiresInMinutes: 1440 // 24 hours
                    });
                    
                    // return the information including token json
                    res.json({
                        success: true,
                        message: 'Enjoy your token',
                        token: token
                    });
                }
            } 
        });
});

app.use(function(req, res, next) {
    
    console.log('Someone has visited the app');
    console.log(req.params);
    
    if (config.devmode) {
        next();
    } else {
        // check header, url, param for token
        var token = req.body.token || req.params.token || req.headers['x-access-token'];
        
        // decode token
        if (token) {
            
            // verify secret and check expiration
            jwt.verify(token, config.secret, function(err, decoded) {
                
                if (err) {
                    return res.status(403).send({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    // all good
                    req.decoded = decoded;
                    
                    next();
                }
            })
            
        } else {
            
            // no token - return http 403
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    }
    
    
});

