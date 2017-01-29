'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    name: {type: DataTypes.STRING, allowNull:false},
    password: {type: DataTypes.STRING, allowNull:false},
    email: {type: DataTypes.STRING, allowNull:false},
    device: {type: DataTypes.STRING}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.video, {as: 'videos'});
        User.hasMany(models.comments, {as: 'comments'});
      }
    }
  });
  return User;
};
