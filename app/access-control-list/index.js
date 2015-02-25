var acl      = require('acl')
  , mongo    = require('mongodb')
  , config   = require('config')
  ;
  
var db = mongo.connect(config.database, function(err, db) {
    
});
var mongoBackend = new acl.mongodbBackend(db, 'acl_', true);
var ACL = new acl(mongoBackend);

module.exports = ACL;

/*
mongodb.connect(config.database, function(err, db) {
    
    if (err) { console.log(err); }
    
    var mongoBackend = new acl.mongodbBackend(db, 'acl_', true);
    var ACL = new acl(mongoBackend);
    
    ACL.allow('guest', 'post', 'view');
    ACL.allow('user',  'post', ['view', 'create']);
    ACL.allow('admin', 'post', '*');
    
    ACL.addUserRoles('54e8f1c94f04ca8da4b26ff1', 'administrator', function(err) { console.log(err) });
    
   module.exports = ACL;
});
*/

/*
db.connection.on('connected', function() {
    
    var mongoBackend = new acl.mongodbBackend(db, 'acl_', true);
    var ACL = new acl(mongoBackend);
    
    ACL.allow('guest', 'post', 'view');
    
    console.log(ACL);
    
    module.exports = acl;
});
*/


