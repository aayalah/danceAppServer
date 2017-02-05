'use strict';
//var bcrypt = require('bcrypt-promise');//require('bcrypt-nodejs');
var scrypt = require("scrypt");


module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    username: {type: DataTypes.STRING, unique: true, allowNull:false},
    password: {type: DataTypes.STRING, allowNull:false},
    email: {type: DataTypes.STRING},
    device: {type: DataTypes.STRING}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.video, {as: 'videos'});
        User.hasMany(models.comments, {as: 'comment'});
      }
    },
    instanceMethods: {
      verifyPassword: function(password, cb) {
        console.log(password);
        console.log(this.password);

        scrypt.verifyKdf(new Buffer(this.password, "base64"),new Buffer(password)).then(function(res) {
          cb(null, res);
        }).catch(function(err) {
          cb(err,false);
        });

      }
    }
  });

  User.beforeCreate(function(user) {
    //var user = this;
    var scryptParameters = scrypt.paramsSync(0.1);
    return scrypt.kdf(user.password, scryptParameters).then(function(hash) {
      user.password = hash.toString('base64');
    });

  })

  return User;
};
