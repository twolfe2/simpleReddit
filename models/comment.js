'use strict';


//models/comment.js - Comment model

const db = require('../config/db');
const uuid = require('uuid');
const moment = require('moment');



db.query(`CREATE TABLE IF NOT EXISTS comments(
  id TEXT,
  postId TEXT,
  createdAt TEXT,
  commentText TEXT, 
  score INT )`);


exports.getComments = (postId) => {

  return new Promise((resolve,reject) => {

    db.query('SELECT comments.id,comments.postId, comments.commentText,posts.text FROM comments JOIN posts ON (posts.id = comments.postId) WHERE comments.postId = ?',postId,(err, results) => {
      if(err) return reject(err);

      resolve(results);
    });
  });
};

exports.addComment = (postId, commentObj) => {

  commentObj.id = uuid();
  commentObj.postId = postId;
  commentObj.createdAt = moment().toISOString();
  commentObj.score=0;

  return new Promise((resolve,reject) => {
    
    db.query('INSERT INTO comments SET ?', commentObj,
      function(err) {
        if(err) {
          reject(err);
        } else {
          db.query('select * from comments order by createdAt desc limit 1', (err,comments) => {

            if(err) return reject(err);
            
            resolve(comments[0]);
          });
        }
      });
  });
}