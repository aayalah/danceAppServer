var express = require('express');
var router = express.Router();
var models = require('../models/index');


router.get('/:category', function (req, res) {

  models.category.findOne({where: {title: req.params.category},include: [{
      model: models.video,
      through: {
          order: ['views', 'DESC']
      }
    }]
  }).then(function(categories) {
    res.json(categories);
  });
})


////Add user
router.post('/', function (req, res) {
  var cat = req.body.categories;
  //console.log(cat);
 /*models.user.find({where:{}}).then(function(){

 })*/

 models.video.create({
    uri: req.body.uri,
    title: req.body.title,
    description: req.body.description
  }).then(function(video) {
    //user.setVideos(video);

    for(i = 0; i < cat.length; i++){
      //console.log(cat[i]);
      models.category.findOrCreate({where:{title: cat[i]}, default:{title: cat[i]}})
      .then(function(category) {
        //console.log(video);
        console.log(category);
        return video.setCategories(category[0]);
      }).error(function(err){
        console.log(err);
      });
    }
    res.json(video);
  });


});

router.put('/:video/views', function(req, res) {
  models.video.findById(req.params.video).then(function(video) {
    return video.increment('views', {by: 1})
  }).then(function(video){
    return video.save();
  }).then(function(video) {
    res.json(video);
  })
});


router.delete('/', function (req, res) {
  models.video.destroy({where: {
    }}).then(function(category) {
    res.json(category);
  });
});

module.exports = router
