'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comments = sequelize.define('comments', {
    text: {type: DataTypes.STRING}
  }, {
    classMethods: {
      associate: function(models) {
        Comments.belongsTo(models.user);
        Comments.belongsTo(models.video);
        // associations can be defined here
      }
    }
  });
  return Comments;
};
