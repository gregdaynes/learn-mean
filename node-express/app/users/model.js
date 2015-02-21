
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId
  ;
  
var UserSchema = Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    }
});


module.exports = mongoose.model('User', UserSchema);
