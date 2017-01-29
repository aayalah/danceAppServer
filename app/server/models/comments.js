'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comments = sequelize.define('Comments', {
    text: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Comments.belongsTo(models.User);
        Comments.belongsTo(models.Video);
        // associations can be defined here
      }
    }
  });
  return Comments;
};
