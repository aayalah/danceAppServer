'use strict';
module.exports = function(sequelize, DataTypes) {
  var Video = sequelize.define('Video', {
    uri: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    views: DataTypes.Integer.ZEROFILL
  }, {
    classMethods: {
      associate: function(models) {
        Video.belongsTo(models.User);
        Video.hasMany(models.Category);
      }
    }
  });
  return Video;
};
