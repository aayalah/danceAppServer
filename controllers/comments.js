// Load required packages
var models = require('../models/index');

// Create endpoint /api/users for POST
exports.postComment = function(req, res) {

  models.video.findById(req.params.video).then(function(video) {
    models.comments.create({
      text: req.body.text,
    }).then(function(comment) {
      video.addComment(comment);
      req.user.addComment(comment);
      comment.setUser(req.user);
      comment.setVideo(video);
      res.json(comment);
    })
  }).error(function(err) {
    res.send(err);
  });

};

// Create endpoint /api/users for GET
exports.getComments = function(req, res) {

  models.comments.findAll({where: {videoId: req.params.video}, order: [['createdAt', 'ASC']],include: [{
      model: models.user
    }]}).then(function(comments) {
    res.json(comments);
  }).error(function(err){
    res.send(err);
  });


};
