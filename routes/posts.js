const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

const { authentication } = require('../helper/auth');
const { uploadMultiple } = require('../config/multer');

/* GET Posts pages. */
router.get('/', postsController.renderPostsPage);

// loading  add post page
router.get('/addpost',authentication, postsController.renderAddPostPage);

//loading single post page
router.get('/single/:id', postsController.renderSinglePage);

//loading edit post page
router.get('/editpost/:id',authentication, postsController.renderEditPostPage);

//loading posts by category page
router.get('/category/:category', postsController.postsByCatgPage);

// Post route
router.post('/add',authentication, uploadMultiple, postsController.addPost);

// Editing post
router.put('/editpost/:id',authentication, uploadMultiple, postsController.editPost);

//Deleting post
router.delete('/delete/:id', authentication, postsController.removePost);

//Search posts
router.post('/search', postsController.searchPosts);


module.exports = router;