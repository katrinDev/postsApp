const express = require('express');

const { 
    getPost, 
    deletePost, 
    editPost,
    getPosts,
    addPost
} = require('../controllers/api-post-controller');

const router = express.Router();

//Get all posts
router.get('/api/posts', getPosts);
//Add new post
router.post('/api/add-post', addPost);
//Get post by ID
router.get('/api/posts/:id', getPost);
//Delete post by ID
router.delete('/api/posts/:id', deletePost);
//Update post by ID
router.put('/api/edit/:id', editPost);

// мы вставляем функции-контроллеры в роуты в соответствии с типом запроса 

module.exports = router;