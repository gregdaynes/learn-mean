
var mongoose = require('mongoose')
  , bcrypt   = require('bcrypt-nodejs')
  , acl      = require('access-control-list')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId
  ;
  
var UserSchema = Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
});

// hash password before save
UserSchema.pre('save', function(next) {
    
    var user = this;
    
    // hash the password if password has been changed or new user
    if (!user.isModified('password')) {
        return next();
    }
    
    // generate hash
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) {
            return next(err);
        }
        
        // change the password to the hashed version
        user.password = hash;
        next();
    }); 
});

// compare give password with hash
UserSchema.methods.comparePassword = function(password) {
    var user = this;
    
    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);
