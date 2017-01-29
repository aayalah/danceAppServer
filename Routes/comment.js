var express = require('express');
var router = express.Router();
var models = require('../models/index');


router.get('/:video', function (req, res) {

    models.comments.findAll({where: {id: req.params.video}, order: [['createdAt', 'ASC']],include: [{
        model: models.user
      }]}).then(function(comments) {
      res.json(comments);
    });


})

///Add user
router.post('/:video', function (req, res) {
  models.video.findById(req.params.video).then(function(video) {
    models.comments.create({
      text: req.body.text,
    }).then(function(comment) {
      video.setCommentss(comment);
      res.json(comment);
    })
  });

});


router.delete('/', function (req, res) {
  models.comments.destroy({where: {
    }}).then(function(category) {
    res.json(category);
  });
});

module.exports = router
