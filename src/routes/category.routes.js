import express from 'express';
import CategoryController from '../controller/category.controller.js';
const router =  express.Router();
import auth  from '../middleware/auth.jwt.js';
import check from '../middleware/check.permission.js';

router.use(auth);

router.get('/get-all-category', check.checkPermission('category','get'), CategoryController.getAllCategory)
router.post('/add-category',check.checkPermission('category','post'),CategoryController.addCategory)
router.delete('/delete-category/:id',check.checkPermission('category','delete'), CategoryController.deleteCategory)
router.put('/assign-category',check.checkPermission('category','put'), CategoryController.assignCategory)

export default router