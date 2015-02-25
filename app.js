
// !IMPORTS ====================
// =============================

var express    = require('express')
  , bodyParser = require('body-parser')
  , morgan     = require('morgan')
  , config     = require('config')
  , path       = require('path')
  , app        = express()
  ;
  

// !MODULES ====================
// =============================
var auth   = require('authentication')
  , acl    = require('access-control-list')
  , users  = require('users')
  , login  = require('login')
  , cors   = require('cors')
  ;
  

// !SETUP ======================
// =============================


// !MIDDLEWARE =================
// =============================

// use bodyParser to grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json())
   
   // configure app to handle cors
   .use(cors)
         
   // authentcation
   .use(auth)
   
   // log all requests to the console
   .use(morgan('dev'))
   
   // static files
   .use(express.static(__dirname + '/public'))
   ;



// !DEV AREA ===================   
// =============================



// assign permissinos to roles
// guests view posts






// !ROUTES =====================
// =============================

// login
app.use(login)
   .use(users)
   // catchall
   .get('*', function(req, res) {
       res.sendFile(path.join(__dirname + '/public/index.html'))
   })
   ;





// !START ======================
// =============================

app.listen(config.port);
console.log('listening on port ' + config.port);
