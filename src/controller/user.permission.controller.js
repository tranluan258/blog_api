const UserPermissionModel = require("../models/user.permission.model")
const { StatusCodes } = require("http-status-codes");
const jsonData = require("../helpers/response");
const redis = require("../helpers/redis");

class UserPermissionController {
    static async addPermission(req, res) {
        try {
            let {userId,permissionId } = req.body;
            await UserPermissionModel.addPermission(userId,permissionId);
            await redis.deleteKey(userId);
            return res.status(StatusCodes.OK).json(jsonData("Add permission successfully"));

        } catch (error) {
            console.log("Error add permission: ", error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsonData("Server error"));
        }
    }

    static async deletePermission(req, res) {
        try {
            let {userId,permissionId } = req.body;
            await UserPermissionModel.addPermission(userId,permissionId);
            await redis.deleteKey(userId);
            return res.status(StatusCodes.OK).json(jsonData("Delete permission successfully"));

        } catch (error) {
            console.log("Error delete permission: ", error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsonData("Server error"));
        }
    }

    static async updatePermission(req, res) {
        try {
            let {userId,permissionId,value } = req.body;
            await UserPermissionModel.updatePermission(userId,permissionId,value);
            await redis.deleteKey(userId);
            return res.status(StatusCodes.OK).json(jsonData("Update permission successfully"));

        } catch (error) {
            console.log("Error update permission: ", error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsonData("Server error"));
        }
    }
}

module.exports = UserPermissionController;