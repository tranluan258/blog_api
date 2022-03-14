const express = require('express');
const UserController = require('../controller/user.controller');
const router = express.Router();
const auth = require("../middleware/auth.jwt")

router.post('/sign-up', UserController.signUp)
router.post('/sign-in', UserController.signIn)
router.post('/log-out', auth, UserController.logOut)

module.exports = router;