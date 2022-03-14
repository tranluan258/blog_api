const { StatusCodes } = require("http-status-codes");
const response = require("../helpers/response");

module.exports = {
    checkPermission: (resource, action) => {
        return (req, res, next) => {
            let data = req.user;
            let permission = data.permission;
            return permission?.[resource].includes(action) ? next() : res.status(StatusCodes.FORBIDDEN).json(response("No permission"));
        }
    }
}