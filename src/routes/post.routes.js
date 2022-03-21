import express from 'express';
import PostController  from '../controller/post.controller.js';
const router =   express.Router();
import auth  from'../middleware/auth.jwt.js'
import check  from'../middleware/check.permission.js';
import schemaValidator from '../middleware/schemaValidator.js';


router.use(auth);

router.get('/get-all-post', check.checkPermission('post','get'), PostController.getAllPost)
router.post('/add-post', check.checkPermission('post','post'),schemaValidator, PostController.addPost)
router.delete('/delete-post/:id', check.checkPermission('post','delete'), PostController.deletePost)
router.put('/assign-post', check.checkPermission('post','put'), schemaValidator, PostController.assignPost)
router.put('/published-post', check.checkPermission('post','put'), PostController.publishedPost)

export default router