module.exports = {
      'port':      process.env.PORT || 8080 // set the port for our app
    , 'database': 'localhost:27017/db_node-api'
    , 'secret':   'oursupersecretstringforsigning' // token secret
};