const { mongo: { modelosMongoDB: { usuarioModel } } } = require("../database");
const { bcrypt } = require("../helpers");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

const signUp = async (req, res) => {
    try {
        const { nombre, apellido, correo, password, nombreInstitucion } = req.body;
        const passwordEncriptado = await bcrypt.encriptarPassword(password);
        const correoEncontrado = await usuarioModel.create({ nombre, apellido, correo, password: passwordEncriptado, nombreInstitucion });

        const token = jwt.sign(JSON.stringify(correoEncontrado), jwtSecret);
        crearCarpeta(req)
        res.json({
            id: correoEncontrado._id,
            nombre: correoEncontrado.nombre,
            apellido: correoEncontrado.apellido,
            correo: correoEncontrado.correo,
            token
        });
    } catch (error) {
        //res.send(error);
        return res.status(400).send(error);
    }
}

const signIn = async (req, res) => {
    const { correo, password } = req.body;
    const correoEncontrado = await usuarioModel.findOne({ correo });
    if (!correoEncontrado) {
        return res.status(400).send(`${correo} no registrado`);
    }
    const passwordCorrecta = await bcrypt.compararPassword(password, correoEncontrado.password);
    if (!passwordCorrecta) {
        return res.status(400).send(`Password ingresado incorrecto`);
    }
    const token = jwt.sign(JSON.stringify(correoEncontrado), jwtSecret);
    res.json({
        id: correoEncontrado._id,
        nombre: correoEncontrado.nombre,
        apellido: correoEncontrado.apellido,
        correo: correoEncontrado.correo,
        token
    });
}
const fs = require("fs");
const crearCarpeta = async (req) => {
    const {correo} = req.body;
    const usuario = await usuarioModel.findOne({ correo });
    fs.mkdir(`./database/uploads/${usuario._id}`, (err) => {
        if (err) {
            console.log("Ocurrió un error al crear la carpeta uploads");
        } else {
            console.log("Carpeta uploads creada correctamente");
        }
    })
}

module.exports = {
    signUp,
    signIn
}




