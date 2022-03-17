import express  from 'express';
import UserController  from '../controller/user.controller.js';
const router = express.Router();
import auth  from "../middleware/auth.jwt.js"

router.post('/sign-up', UserController.signUp)
router.post('/sign-in', UserController.signIn)
router.post('/log-out', auth, UserController.logOut)

export default router;