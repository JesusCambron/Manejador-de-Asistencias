const Joi = require("joi");
const schema = Joi.object({
    idCurso: Joi.string(),
    nombreGrupo: Joi.string(),
    idUsuario: Joi.string().optional().allow("").min(3).max(50)
});

module.exports = schema;