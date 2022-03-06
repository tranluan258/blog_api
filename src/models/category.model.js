const DB = require("../lib/config.db")

class CategoryModel{
    static async getAllCategory() {
        // eslint-disable-next-line no-useless-catch
        try {
            let query = 'SELECT * FROM category';
            let results = await DB.promise().query(query);
            return results[0];
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async addCategory(title,slug,content){
        try {
            let query = `INSERT INTO category(title,slug,content) VALUES ('${title}', '${slug}', '${content}')`;
            let results = await DB.promise().query(query);
            return results[0];
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async deleteCategory(id) {
        try {
            let query = 'DELETE FROM category WHERE id = ?';
            let results = await DB.promise().query(query, [id]);
            return results[0];
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async assignCategory(id,title,slug,content) {
        try {
            let query = `UPDATE category SET title = '${title}' , slug = '${slug}' , content = '${content}' WHERE id = ?`;
            let results = await DB.promise().query(query,[id]);
            return results[0];
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

module.exports = CategoryModel;