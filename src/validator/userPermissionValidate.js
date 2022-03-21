import joi from "joi";

const userPermissionSchemaValidate = joi.object({
    userId: joi.number().required(),
    permissionId: joi.number().required()
})

const userPermissionSchemaUpdateValidate = userPermissionSchemaValidate.append({
    value: joi.number().required()
})

export {
    userPermissionSchemaValidate,userPermissionSchemaUpdateValidate
}