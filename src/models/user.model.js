import DB from "../lib/config.db.js";

class UserModel {
    static async signUp(email,password,registeredAt) {
        // eslint-disable-next-line no-useless-catch
        try {
            let query = 'INSERT INTO user(email,passwordHash,registeredAt) VALUES (?,?,?)';
            let results = await DB.promise().query(query,[email,password,registeredAt]);
            return results[0];
        } catch (error) {
            throw error;
        }
    }

    static async signIn(email,password) {
        // eslint-disable-next-line no-useless-catch
        try {
            let query = 'SELECT * FROM user WHERE email = ? and passwordHash = ?';
            let result =  await DB.promise().query(query,[email,password]);
            let user = (result[0])[0];
            if(user) {
                query = 'SELECT resource,action FROM permission,user_permission WHERE user_permission.id_user = ? && user_permission.id_permission = permission.id';
                let resultPermission = (await DB.promise().query(query,[user.id]))[0];
                return {
                    user,resultPermission
                };
            }
            return null;
            
        } catch (error) {
            throw error;
        }
    }
}

export default UserModel