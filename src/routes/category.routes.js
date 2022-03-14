const express = require('express');
const CategoryController = require('../controller/category.controller');
const router = express.Router();
const auth = require('../middleware/auth.jwt');
const check= require('../middleware/check.permission');

router.use(auth);

router.get('/get-all-category', check.checkPermission('category','get'), CategoryController.getAllCategory)
router.post('/add-category',check.checkPermission('category','post'),CategoryController.addCategory)
router.delete('/delete-category/:id',check.checkPermission('category','delete'), CategoryController.deleteCategory)
router.put('/assign-category',check.checkPermission('category','put'), CategoryController.assignCategory)

module.exports = router