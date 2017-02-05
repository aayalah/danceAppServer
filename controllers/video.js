// Load required packages
var models = require('../models/index');

// Create endpoint /api/users for POST
exports.postVideo = function(req, res) {
  console.log(req.body.file);
  var cat = req.body.categories;
  models.video.create({
     uri: req.body.uri,
     title: req.body.title,
     description: req.body.description
   }).then(function(video) {
     req.user.addVideo(video);
     video.setUser(req.user);
     for(i = 0; i < cat.length; i++){
       models.category.findOrCreate({where:{title: cat[i]}, default:{title: cat[i]}})
       .then(function(category) {
         video.addCategory(category[0]);
       }).catch(function(err){
         res.send(err);
       });
     }
     res.json(video);
   }).error(function(err){
     res.send(err);
   });

};

exports.getVideos = function(req,res) {

    models.video.findAll({include: [{
        model: models.user
      }]}).then(function(videos){
      res.json(videos);
    })

}

exports.getUserVideos = function(req,res) {

    models.user.findById(req.params.user).then(function(user){
      user.getVideos().then(function(videos){
        res.json(videos);
      })
    })

}

// Create endpoint /api/users for GET
exports.getVideoCategory = function(req, res) {

  models.category.findOne({where: {title: req.params.category},include: [{model: models.video, include: [
      {model: models.user}
    ]}],
      through: {
          order: ['views', 'DESC']
      }
    }).then(function(categories) {
    res.json(categories);
  }).error(function(err){
    res.send(err);
  });


};

// Create endpoint /api/users for GET
exports.incrementViews = function(req, res) {

  models.video.findById(req.params.video).then(function(video) {
    return video.increment('views', {by: 1})
  }).then(function(video){
    return video.save();
  }).then(function(video) {
    res.json(video);
  }).error(function(err) {
    res.send(err);
  })


};
