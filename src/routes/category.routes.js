const express = require('express');
const CategoryController = require('../controller/category.controller');
const router = express.Router();
const auth = require('../middleware/auth.jwt')

router.use(auth);

router.get('/get-all-category', CategoryController.getAllCategory)
router.post('/add-category',CategoryController.addCategory)
router.delete('/delete-category/:id', CategoryController.deleteCategory)
router.put('/assign-category', CategoryController.assignCategory)

module.exports = router