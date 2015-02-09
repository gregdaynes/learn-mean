




// load express and create app
var express = require('express'),
    app     = express(),
    path    = require('path');

// send index.html to the user
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.route('/login')
    // show the form
    .get(function(req, res) {
        res.send('This is the login form');
    })
    // process the form
    .post(function(req, res) {
        console.log('processing');
        res.send('processing te loging form!');
    });



// create routes for admin section
// get an instance of the router
var adminRouter = express.Router();

// route middleware
adminRouter.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing
    next();

});

// route middleware to validate :name
adminRouter.param('name', function(req, res, next, name) {

    // do validation on name here
    console.log('doing name validation on ' + name);

    // once validation is done, save the new item in the req
    req.name = name

    // go to next thing
    next();

});

// admin main page
adminRouter.get('/', function(req, res) {
    res.send('I am the dashboard!');
});

// users page
adminRouter.get('/users', function(req, res) {
    res.send('I show all the users!');
});

// route with parameters
adminRouter.get('/users/:name', function(req, res) {
    res.send('Hello ' + req.name + '!');
});

// posts page
adminRouter.get('/posts', function(req, res) {
    res.send('I show all the posts!');
});

// apply routes to our application
app.use('/admin', adminRouter);


// start server
app.listen(1337);
console.log('1337 is a magic port!');