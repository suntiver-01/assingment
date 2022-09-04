const Joi = require('joi')
function validateCreateGroup(group) {
    const schema = Joi.object({
        userId:Joi.string().required(),
        nameGroup:Joi.string().min(1).max(15).required(),
    })

    return schema.validate(group);
}

exports.validateCreateGroup = validateCreateGroup;
