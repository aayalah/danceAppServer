// Load required packages
var models = require('../models/index');

// Create endpoint /api/users for POST
exports.getCategories = function(req, res) {

  models.category.findAll({}).then(function(categories) {
    res.json(categories);
  });

};
