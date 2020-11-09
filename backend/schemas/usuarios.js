const Joi = require("joi");
const {regex_password} = require("../config")
const {regex_email} = require("../config")
/*La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
NO puede tener otros símbolos.
Ejemplo:
w3Unpocodet0d0*/
const schema = Joi.object({
    //nombre: Joi.string().min(1).max(45).required(),
    nombre: Joi.string().pattern(new RegExp("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,-]+$")).required().min(1).max(45),
    apellido: Joi.string().pattern(new RegExp("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,-]+$")).required().min(1).max(45),
    //correo: Joi.string().min(5).max(320).required(),
    correo: Joi.string().email(),
    password: Joi.string().pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*)[A-Za-z\d][A-Za-z\d]{7,15}$/).required(),
    nombreInstitucion: Joi.string().optional().allow("").min(3).max(50)
});

module.exports = schema;