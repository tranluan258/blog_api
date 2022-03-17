import { StatusCodes }  from "http-status-codes";
import response  from "../helpers/response.js";

export default {
    checkPermission: (resource, action) => {
        return (req, res, next) => {
            let data = req.user;
            let permission = data.permission;
            return permission?.[resource]?.includes(action) ? next() : res.status(StatusCodes.FORBIDDEN).json(response("No permission"));
        }
    }
}