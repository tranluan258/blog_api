import express  from 'express';
import UserPermissionController from '../controller/user.permission.controller.js';
const router = express.Router();

router.post('/add-permission', UserPermissionController.addPermission)
router.delete('/delete-permission', UserPermissionController.deletePermission)
router.put('/update-permission', UserPermissionController.updatePermission)

export default router;