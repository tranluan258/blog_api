const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const jsonData = require("../helpers/response");
const redis = require("../helpers/redis");
const _ = require("lodash")

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

                let permission = {};
                _.forEach(resultPermission, (value) => {
                    const resource = value.resource;
                    const action = value.action;
                    permission[resource] ? permission[resource].push(action) : permission[resource] = [action];
                })
                
                // eslint-disable-next-line no-undef
                const { JWT_SECRET } = process.env;
                let timestamps = new Date();
                let payload = {
                    user_id: user.id,
                    permission: permission,
                };
                let token = await jwt.sign(payload, JWT_SECRET);

                
                const tableToken = {
                    token_values: {
                        token
                    },
                    created_at: timestamps,
                    updated_at: timestamps,
                };

                setTimeout(async() => {
                    let userInRedis = await redis.getValues(user.id);
                    if (userInRedis) {
                        await redis.deleteKey(user.id);
                    }
                    await redis.setValues(user.id, JSON.stringify(tableToken));
                },0)
                
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
        let id = req.body.user_id;
        if (!id) {
            return res.status(StatusCodes.BAD_REQUEST).json(jsonData("Not found user id"));
        }
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

module.exports = UserController;
