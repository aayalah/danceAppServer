var express = require('express');
var router = express.Router();
var models = require('../server/models/index');


router.get('/', function (req, res) {

  models.Category.findAll({}).then(function(categories) {
    res.json(categories);
  });


})


module.exports = router
