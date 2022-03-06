const UserModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');
const jsonData = require('../helpers/response')

class UserController{
    static async signUp(req,res) {
        try {
            const {email,password} = req.body;
            let registeredAt = new Date();
            let result = await UserModel.signUp(email,password,registeredAt);
            return res.status(StatusCodes.CREATED).json(jsonData('Created',result))
        } catch (error) {
            console.log("Error add user: ", error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsonData('Server error'));
        }        
    }
    
    static async signIn(req,res) {
        try {
            const {email,password} = req.body;
            let result = await UserModel.signIn(email,password);
            if(result.length > 0) {
                // eslint-disable-next-line no-undef
                const {JWT_SECRET} = process.env;
                let payload = {email: result[0].email,id: result[0].id};
                let token = await jwt.sign(payload,JWT_SECRET,{expiresIn: "1m"});
                return res.status(StatusCodes.OK).json(jsonData('Login success', token))
            }else {
                return res.status(StatusCodes.NOT_FOUND).json(jsonData('Not found'))
            }
            
        } catch (error) {
            console.log("Error login user: ", error.message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsonData('Server error'));
        }        
    }
}

module.exports = UserController;