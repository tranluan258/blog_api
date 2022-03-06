const DB = require('../lib/config.db')

class PostModel {
    static async getAllPost() {
        try {
            let query = 'SELECT * FROM post';
            let results = await DB.promise().query(query);
            return results[0];
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async addPost(authorId,title,slug,createdAt){
        try {
            let query = 'INSERT INTO post(authorId,title,slug,createdAt) VALUES (?,?,?,?)';
            let results = await DB.promise().query(query,[authorId,title,slug,createdAt])
            return results[0];
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async deletePost(id) {
        try {
            let query = 'DELETE FROM post WHERE id = ?';
            let results = await DB.promise().query(query,[id]);
            return results[0];
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async assignPost(id,title,slug,updatedAt) {
        try {
            let query = `UPDATE post SET title = '${title}' , slug = '${slug}',updatedAt = ${DB.escape(updatedAt)}  WHERE id = ?`;
            let results = await DB.promise().query(query,[id]);
            return results[0];
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async publishedPost(id,publishedAt) {
        try {
            let query = `UPDATE post SET published = 1, publishedAt = ${DB.escape(publishedAt)}  WHERE id = ?`;
            let results = await DB.promise().query(query,[id]);
            return results[0];
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

module.exports = PostModel;