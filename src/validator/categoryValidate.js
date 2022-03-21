import joi from 'joi';

const categorySchemaValidate = joi.object({
    title: joi.string().min(1).required(),
    slug: joi.string().min(1).required(),
    content: joi.string().min(1).required()
})

const categorySchemaUpdateValidate = categorySchemaValidate.append({
    id: joi.number().required()
})

export {
    categorySchemaUpdateValidate,categorySchemaValidate
}