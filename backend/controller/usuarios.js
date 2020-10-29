const {mongo:{modelosMongoDB:{usuarioModel}}} = require("../database");
const {bcrypt} = require("../helpers");
const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../config");

const signUp = async(req,res) =>{
    console.log(req.body);
    try {
        const {nombre, apellido, correo, password,nombreInstitucion}= req.body;
        const passwordEncriptado = await bcrypt.encriptarPassword(password);
        await usuarioModel.create({nombre, apellido, correo,password:passwordEncriptado,nombreInstitucion});
        res.send(`${nombre} ha sido registrado`);
    } catch (error) {
        res.send(error);
    }
}

const signIn = async(req,res)=>{
    console.log(req.body);
    const {correo, password} = req.body;
    const correoEncontrado = await usuarioModel.findOne({correo});
    if(!correoEncontrado){
        return res.send(`${correo} no registrado`);
    }
    const passwordCorrecta = await bcrypt.compararPassword(password, correoEncontrado.password);
    if(!passwordCorrecta) {
        return res.send(`Password ingresado incorrecto`);
    }
    const token = jwt.sign(JSON.stringify(correoEncontrado), jwtSecret);
    res.json({
        id:correoEncontrado._id,
        nombre:correoEncontrado.nombre,
        apellido:correoEncontrado.apellido,
        correo:correoEncontrado.correo,
        token
    });
}

module.exports = {
    signUp,
    signIn
}




