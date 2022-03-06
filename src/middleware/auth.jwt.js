const jwt = require('jsonwebtoken')
const {StatusCodes} = require('http-status-codes');
const jsonData = require('../helpers/response')
const TOKEN_VALUE_INDEX = 1;

module.exports = function(req, res, next) {
    // eslint-disable-next-line no-undef
    const {JWT_SECRET} = process.env;
    let header = req.header("Authorization");
    if(!header) {
        return  res.status(StatusCodes.UNAUTHORIZED).json(jsonData("Please enter token"))
     }
 
     let token = header.split(" ")[TOKEN_VALUE_INDEX];
     jwt.verify(token, JWT_SECRET, (err, data) => {
         if(err) {
             return res.status(StatusCodes.UNAUTHORIZED).json(jsonData("Token not match or expired"))
         }
         req.user = data;
         next()
     })
}