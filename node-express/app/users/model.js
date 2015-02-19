
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId
  ;
  
var UsersSchema = Schema({
    name: { type: String },
});

Users = mongoose.model('Users', UsersSchema);

exports.usersModel = Users;
