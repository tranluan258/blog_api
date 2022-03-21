import joi from 'joi';

const postSchemaValidate = joi.object({
    authorId: joi.number().required(),
    title: joi.string().min(1).required(),
    slug: joi.string().min(1).required(),
})

const postSchemaUpdateValidate = postSchemaValidate.append({
    id: joi.number().required()
})

export {
    postSchemaValidate,postSchemaUpdateValidate
}