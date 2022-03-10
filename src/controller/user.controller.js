const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const jsonData = require("../helpers/response");
const redis = require("../helpers/redis");

class UserController {
    static async signUp(req, res) {
        try {
            const { email, password } = req.body;
            let timestamps = new Date();
            let result = await UserModel.signUp(email, password, timestamps);
            return res.status(StatusCodes.CREATED).json(jsonData("Created", result.results));
        } catch (error) {
            console.log("Error add user: ", error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsonData("Server error"));
        }
    }

    static async signIn(req, res) {
        try {
            const { email, password } = req.body;
            let result = await UserModel.signIn(email, password);
            let user = result.user;
            let resultPermission = result.resultPermission;
            if (user) {
                // eslint-disable-next-line no-undef
                const { JWT_SECRET } = process.env;
                let timestamps = new Date();
                let payload = {
                    user_id: user.id,
                    permission: resultPermission,
                };
                let token = await jwt.sign(payload, JWT_SECRET);

                const tableToken = {
                    token_values: {
                        token
                    },
                    created_at: timestamps,
                    updated_at: timestamps,
                };
                let userInRedis = await redis.getValues(user.id);
                if (userInRedis) {
                    await redis.deleteKey(user.id);
                }
                await redis.setValues(user.id, JSON.stringify(tableToken));
                
                return res.status(StatusCodes.OK).json(jsonData("Login success", token));
            } else {
                return res.status(StatusCodes.OK).json(jsonData("Login failed"));
            }
        } catch (error) {
            console.log("Error login user: ", error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsonData("Server error"));
        }
    }

    static async logOut(req, res) {
        let id = req.params.id;
        if (id) {
            try {
                let redisUser = await redis.getValues(id);
                let parseData =JSON.parse(redisUser);
                await redis.deleteKey(id);
                await redis.pushValuesArr(`blacklist`, parseData.token_values.token);
                return res.status(StatusCodes.OK).json(jsonData("You are logged out"));
            } catch (error) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsonData("Server error"));
            }
        }
    }

    static async updatePermission(req, res) {
        try {
            let { id, user_id, value } = req.body;
            let result = await UserModel.updatePermission(id, user_id,value);
            let affectedRows = result.affectedRows;
            if (affectedRows > 0) {
                await redis.deleteKey(user_id);
                return res.status(StatusCodes.OK).json(jsonData("Updated"));
            } else {
                return res.status(StatusCodes.NOT_FOUND).json(jsonData("Not found"));
            }
        } catch (error) {
            console.log("Error update permission: ", error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsonData("Server error"));
        }
    }
}

module.exports = UserController;
