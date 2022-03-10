const { StatusCodes } = require("http-status-codes");
const response = require("../helpers/response");

module.exports = {
    checkPermission: (resource, action) => {
        return (req, res, next) => {
            let data = req.user;
            let permission = data.permission;
            let check = false;
            if (permission) {
                permission.forEach(element => {
                    if (element.resource === resource && element.action === action) {
                        // eslint-disable-next-line no-unused-vars
                        check = true;
                    }
                });

                if (check) {
                    return next();
                }
                return res.status(StatusCodes.FORBIDDEN).json(response("No permission"))
            }
            return res.status(StatusCodes.FORBIDDEN).json(response("Token not match or expired"))
        }
    }
}