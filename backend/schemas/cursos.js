const Joi = require("joi");

const schema = Joi.object({
    nombre: Joi.string().min(1).max(45).required(),
    horas: Joi.number(),
    unidades: Joi.number().required()
});

module.exports = schema;