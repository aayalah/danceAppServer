var express = require('express');
var category = require('./Routes/category.js');
var video = require('./Routes/videos.js');
var comment = require('./Routes/comment.js');

var app = express();
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/categories', category);
app.use('/videos', video);
app.use('/comments', comment);

var PORT = process.ENV_PORT || 4000
app.listen(PORT, () => console.log("Listening ont port ${PORT}"));
