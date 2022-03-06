const DB = require('../lib/config.db')
// const hash = require("bcrypt");
class UserModel {
    static async signUp(email,password,registeredAt) {
        try {
            let query = 'INSERT INTO user(email,passwordHash,registeredAt) VALUES (?,?,?)';
            // let passwordHash = hash.hashSync(password,2);
            let results = await DB.promise().query(query,[email,password,registeredAt])
            return results[0];
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async signIn(email,password) {
        try {
            let query = 'SELECT * FROM user WHERE email = ? and passwordHash = ?';
            let result =  await DB.promise().query(query,[email,password]);
            return result[0];
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

module.exports = UserModel;