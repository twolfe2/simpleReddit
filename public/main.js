'use strict';

let postId = "";
let currMessage = [];
$(document).ready(init);


function init() {

  $.fn.extend({
    animateCss: function(animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      $(this).addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
      });
    }
  });

  $('.newPostForm').submit(createPost);

  $('.posts').on('click', '.upvote', upvote);
  $('.posts').on('click', '.downvote', downvote);
  $('.posts').on('click', '.delete', deletePost);
  $('.posts').on('click', '.edit', editPost);
  $('.saveEdit').on('click', saveEdit);
  $('.posts').on('click', '.toggleComments', toggleComments);
  $('.posts').on('click', '.addComment', addComment);
  // $('.posts').on('click', '.hideComments', hideComments);


}



function createPost(e) {
  e.preventDefault();

  let text = $('.text').val();


  $.post('/posts', { text: text })
    .done((post) => {

      let $element = postElement(post);
      $('.posts').append($element);
      // console.log(post);
    })
    .fail(err => {
      console.log('err:', err);
    });

}


function postElement(post) {
  let $newPost = $('.template').clone().data('id', post.id);
  $newPost.removeClass('template');



  let time = moment(post.createdAt).format('LLL');

  $newPost.find('.createdAt').text(`${time}`);
  $newPost.find('.score').text('0');
  $newPost.find('.text').text(post.text);


  return $newPost;

}


function upvote() {

  postId = $(this).closest('.post').data('id');
  let $score = $(this).closest('.post').find('.postScore');
  // debugger;


  $.ajax(`/posts/upvote/${postId}`, {
    type: "PUT",
    success: () => {
      //add one to score
      $score.text(parseInt($score.text()) + 1);
    },
    error: (err) => console.log(err)

  });

  // debugger;

}



function downvote() {

  postId = $(this).closest('.post').data('id');
  let $score = $(this).closest('.post').find('.postScore');



  $.ajax(`/posts/downvote/${postId}`, {
    type: "PUT",
    success: () => {

      //subtract from score
      $score.text(parseInt($score.text()) - 1);
    },
    error: (err) => console.log(err)

  });

}


function deletePost() {
  postId = $(this).closest('.post').data('id');

  $.ajax(`/posts/${postId}`, {
    type: "DELETE",
    success: () => {
      $(this).closest('.post').remove();

    },
    error: (err) => console.log(err)
  });
};

function editPost() {

  currMessage = $(this).closest('.post');
  postId = $(this).closest('.post').data('id');

  let $textBox = $('.newText');

  $textBox.val($(this).closest('.post').find('.text').text());


}


function saveEdit() {
  let newText = $('.newText').val();


  $.ajax(`/posts/${postId}`, {
    type: "PUT",
    data: {
      text: newText
    },
    success: () => {
      currMessage.find('.text').text(newText);
      $('#editModal').modal('toggle');

    },
    error: (err) => {
      console.log(err);
    }

  });

}

function toggleComments() {
  // $(this).removeClass('showComments').addClass('hideComments');
  let $comments = $(this).closest('.post').find('.comments');

  let $comment = $(this).closest('.post').find('.comment');
  // $comments.css('display', 'block');

  $comments.slideToggle();


};




function addComment() {

  let postId = $(this).closest('.post').data('id');
  $('#addComment').modal('toggle');
  $('.saveComment').one('click',function() {
     let text = $('.commentText').val();

  // debugger;


    $.post('/comments/'+postId, { commentText: text })
      .done((comment) => {

        let $element = postComment(comment);
        $('.comments').append($element);
        // debugger;
        $('#addComment').modal('toggle');
        // console.log(post);
      })
      .fail(err => {
        console.log('err:', err);
      });

});


}
 


function postComment(comment) {
  let $newPost = $('.commentTemplate').clone().data('id', comment.id);
  $newPost.removeClass('commentTemplate');



  let time = moment(comment.createdAt).format('LLL');

  $newPost.find('.createdAt').text(`${time}`);
  $newPost.find('.commentScore').text('0');
  $newPost.find('.text').text(comment.commentText);


  return $newPost;

}


// function createPost(e) {
//   e.preventDefault();

//   let text = $('.text').val();


//   $.post('/posts', { text: text })
//     .done((post) => {

//       let $element = postElement(post);
//       $('.posts').append($element);
//       // console.log(post);
//     })
//     .fail(err => {
//       console.log('err:', err);
//     });

// }



// function hideComments() {

//   // $(this).removeClass('hideComments').addClass('showComments');
//   let $comments = $(this).closest('.post').next();



//   $comments.slideUp();
//   // $comments.css('display', 'none');

// }

