'use strict';


//models/post.js - Post model

const db = require('../config/db');
const uuid = require('uuid');
const moment = require('moment');

db.run(`CREATE TABLE IF NOT EXISTS posts(
  id TEXT,
  createdAt TEXT,
  text TEXT, 
  score INT )`);


exports.getAll = () => {

  return new Promise((resolve,reject) => {

    db.all('SELECT * FROM posts', (err,posts) => {
      if(err) {
        reject(err);
      }else {
        resolve(posts);
      }
    })

  });


};

exports.create = postObj => {
  return new Promise(function(resolve, reject) {
    db.run('insert into posts values (?,?,?,?)',
      uuid(),
      moment().toISOString(),
      postObj.text,
      0,
      function(err) {
        if(err) {
          reject(err);
        } else {
          db.get('select * from posts order by createdAt desc limit 1', (err,post) => {

            if(err) return reject(err);
            
            resolve(post);
          })
        }
      }
    )
  });
};



exports.upvote= postId => {
  return new Promise((resolve,reject) => {
    db.run(`UPDATE posts SET score=score+1 WHERE id = ?`,postId, (err) => {
      if(err) reject(err);
      else resolve();
    });

  });
};


exports.downvote =  postId => {
  return new Promise((resolve,reject) => {
    db.run(`UPDATE posts SET score=score-1 WHERE id = ?`,postId, (err) => {
      if(err) reject(err);
      else resolve();
    });

  });
};


exports.deletePost = postId => {
  return new Promise((resolve,reject) => {
    db.run('DELETE FROM posts WHERE id = ?', postId, (err) => {
      if(err) reject(err);
      else resolve();
    });
  });
};

exports.update = (postId,newText) => {
  return new Promise((resolve,reject) => {
    db.run('UPDATE posts SET text = ? WHERE id = ?',newText,postId, (err) => {
      if(err) reject(err);
      else resolve();
    })
  })


}