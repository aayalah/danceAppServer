// Load required packages
var models = require('../models/index');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  console.log("inside");
  models.user.create({
    username: req.body.username,
    password: req.body.password
  }).then(function(user) {
    res.json("User created");
  }).catch(function(err) {
    res.send(err);
  });

};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {

  models.user.findAll({}).then(function(users) {
    res.json(users);
  }).catch(function(err) {
    res.send(err);
  });
};
