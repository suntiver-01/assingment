const Joi = require('joi')
function validateTax(user) {

    const schema = Joi.object({
        netIncome:Joi.number().positive().min(1).required()
    })

    return schema.validate(user);
}

exports.validateTax = validateTax;
