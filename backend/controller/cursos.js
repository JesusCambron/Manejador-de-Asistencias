const {mongo:{modelosMongoDB:{cursosModel}}} = require("../database/index");

const agregar = async(req, res) =>{
    const {nombre, horas, unidades} = req.body;
    const {idUsuario} = req.params;
    await cursosModel.create({nombre, horas, unidades, idUsuario});
    res.send(`${nombre} ha sido creado`);
}

const obtenerCursos = async(req, res)=>{
    const {idUsuario} = req.params;
    const cursos = await cursosModel.find({idUsuario});
    res.json(cursos);
}

const modificar = async (req,res)=>{
    const {nombre, horas, unidades} = req.body;
    const {_id} = req.params;
    await cursosModel.findByIdAndUpdate(_id, {nombre, horas, unidades});
    res.send(`${nombre} ha sido actualizado`);
}

const eliminar = async (req,res) =>{
    const {_id} = req.params;
    await cursosModel.deleteOne({_id});
    res.send(`Eliminado`);
}

module.exports = {
    agregar,
    obtenerCursos,
    modificar,
    eliminar
}