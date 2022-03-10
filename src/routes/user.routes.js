const express = require('express');
const UserController = require('../controller/user.controller');
const router = express.Router();

router.post('/sign-up', UserController.signUp)
router.post('/sign-in', UserController.signIn)
router.post('/log-out', UserController.logOut)
router.put('/update-permission', UserController.updatePermission)

module.exports = router;