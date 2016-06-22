'use strict';

//routes/comments.js - comments router

const express = require('express');

let router = express.Router();

let Comment = require('../models/comment');


router.get('/:postId', (req,res) => {

  Comment.getComments(req.params.postId)
    .then(comments => {
      console.log(comments);
      // res.render('comment', {comments: comments});
      res.send(comments);
    }).catch(err => {
      res.status(400).send(err);
    });
})



router.post('/:postId', (req,res) => {
  Comment.addComment(req.params.postId, req.body)
    .then(comment => {
      res.send(comment);
    }).catch(err => {
      res.status(400).send(err);
    });
});

module.exports = router;