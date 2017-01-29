var express = require('express');
var router = express.Router();
var models = require('../models/index');


router.get('/', function (req, res) {

  models.User.findAll({where: {

  }}).then(function(categories) {
    res.json(categories);
  });


})


router.post('/', function (req, res) {
  models.User.create({
    title: req.body.title,
  }).then(function(category) {
    res.json(category);
  });


});


router.delete('/', function (req, res) {
  models.User.destroy({where: {
    }}).then(function(category) {
    res.json(category);
  });
});

router.get('/users', function (req, res) {

  models.User.findAll({}).then(function(categories) {
    res.json(categories);
  });


})


module.exports = router
