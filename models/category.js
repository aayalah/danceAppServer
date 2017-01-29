'use strict';
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('category', {
    title: {type: DataTypes.STRING, allowNull:false, unique: true}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Category.belongsToMany(models.video, {through: 'videocategory'});

      }
    }
  });
  return Category;
};
