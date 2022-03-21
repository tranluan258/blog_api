import schemas from "../validator/schemas.js";
import _ from 'lodash';
import response from '../helpers/response.js';
import { StatusCodes } from "http-status-codes";


export default async (req,res,next) => {
   try {
    const route = req.route.path;
    if(_.has(schemas,route)) {
        const indexSchema = _.get(schemas, route);
        const body = req.body;
        await indexSchema.validateAsync(body);
        next();
    }
   } catch (error) {
       console.log(error)
       res.status(StatusCodes.BAD_REQUEST).json(response(error.message))
   }
}