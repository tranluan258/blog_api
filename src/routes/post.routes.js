const express = require('express');
const PostController = require('../controller/post.controller');
const router = express.Router();
const auth = require('../middleware/auth.jwt')
const check = require('../middleware/check.permission');

router.use(auth);

router.get('/get-all-post', check.checkPermission('post','read'), PostController.getAllPost)
router.post('/add-post', check.checkPermission('post','write'),PostController.addPost)
router.delete('/delete-post/:id', check.checkPermission('post','write'), PostController.deletePost)
router.put('/assign-post', check.checkPermission('post','write'), PostController.assignPost)
router.put('/published-post', check.checkPermission('post','write'), PostController.publishedPost)

module.exports = router