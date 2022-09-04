const Joi = require('joi')

function validateUpdateContact(contact) {
    const schema = Joi.object({
        firstName:Joi.string().max(50).required(),
        lastName:Joi.string().max(50),
        birthDate:Joi.date(),
        phone:Joi.string().min(9).max(10),
        email:Joi.string().min(5).max(255).email(),
        url:Joi.string().min(5).max(255),
        image:Joi.string(),
        update:Joi.date()
    })

    return schema.validate(contact);
}

exports.validateUpdateContact = validateUpdateContact;
