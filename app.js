'use strict';

const PORT = process.env.PORT || 8000;

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const moment = require('moment');

let Post = require('./models/post');


let app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));


app.set('view engine', 'pug');



app.use('/posts',  require('./routes/posts'));
app.use('/comments', require('./routes/comments'));


app.get('/', (req,res) => {


  Post.getAll()
    .then(posts => {

      let formattedPosts = posts.map(post => {
        post.createdAt = moment(post.createdAt).format('lll');
      })

      res.render('index', {posts: posts});
      })
    .catch(err => {
      res.send(err);
    });

});

app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
}); 