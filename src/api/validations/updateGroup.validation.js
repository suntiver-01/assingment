const Joi = require('joi')
function validateEditGroup(group) {
    const schema = Joi.object({
        nameGroup:Joi.string().min(1).max(15).required(),
    })

    return schema.validate(group);
}

exports.validateEditGroup = validateEditGroup;
