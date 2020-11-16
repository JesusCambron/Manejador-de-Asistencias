const Joi = require("joi");
const schema = Joi.object({
    id: Joi.string().min(1).max(15).required(),
    nombre: Joi.string().pattern(new RegExp("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,-]+$")).required().min(1).max(45),
    idGrupo: Joi.string()
});

module.exports = schema;