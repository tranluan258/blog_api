import PostModel  from "../models/post.model.js";
import {StatusCodes}  from 'http-status-codes';
import jsonData  from '../helpers/response.js';

class PostController {
    static async getAllPost(req,res){
        try {
            let results = await PostModel.getAllPost();
            return res.status(StatusCodes.OK).json(jsonData("Success", results))
        } catch (error) {
            console.log("Error get all: ", error.message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsonData('Server error'));
        }
    }

    static async addPost(req,res) {
        try {
            const {title,slug} = req.body;
            const authorId = req.user.id;
            let createdAt = new Date();
            let result = await PostModel.addPost(authorId,title,slug,createdAt)
            return res.status(StatusCodes.CREATED).json(jsonData("Created", result))
        } catch (error) {
            console.log("Error add Post: ", error.message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsonData('Server error'));
        }
    }

    static async deletePost(req,res) {
        try {
           const id = req.params.id;
           let result =  await PostModel.deletePost(id);
           let affectedRows = result.affectedRows;
           if(affectedRows> 0){
                return res.status(StatusCodes.OK).json(jsonData("Deleted"))
           }else {
                return res.status(StatusCodes.NOT_FOUND).json(jsonData('Not found'))
           }
           
        } catch (error) {
            console.log("Error delete Post: ", error.message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsonData('Server error'));
        }
    }

    static async assignPost(req,res) {
        try {
            const {id,title,slug} = req.body;
            let updatedAt = new Date();
            let result = await PostModel.assignPost(id,title,slug,updatedAt);
            let affectedRows = result.affectedRows;
            if(affectedRows> 0){
                return res.status(StatusCodes.OK).json(jsonData("Assign done"))
           }else {
                return res.status(StatusCodes.NOT_FOUND).json(jsonData('Not found'))
           }
        } catch (error) {
             console.log("Error assign Post: ", error.message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsonData('Server error'));
        }
    }

    static async publishedPost(req,res) {
        try {
            const {id} = req.body;
            let publishedAt = new Date();
            let result = await PostModel.publishedPost(id,publishedAt);
            let affectedRows = result.affectedRows;
            if(affectedRows> 0){
                return res.status(StatusCodes.OK).json(jsonData("Published done"))
           }else {
                return res.status(StatusCodes.NOT_FOUND).json(jsonData('Not found'))
           }
        } catch (error) {
             console.log("Error publish Post: ", error.message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsonData('Server error'));
        }
    }
}

export default PostController;