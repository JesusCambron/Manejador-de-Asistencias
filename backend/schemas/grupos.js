const Joi = require("joi");
const schema = Joi.object({
    idCurso: Joi.string(),
    nombreGrupo: Joi.string()
});

module.exports = schema;