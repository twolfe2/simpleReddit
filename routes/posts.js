'use strict';

//routes/posts.js - post router

const express = require('express');

let router = express.Router();

let Post = require('../models/post');



router.get('/', (req,res) => {

  Post.getAll()
    .then(posts => {
      res.send(posts);

    }).catch(err => {
      res.status(400).send(err);
    })
});

router.post('/', (req,res) => {

  Post.create(req.body)
    .then((post) => {
      res.send(post);
    }).catch(err => {
      res.status(400).send(err);
    });


});

router.put('/upvote/:id', (req,res) => {
  console.log(req.params.id);
    Post.upvote(req.params.id)
      .then(() => {
        res.send();
      }).catch(err => {
        res.status(400).send(err);
      });
});


router.put('/downvote/:id', (req,res) => {

   Post.downvote(req.params.id)
      .then(() => {
        res.send();
      }).catch(err => {
        res.status(400).send(err);
      });
});

router.delete('/:id', (req,res) => {

  Post.deletePost(req.params.id)
    .then(() => {
      res.send();
    }).catch(err => {
      res.status(400).send(err);
    })

});

router.put('/:id', (req,res) => {
  Post.update(req.params.id,req.body.text)
    .then(() => {
      res.send();
    }).catch(err => {
      res.status(400).send(err);
    })
})




module.exports = router;