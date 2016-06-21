'use strict';

let postId = "";
let currMessage = [];
$(document).ready(init);


function init() {
  $('.newPostForm').submit(createPost);

  $('.posts').on('click', '.upvote', upvote);
  $('.posts').on('click', '.downvote', downvote);
  $('.posts').on('click', '.delete', deletePost);
  $('.posts').on('click', '.edit', editPost);
  $('.saveEdit').on('click',saveEdit);

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
  let $score = $(this).closest('.post').find('.score');

  //add one to score
  $score.text(parseInt($score.text()) + 1);

  $.ajax(`/posts/upvote/${postId}`, {
    type: "PUT",
    success: () => null,
    error: (err) => console.log(err)

  });

  // debugger;

}



function downvote() {

  postId = $(this).closest('.post').data('id');
  let $score = $(this).closest('.post').find('.score');

  //subtract from score
  $score.text(parseInt($score.text()) - 1);

  $.ajax(`/posts/downvote/${postId}`, {
    type: "PUT",
    success: () => null,
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