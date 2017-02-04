// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var models = require('../models/index');

passport.use(new BasicStrategy(
  function(username, password, callback) {
    models.user.findOne({where: { username: username }}).then(function(user) {
        if (!user) { return callback(null, false); }

        user.verifyPassword(password, function(err, isMatch) {
          if (err) { return callback(err); }

          // Password did not match
          if (!isMatch) { return callback(null, false); }

          // Success
          return callback(null, user);
        });


    }).catch(function(err) {
      if (err) { return callback(err); }
    });

  })
);


exports.isAuthenticated = passport.authenticate('basic', { session : false });
