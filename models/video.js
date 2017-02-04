'use strict';
module.exports = function(sequelize, DataTypes) {
  var Video = sequelize.define('video', {
    uri: {type: DataTypes.STRING, allowNull: false},
    title: {type: DataTypes.STRING},
    description: {type:DataTypes.STRING},
    views: {type: DataTypes.INTEGER, allowNull: false, defaultValue:0}
  }, {
    classMethods: {
      associate: function(models) {
        Video.belongsToMany(models.category, {through: 'videocategory'});
        Video.hasMany(models.comments, {as: 'comment'});
        Video.belongsTo(models.user);
      }
    }
  });
  return Video;
};
