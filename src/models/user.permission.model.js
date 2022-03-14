const DB = require('../lib/config.db');

class UserPermissionModel {
    static async addPermission(userId,permissionId) {
        // eslint-disable-next-line no-useless-catch
        try {
            let query = 'INSERT INTO user_permission(id_user,id_permission) VALUES (?,?)';
            let result = await DB.promise().query(query,[userId,permissionId]);
            return result[0];
        } catch (error) {
            throw error;
        }
    }

    static async updatePermission(userId,permissionId,value) {
        // eslint-disable-next-line no-useless-catch
        try {
            let query = 'UPDATE user_permission SET value = ? WHERE id_user = ? and id_permission = ?';
            let result = await DB.promise().query(query,[value,userId,permissionId]);
            return result[0];
        } catch (error) {
            throw error;
        }
    }

    static async deletePermission(userId,permissionId) {
        // eslint-disable-next-line no-useless-catch
        try {
            let query = 'DELETE FROM user_permission WHERE id_user = ? and id_permission = ?';
            let result = await DB.promise().query(query,[userId,permissionId]);
            return result[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserPermissionModel;