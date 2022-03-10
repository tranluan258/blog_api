const DB = require('../lib/config.db');
class UserModel {
    static async signUp(email,password,registeredAt) {
        try {
            let query = 'INSERT INTO user(email,passwordHash,registeredAt) VALUES (?,?,?)';
            let results = await DB.promise().query(query,[email,password,registeredAt]);
            return results[0];
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async signIn(email,password) {
        try {
            let query = 'SELECT * FROM user WHERE email = ? and passwordHash = ?';
            let result =  await DB.promise().query(query,[email,password]);
            let user = (result[0])[0];
            let resultPermission = [];
            if(user) {
                query = 'SELECT id_permission FROM user_permission WHERE id_user = ? && value = 1';
                let arrPermission = (await DB.promise().query(query,[user.id]))[0];
    
                for (let index = 0; index < arrPermission.length; index++) {
                    let query = 'SELECT resource,action FROM permission WHERE id = ?';
                    let result = await DB.promise().query(query,[arrPermission[index].id_permission]);
                    resultPermission.push((result[0])[0])
                }
            }
            return {
                user,resultPermission
            };
            
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async updatePermission(id,user_id,value) {
        try {
            let query = 'UPDATE user_permission SET value = ? WHERE id = ? AND id_user = ?';
            let result = await DB.promise().query(query,[value,id,user_id]);
            return result[0];
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

module.exports = UserModel;