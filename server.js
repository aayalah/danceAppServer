var express = require('express');
var category = require('./Routes/category.js');
var video = require('./Routes/videos.js');
var comment = require('./Routes/comment.js');

var app = express();
var bodyParser = require('body-parser')


var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var videoController = require('./controllers/video');
var commentController = require('./controllers/comments');
var categoryController = require('./controllers/category');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Authorization')
  next();
});

// Create our Express router
var router = express.Router();

router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

router.route('/videos')
    .post(authController.isAuthenticated, videoController.postVideo)
    .get(authController.isAuthenticated, videoController.getVideos)

router.route('/videos/:user')
    .get(authController.isAuthenticated, videoController.getUserVideos)

router.route('/category/:category/videos')
  .get(authController.isAuthenticated, videoController.getVideoCategory)

router.route('/videos/:video/incrementView')
  .put(authController.isAuthenticated, videoController.incrementViews)

router.route('/comments/:video')
  .get(authController.isAuthenticated, commentController.getComments)
  .post(authController.isAuthenticated, commentController.postComment)

router.route('/category')
  .get(authController.isAuthenticated, categoryController.getCategories)

app.use('/api', router);

var server_port = process.env.YOUR_PORT || process.env.PORT || 8090;
var server_host = '' || '0.0.0.0';

var PORT = process.ENV_PORT || 8090
app.listen(server_port, server_host, () => console.log("Listening on port" + PORT));
