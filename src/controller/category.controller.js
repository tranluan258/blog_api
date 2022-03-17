import CategoryModel  from '../models/category.model.js'
import {StatusCodes}  from 'http-status-codes';
import jsonData  from '../helpers/response.js';
import redis  from '../helpers/redis.js';
const KEY_SAVE_CATEGORY = 'category'

class CategoryController {
    static async getAllCategory(req,res){
        try {
            let redisCategory = await redis.getValues(KEY_SAVE_CATEGORY);
            if(redisCategory) {
                return res.status(StatusCodes.OK).json(jsonData("Success", JSON.parse(redisCategory)));
            }
            let results = await CategoryModel.getAllCategory();
            await redis.setValuesExpired(KEY_SAVE_CATEGORY,JSON.stringify(results));
            return res.status(StatusCodes.OK).json(jsonData("Success", results));
        } catch (error) {
            console.log("Error get all: ", error.message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsonData('Server error'));
        }
    }

    static async addCategory(req,res) {
        try {
            const {title,slug, content} = req.body; 
            let results = await CategoryModel.addCategory(title,slug,content)
            return res.status(StatusCodes.CREATED).json(jsonData("Created",results))
        } catch (error) {
            console.log("Error add Category: ", error.message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsonData('Server error'));
        }
    }

    static async deleteCategory(req,res) {
        try {
           const id = req.params.id;
           let results =  await CategoryModel.deleteCategory(id);
           let affectedRows = results.affectedRows;
           if(affectedRows> 0){
                return res.status(StatusCodes.OK).json(jsonData('Deleted'))
           }else {
                return res.status(StatusCodes.NOT_FOUND).json(jsonData('Not found'))
           }
           
        } catch (error) {
            console.log("Error delete Category: ", error.message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsonData('Server error'));
        }
    }

    static async assignCategory(req,res) {
        try {
            const {id,title,slug,content} = req.body;
            let result = await CategoryModel.assignCategory(id,title,slug,content);
            let affectedRows = result.affectedRows;
            if(affectedRows> 0){
                return res.status(StatusCodes.ok).json(jsonData('Assign done'))
           }else {
                return res.status(StatusCodes.NOT_FOUND).json(jsonData('Not found'))
           }
        } catch (error) {
            console.log("Error assign Category: ", error.message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsonData('Server error'));
        }
    }
}

export default CategoryController;