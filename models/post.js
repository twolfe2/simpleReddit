'use strict';


//models/post.js - Post model

const db = require('../config/db');
const uuid = require('uuid');
const moment = require('moment');

db.query(`CREATE TABLE IF NOT EXISTS posts(
  id TEXT,
  createdAt TEXT,
  text TEXT, 
  score INT )`);


exports.getAll = () => {

  return new Promise((resolve,reject) => {

    db.query('SELECT * FROM posts', (err,posts) => {
      if(err) {
        reject(err);
      }else {
        resolve(posts);
      }
    })

  });


};

exports.create = postObj => {

  postObj.id = uuid();
  postObj.createdAt = moment().toISOString();
  postObj.score = 0;


  return new Promise(function(resolve, reject) {
    db.query('insert into posts SET ?',postObj,
      function(err) {
        if(err) {
          reject(err);
        } else {
          db.query('select * from posts order by createdAt desc limit 1', (err,posts) => {

            if(err) return reject(err);
            console.log('post',posts)
            resolve(posts[0]);
          })
        }
      }
    )
  });
};



exports.upvote= postId => {
  return new Promise((resolve,reject) => {
    db.query(`UPDATE posts SET score=score+1 WHERE id = ?`,postId, (err) => {
      if(err) reject(err);
      else resolve();
    });

  });
};


exports.downvote =  postId => {
  return new Promise((resolve,reject) => {
    db.query(`UPDATE posts SET score=score-1 WHERE id = ?`,postId, (err) => {
      if(err) reject(err);
      else resolve();
    });

  });
};


exports.deletePost = postId => {
  return new Promise((resolve,reject) => {
    db.query('DELETE FROM posts WHERE id = ?', postId, (err) => {
      if(err) reject(err);
      else resolve();
    });
  });
};


///fix update!!!!
exports.update = (postId,newText) => {
  return new Promise((resolve,reject) => {
    db.query('UPDATE posts SET text = ? WHERE id = ?',[newText,postId], (err) => {
      if(err) reject(err);
      else resolve();
    })
  })


}