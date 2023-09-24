// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
// Create app
const app = express();
// Add other middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
// Data
const comments = require('./data/comments');
const posts = require('./data/posts');
// Get comments
app.get('/comments', (req, res) => {
    res.send(comments);
});
// Get comments by post id
app.get('/posts/:postId/comments', (req, res) => {
    const postId = Number(req.params.postId);
    const postComments = comments.filter(comment => comment.post_id === postId);
    res.send(postComments);
});
// Create comment
app.post('/posts/:postId/comments', (req, res) => {
    const postId = Number(req.params.postId);
    const newComment = {
        id: comments.length + 1,
        text: req.body.text,
        post_id: postId,
    };
    comments.push(newComment);
    res.send(newComment);
});
// Delete comment
app.delete('/comments/:commentId', (req, res) => {
    const commentId = Number(req.params.commentId);
    const deletedComment = comments.find(comment => comment.id === commentId);
    const index = comments.indexOf(deletedComment);
    comments.splice(index, 1);
    res.send(deletedComment);
});
// Get posts
app.get('/posts', (req, res) => {
    res.send(posts);
});
// Get post by id
app.get('/posts/:postId', (req, res) => {
    const postId = Number(req.params.postId);
    const post = posts.find(post => post.id === postId);
    res.send(post);
});
// Create post
app.post('/posts', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
    };
    posts.push(newPost);
    res.send(newPost);
});
// Delete post
app.delete('/posts/:postId', (req, res) => {
    const postId = Number(req.params.postId);
    const deletedPost = posts.find(post => post.id === postId);
    const index = posts.indexOf(deletedPost);
    posts.splice(index, 1);
    res.send(deletedPost);
});