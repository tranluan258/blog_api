import { categorySchemaUpdateValidate,categorySchemaValidate } from './categoryValidate.js';
import { postSchemaValidate,postSchemaUpdateValidate } from './postValidate.js';
import { userPermissionSchemaValidate,userPermissionSchemaUpdateValidate } from './userPermissionValidate.js';
import { userSchemaValidate } from './userValidate.js';

export default {
    '/sign-in': userSchemaValidate,
    '/sign-up': userSchemaValidate,
    '/add-permission': userPermissionSchemaValidate,
    '/delete-permission': userPermissionSchemaValidate,
    '/update-permission': userPermissionSchemaUpdateValidate,
    '/add-category': categorySchemaValidate,
    '/assign-category': categorySchemaUpdateValidate,
    '/add-post': postSchemaValidate,
    '/assign-post': postSchemaUpdateValidate
}