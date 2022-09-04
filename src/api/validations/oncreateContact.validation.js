const Joi = require('joi')

function validateContact(contact) {
    const schema = Joi.object({
        groupId:Joi.string().required(),
        firstName:Joi.string().max(50).required(),
        lastName:Joi.string().max(50),
        birthDate:Joi.date(),
        phone:Joi.string().max(10),
        email:Joi.string().min(5).max(255).email(),
        url:Joi.string().min(5).max(255),
        image: Joi.any().meta({swaggerType: 'file'}).optional().description('Image File')
    })

    return schema.validate(contact);
}

exports.validateContact = validateContact;
