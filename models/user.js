'use strict';
var bcrypt = require('bcrypt-promise');//require('bcrypt-nodejs');

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

        bcrypt.compare(password, this.password).then(function(res) {
          cb(null, res);
        });

      }
    }
  });

  User.beforeCreate(function(user) {
    //var user = this;

    return bcrypt.hash(user.password, 5).then(function(hash) {
      user.password = hash;
    });

  })

  return User;
};
