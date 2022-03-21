import express  from 'express';
import UserController  from '../controller/user.controller.js';
const router = express.Router();
import auth  from "../middleware/auth.jwt.js";
import schemaValidator from '../middleware/schemaValidator.js';

router.post('/sign-up', schemaValidator, UserController.signUp)
router.post('/sign-in',schemaValidator, UserController.signIn)
router.post('/log-out', auth, UserController.logOut)

export default router;