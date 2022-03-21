import joi from"joi";

const userSchemaValidate = joi.object({
    email: joi.string().email().required(),
    password: joi.string().alphanum().required().min(6)
})

export {
    userSchemaValidate
}