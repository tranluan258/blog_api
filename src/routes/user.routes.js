const express = require('express');
const UserController = require('../controller/user.controller');
const router = express.Router();

router.post('/sign-up', UserController.signUp)
router.post('/sign-in', UserController.signIn)

module.exports = router;