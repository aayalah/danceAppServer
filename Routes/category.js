var express = require('express');
var router = express.Router();
var models = require('../models/index');


router.get('/', function (req, res) {

  models.category.findAll({}).then(function(categories) {
    res.json(categories);
  });


})

router.post('/', function (req, res) {
  models.category.create({
    title: req.body.title,
  }).then(function(category) {
    res.json(category);
  });


});


router.delete('/', function (req, res) {
  models.category.destroy({where: {
        // criteria
    }}).then(function(category) {
    res.json(category);
  });
});

module.exports = router
