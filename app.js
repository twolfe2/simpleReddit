'use strict';

const PORT = process.env.PORT || 8000;

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const moment = require('moment');

let Post = require('./models/post');
let Comment = require('./models/comment');


let app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));


app.set('view engine', 'pug');



app.use('/posts',  require('./routes/posts'));
app.use('/comments', require('./routes/comments'));


app.get('/', (req,res) => {

  let posts;
  Post.getAll()
    .then(posts => {

      let formattedPosts = posts.map(post => {
        post.createdAt = moment(post.createdAt).format('lll');
      });
      // console.log(posts);
      return Comment.getAllComments(posts); 
      // res.render('index', {posts: posts});
      }).then((output) => {
        // console.log('comments:', output[0]);
        // console.log('posts:', output[1]);
        let comments = output[0];
        // console.log(com);
        let formattedComments = comments.map(comment =>  {
           console.log('in loop',comment);
          comment.createdAt = moment(comment.createdAt).format('lll');
          // console.log(comment);
        });
        // console.log(comments);
        res.render('index',{posts:output[1], comments: comments});
      })
    .catch(err => {
      res.send(err);
    });

});

app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
}); 