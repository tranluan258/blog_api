const express = require('express');
const UserPermissionController = require('../controller/user.permission.controller');
const router = express.Router();

router.put('/add-permission', UserPermissionController.addPermission)
router.put('/delete-permission', UserPermissionController.deletePermission)
router.put('/update-permission', UserPermissionController.updatePermission)



module.exports = router;