const express = require('express');
const PostController = require('../controller/post.controller');
const router = express.Router();
const auth = require('../middleware/auth.jwt')

router.use(auth);

router.get('/get-all-post', PostController.getAllPost)
router.post('/add-post',PostController.addPost)
router.delete('/delete-post/:id', PostController.deletePost)
router.put('/assign-post', PostController.assignPost)
router.put('/published-post', PostController.publishedPost)

module.exports = router