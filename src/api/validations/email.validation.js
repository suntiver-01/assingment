const Joi = require('joi')
function validateEmail(user) {
    const schema = Joi.object({
        receiver:Joi.string().min(5).max(255).required().email(),
        message:Joi.string().required(),
        subject:Joi.string().required()
    })

    return schema.validate(user);
}

exports.validateEmail = validateEmail;
